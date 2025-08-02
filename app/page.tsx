"use client";

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {
    Github,
    Mail,
    ExternalLink,
    ArrowUpRight,
    Star,
    GitFork
} from 'lucide-react';
import {
    SiPhp,
    SiSymfony,
    SiShopware,
    SiGo,
    SiOpenjdk,
    SiDocker,
    SiKubernetes,
    SiJavascript,
    SiPython,
    SiGit,
    SiProxmox,
    SiLinux
} from 'react-icons/si';

const MinimalPortfolio = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

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

    const [pinnedRepos, setPinnedRepos] = useState<GitHubRepo[]>([]);

    // GitHub Repository Daten über API Route laden
    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await fetch('/api/github-repos');
                if (!response.ok) throw new Error('Failed to fetch repo data');

                const repos = await response.json();
                setPinnedRepos(repos);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                setPinnedRepos([]);
            }
        };

        fetchRepoData();
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    const experience = [
        {
            role: "Application Developer Trainee",
            company: "HEPTACOM GmbH",
            period: "2024 — Present",
            location: "Application Development"
        },
        {
            role: "Open Source Contributor",
            company: "Dockware & Packeton Projects",
            period: "2024 — Present",
            location: "Remote"
        },
        {
            role: "Independent Developer",
            company: "Personal Projects & CLI Tools",
            period: "2022 — Present",
            location: "Germany"
        },
        {
            role: "Learning Journey",
            company: "Self-taught Developer",
            period: "2018 — Present",
            location: "Started at age 9"
        }
    ];

    const skills = [
        {name: "PHP", icon: SiPhp},
        {name: "Symfony", icon: SiSymfony},
        {name: "Shopware", icon: SiShopware},
        {name: "Go", icon: SiGo},
        {name: "Java", icon: SiOpenjdk},
        {name: "Docker", icon: SiDocker},
        {name: "Kubernetes", icon: SiKubernetes},
        {name: "JavaScript", icon: SiJavascript},
        {name: "Python", icon: SiPython},
        {name: "Git", icon: SiGit},
        {name: "Proxmox", icon: SiProxmox},
        {name: "Linux", icon: SiLinux}
    ];

    const contactLinks = [
        {
            title: "Email",
            subtitle: "info@wimwenigerkind.com",
            href: "mailto:contact@wimwenigerkind.com",
            icon: Mail
        },
        {
            title: "GitHub",
            subtitle: "View my repositories",
            href: "https://github.com/wimwenigerkind",
            icon: Github
        },
        {
            title: "Docs",
            subtitle: "Documentation & Guides",
            href: "https://docs.wimwenigerkind.com",
            icon: ExternalLink
        }
    ];

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-slate-400 text-sm font-mono">Loading portfolio...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            {/* Header */}
            <header className="px-6 py-8 border-b border-slate-800">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Image 
                            src="https://images.wimwenigerkind.com/wimwenigerkind-transparent-icon.png" 
                            alt="Wim Wenigerkind" 
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h1 className="text-2xl font-medium text-slate-100 mb-1">Wim Wenigerkind</h1>
                            <p className="text-slate-400 text-sm">Full-Stack Developer</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-slate-400 text-sm font-mono">
                            {currentTime.toLocaleTimeString('de-DE', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </div>
                        <div className="text-slate-500 text-xs">Bremen, DE</div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
                {/* About */}
                <section className="bg-slate-800/30 rounded-2xl p-8 border border-slate-800">
                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">
                        About
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                        Hi, I&apos;m Wim – a 16-year-old passionate developer from Germany with 7 years of coding experience.
                        I started my journey at age 9 and have been exploring new technologies ever since. Currently
                        learning
                        PHP, Symfony, Shopware, and Java while contributing to open-source projects like Dockware.
                        I love building Docker solutions, CLI tools, and automation scripts that make developers&apos; lives
                        easier.
                    </p>
                </section>

                {/* Skills */}
                <section className="bg-slate-800/30 rounded-2xl p-8 border border-slate-800">
                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">
                        Technologies
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {skills.map((skill) => {
                            const IconComponent = skill.icon;
                            return (
                                <div
                                    key={skill.name}
                                    className="flex flex-col items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
                                >
                                    <IconComponent
                                        size={24}
                                        className="text-slate-400 group-hover:text-blue-400 transition-colors mb-2"
                                    />
                                    <span className="text-sm text-slate-300 text-center">{skill.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* GitHub Repositories */}
                <section className="bg-slate-800/30 rounded-2xl p-8 border border-slate-800">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                            Pinned Repositories
                        </h2>
                        <a
                            href="https://github.com/wimwenigerkind"
                            className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                        >
                            <Github size={16}/>
                            <span>View all repos</span>
                            <ArrowUpRight size={14}/>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pinnedRepos.map((repo, index) => (
                            <a
                                key={index}
                                href={repo.url}
                                className="block p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-700/50 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-slate-100 font-medium group-hover:text-blue-400 transition-colors truncate pr-2">
                                        {repo.name}
                                    </h3>
                                    <ArrowUpRight
                                        size={16}
                                        className="text-slate-500 group-hover:text-blue-400 transition-colors flex-shrink-0"
                                    />
                                </div>

                                <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                                    {repo.description}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                                        <div className="flex items-center space-x-1">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{backgroundColor: repo.languageColor}}
                                            />
                                            <span>{repo.language}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star size={12}/>
                                            <span>{formatNumber(repo.stars)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <GitFork size={12}/>
                                            <span>{formatNumber(repo.forks)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {repo.topics.slice(0, 3).map((topic) => (
                                        <span
                                            key={topic}
                                            className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded-full"
                                        >
                      {topic}
                    </span>
                                    ))}
                                    {repo.topics.length > 3 && (
                                        <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-500 rounded-full">
                      +{repo.topics.length - 3}
                    </span>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="bg-slate-800/30 rounded-2xl p-8 border border-slate-800">
                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                            <div key={index}
                                 className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-100 mb-1">
                                        {exp.role}
                                    </h3>
                                    <p className="text-slate-400">{exp.company}</p>
                                </div>
                                <div className="text-right mt-2 md:mt-0">
                                    <div className="text-sm text-slate-500 font-mono">{exp.period}</div>
                                    <div className="text-xs text-slate-600">{exp.location}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="bg-slate-800/30 rounded-2xl p-8 border border-slate-800">
                    <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-8">
                        Get in Touch
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contactLinks.map((link, index) => {
                            const IconComponent = link.icon;
                            return (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group border border-slate-700/50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <IconComponent size={20}
                                                       className="text-slate-400 group-hover:text-blue-400 transition-colors"/>
                                        <div>
                                            <div className="text-slate-300 font-medium">{link.title}</div>
                                            <div className="text-slate-500 text-sm">{link.subtitle}</div>
                                        </div>
                                    </div>
                                    <ArrowUpRight
                                        size={16}
                                        className="text-slate-500 group-hover:text-blue-400 transition-colors"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 px-6 py-8 mt-16">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <p className="text-slate-500 text-sm">
                            © 2025 Wim Wenigerkind. All rights reserved.
                        </p>
                        <p className="text-slate-600 text-xs mt-2 md:mt-0 font-mono">
                            Built with React & Tailwind CSS
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MinimalPortfolio;