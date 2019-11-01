import { expect } from 'chai';
import { describe } from 'mocha';

import client from "../src/index";

describe('client', () => {

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


