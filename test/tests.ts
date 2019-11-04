import { expect } from 'chai';
import { describe } from 'mocha';
import path from "path";
import fs from "fs";
import os from "os";

import client from "../src/index";
import uuid from 'uuid';
import { allShowTransport, allShowParsedDate, episodeData } from '../common/transport';


describe('init', () => {

    it("init_not_undfined", () => {

        const c = client();
        expect(c).not.equal(undefined);
        expect(c.cacheDir).not.equal(undefined);
        expect(c.transport).not.equal(undefined);
    });

    it("init_cacheDir", () => {
        const c = client({ cacheDir: "/somedir/" });
        expect(c.cacheDir).equal("/somedir/");
    });

});

describe('allshows', () => {

    it("getShowList:simple ", async () => {

        const cacheDir = getCacheDir();
        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        // get the dataset and save it to file
        const data00 = await c.getShows();

        // expect this data to be loaded from file
        const data01 = await c.getShows();

        expect(data00).deep.equal(data01);
    });

    it("getShowList:parsing", async () => {

        const cacheDir = getCacheDir();

        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        const data = await c.getShows();

        expect(data).deep.equal(allShowParsedDate);

    });

    it("getEpisodeList:by id", async () => {

        const cacheDir = getCacheDir();

        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        const data = await c.getShowEpisodes({ tvmaze: 92 });

        expect(data).deep.equal(episodeData)
    });

    it("getEpisodeList:by name", async () => {

        const cacheDir = getCacheDir();

        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        const data = await c.getShowEpisodes("A to Z");

        expect(data).deep.equal(episodeData)
    });

    it("getEpisodeList:not found", async () => {

        const cacheDir = getCacheDir();
        const c = client(
            {
                cacheDir,
                transport: allShowTransport
            }
        );

        const data = await c.getShowEpisodes({ tvmaze: -1 });

        expect(data).to.be.null;
    });


});

// describe('integrated', () => {

//     it("getShowList ", async () => {

//         const c = client();

//         const show = await c.getShowEpisodes("Absentia");

//         if (show !== null) {
//             for (let index = 0; index < show.episodes.length; index++) {
//                 const episode = show.episodes[index];

//                 console.log(episode);

//             }
//         }

//     });
// });

function getCacheDir() {

    const cacheDir = path.resolve(os.tmpdir(), "uepisodes-epguides", uuid());
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }
    return cacheDir;
}



