import path from "path";
import fs from "fs";
import { promisify } from "util";
import os from "os";


const defaultCacheDuration = 3600;

function defaultCacheDir() {

    const cacheDir = path.resolve(os.tmpdir(), "uepisodes-epguides");
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }
    return cacheDir;
}


async function defaultTransport(url: string, lastUpdated?: Date) {


    return {
        statusCode: 200,
        statusMessage: "OK",
        body: ""
    };
}

export default function client(options?: {
    cacheDir?: string,
    cacheDuration?: number,
    transport?: (url: string, lastUpdated?: Date) => Promise<{ statusCode: number, statusMessage: string, body: string }>
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
        public transport: (url: string, lastUpdated?: Date) => Promise<{ statusCode: number, statusMessage: string, body: string }>) {
    }

}


