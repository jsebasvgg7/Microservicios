import ENV from "../../config/environment.js";

const BASE = ENV.BASE_URL;

async function request(method, path, body = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
    };
    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE}${path}`, options);

    if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Error ${response.status}: ${msg}`);
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
        return response.json();
    }
    return response.text();
}

const api = {
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    put: (path, body) => request("PUT", path, body),
    delete: (path) => request("DELETE", path),
};

export default api;