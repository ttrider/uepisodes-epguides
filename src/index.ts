import path from "path";
import fs from "fs";
import { promisify } from "util";
import os from "os";
import http from "http";

const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);
const utimes = promisify(fs.utimes);
const readFile = promisify(fs.readFile);

const allShowsUrl = "http://epguides.com/common/allshows.txt";
const showUrl = "http://epguides.com/common/exportToCSVmaze.asp?maze=";
const defaultCacheDuration = 3600;

function defaultCacheDir() {

    const cacheDir = path.resolve(os.tmpdir(), "uepisodes-epguides");
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }
    return cacheDir;
}


async function defaultTransport(url: string, lastUpdated?: Date) {

    if (lastUpdated !== undefined) {
        if (!await head()) {
            return null;
        }
    }

    return await get();

    async function head() {
        if (lastUpdated === undefined) return true;

        const options = new URL(url) as http.RequestOptions;
        options.method = "HEAD";
        options.headers = {
            "if-modified-since": lastUpdated.toUTCString()
        };
        return new Promise((resolve, reject) => {

            const request = http.request(options
                , (response) => {

                    if (response.statusCode) {
                        if (response.statusCode === 304) { resolve(false); }
                        if (response.statusCode < 400) { resolve(true); }
                    }
                    reject(response.statusMessage);
                });
            request.setHeader("If-Modified-Since", lastUpdated.toUTCString());
            request.end();
        });
    }

    async function get() {
        if (lastUpdated === undefined) return null;

        const options = new URL(url) as http.RequestOptions;
        options.method = "GET";

        return new Promise<{ body: string, lastModifiedDate?: Date }>((resolve, reject) => {

            const request = http.request(options
                , (response) => {
                    if (response.statusCode === 200) {
                        response.setEncoding('utf8');
                        const buf: string[] = [];
                        response.on('data', (chunk) => {
                            if (chunk !== undefined) {
                                buf.push(chunk.toString());
                            }
                        });
                        response.on('end', () => {

                            let lastModified = response.headers["last-modified"];
                            if (lastModified) {

                                if (Array.isArray(lastModified)) {
                                    lastModified = lastModified[0];
                                }
                                if (lastModified) {
                                    resolve({ body: buf.join(""), lastModifiedDate: new Date(lastModified) });
                                    return;
                                }
                            }

                            resolve({ body: buf.join("") });
                        });
                    }
                    reject(response.statusMessage);
                });
            request.end();
        });
    }
}

export default function client(options?: {
    cacheDir?: string,
    cacheDuration?: number,
    transport?: (url: string, lastUpdated?: Date) => Promise<{ body: string, lastModifiedDate?: Date } | null>
}) {

    if (!options) {
        return new Client(defaultCacheDir(), defaultCacheDuration, defaultTransport);
    } else {

        return new Client(
            (options.cacheDir === undefined) ? defaultCacheDir() : options.cacheDir,
            (options.cacheDuration === undefined) ? defaultCacheDuration : options.cacheDuration,
            (options.transport === undefined) ? defaultTransport : options.transport);
    }
}

class Client {

    constructor(
        public cacheDir: string,
        public cacheDuration: number,
        public transport: (url: string, lastUpdated?: Date) => Promise<{ body: string, lastModifiedDate?: Date } | null>) {
    }

    public async getShowList(forceRefresh?: boolean) {

        return await this.getCachedFile(
            allShowsUrl,
            (body)=>{

                return {};
            },
            forceRefresh
        );
    }


    async getCachedFile<T>(url: string, factory: (body: string) => T, forceRefresh?: boolean) {

        const urlFile = url.replace(/[:\/\\\.\?=]/g, "-") + ".json";

        const outputFile = path.resolve(this.cacheDir, urlFile);

        const modifiedTime = forceRefresh ? undefined : await getModifiedTime(outputFile);

        const response = await this.transport(url, modifiedTime);

        if (response === null) {
            const buffer = await readFile(outputFile);
            if (buffer !== undefined) {
                const text = buffer.toString();
                const data = JSON.parse(text) as T;
                return data;
            }
            throw new Error("Can't read file " + urlFile);
        }

        const data = factory(response.body);

        await writeFile(urlFile, JSON.stringify(data, null, 4));

        if (response.lastModifiedDate) {
            await utimes(urlFile, response.lastModifiedDate, response.lastModifiedDate);
        }

        return data;
    }
}

async function getModifiedTime(path: string) {

    try {
        // check if exists and get the last modifed date
        const fStats = await stat(path);
        if (fStats) {
            return fStats.mtime;
        }
        return undefined;
    }
    catch (err) {
        // if file/path doen"t exists, return null
        if (err && err.code === "ENOENT" && err.errno === -2) {
            return undefined;
        }
        // otherwise - re-throw;
        throw err;
    }
}
