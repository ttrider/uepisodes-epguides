import { expect } from 'chai';
import { describe } from 'mocha';
import path from "path";
import fs from "fs";
import os from "os";

import client from "../src/index";
import uuid from 'uuid';
import { allShowTransport, allShowParsedDate } from '../common/transport';
import { doesNotReject } from 'assert';

describe('init', () => {

    it("init_not_undfined", () => {

        const c = client();
        expect(c).not.equal(undefined);
        expect(c.cacheDir).not.equal(undefined);
        expect(c.cacheDuration).not.equal(undefined);
        expect(c.transport).not.equal(undefined);
    });

    it("init_cacheDir", () => {
        const c = client({ cacheDir: "/somedir/" });
        expect(c.cacheDir).equal("/somedir/");
    });

    it("init_cacheDuration", () => {
        const c = client({ cacheDuration: 10 });
        expect(c.cacheDuration).equal(10);
    });

    it("init_cache", () => {
        const c = client({ cacheDuration: 10, cacheDir: "/somedir/" });
        expect(c.cacheDuration).equal(10);
        expect(c.cacheDir).equal("/somedir/");
    });

});

describe('allshows', () => {

    it("getShowList:simple ", async () => {

        const cacheDir = getCacheDir();
        console.info(cacheDir);

        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        // get the dataset and save it to file
        const data00 = await c.getShowList();

        console.info(data00);

        // expect this data to be loaded from file
        const data01 = await c.getShowList();
        console.info(data01);

        // expect the dataset
        const data02 = await c.getShowList(true);

        expect(data00).deep.equal(data01);
        expect(data00).deep.equal(data02);
        expect(data00).deep.equal(data02);
    });

    it("getShowList:parsing", async () => {

        const cacheDir = getCacheDir();
        console.info(cacheDir);

        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        const data = await c.getShowList();

        expect(data).deep.equal(allShowParsedDate);

    });


});

function getCacheDir() {

    const cacheDir = path.resolve(os.tmpdir(), "uepisodes-epguides", uuid());
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }
    return cacheDir;
}



