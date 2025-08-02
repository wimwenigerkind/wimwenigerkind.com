import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  watchers: number;
  url: string;
  topics: string[];
}

interface CacheData {
  repos: GitHubRepo[];
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 Minuten
const CACHE_FILE = 'cache/.github-cache.json';

// File-basierte Cache-Funktionen
function readCache(): CacheData | null {
  try {
    const cacheFilePath = path.join(process.cwd(), CACHE_FILE);
    if (fs.existsSync(cacheFilePath)) {
      const data = fs.readFileSync(cacheFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Error reading cache file:', error);
  }
  return null;
}

function writeCache(data: CacheData) {
  try {
    const cacheFilePath = path.join(process.cwd(), CACHE_FILE);
    // Ensure cache directory exists
    const cacheDir = path.dirname(cacheFilePath);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.warn('Error writing cache file:', error);
  }
}

const languageColors = {
  'JavaScript': '#f1e05a',
  'Python': '#3572A5',
  'Go': '#00ADD8',
  'Java': '#b07219',
  'TypeScript': '#2b7489',
  'Shell': '#89e051',
  'Dockerfile': '#384d54',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'HTML': '#e34c26',
  'CSS': '#1572B6'
};

const repositoryUrls = [
  "https://github.com/wimwenigerkind/mkdocs-wim-wenigerkind",
  "https://github.com/wimwenigerkind/dotfiles",
  "https://github.com/wimwenigerkind/wswcli",
  "https://github.com/wimwenigerkind/homebrew-tap",
  "https://github.com/wimwenigerkind/boilerplates",
  "https://github.com/wimwenigerkind/docker-compose"
];

export async function GET() {
  try {
    const now = Date.now();
    
    // File-Cache prüfen
    const cachedData = readCache();
    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
      console.log('Using file cache');
      return NextResponse.json(cachedData.repos);
    }

    console.log('Cache expired or missing, fetching from GitHub API...');

    // GitHub API anfragen mit einzelner Fehlerbehandlung
    const repoPromises = repositoryUrls.map(async (url) => {
      try {
        const parts = url.replace('https://github.com/', '').split('/');
        const owner = parts[0];
        const repo = parts[1];
        
        const headers: Record<string, string> = {};
        
        // Temporärer GitHub Token für initiales Caching (später entfernen)
        const githubToken = process.env.GITHUB_TOKEN;
        if (githubToken) {
          headers['Authorization'] = `Bearer ${githubToken}`;
        }
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers
        });
        
        if (!response.ok) {
          console.warn(`Skipping ${owner}/${repo}: ${response.status} ${response.statusText}`);
          return null; // Repository überspringen
        }
        
        const data = await response.json();
        
        return {
          name: data.name,
          description: data.description || 'No description available',
          language: data.language || 'Unknown',
          languageColor: languageColors[data.language as keyof typeof languageColors] || '#6e7681',
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
          url: data.html_url,
          topics: data.topics || []
        };
      } catch (error) {
        console.warn(`Error fetching repository ${url}:`, error);
        return null; // Repository überspringen
      }
    });

    const repoResults = await Promise.all(repoPromises);
    const repos = repoResults.filter((repo): repo is GitHubRepo => repo !== null);
    
    // Cache in Datei speichern
    if (repos.length > 0) {
      const cacheData: CacheData = {
        repos,
        timestamp: now
      };
      writeCache(cacheData);
      console.log(`Cached ${repos.length} repositories to file`);
    }
    
    return NextResponse.json(repos);
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    
    // Fallback zu altem File-Cache wenn vorhanden
    const cachedData = readCache();
    if (cachedData) {
      console.log('Using stale file cache due to API failure');
      return NextResponse.json(cachedData.repos);
    }
    
    // Fallback zu leeren Daten
    return NextResponse.json([]);
  }
}