import http from 'k6/http';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { BASE_URL } from "../helpers/config.js";

export function visitHome() {
    const res = http.get(BASE_URL);
    expect.soft(res.status).toBe(200);
}

export function visitExperience() {
    const res = http.get(`${BASE_URL}/experience/`);
    expect.soft(res.status).toBe(200);
}