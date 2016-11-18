/*global describe:false, it:false, before:false, after:false*/

'use strict';

// This should not be taken as a high-quality test suite.
// Many cases are not covered by it (feel free to suggest some).
const kraken  = require('kraken-js'),
      urlmod  = require('url'),
      express = require('express'),
      path    = require('path'),
      request = require('supertest'),
      data    = require('../data/data.json'),
      DCS     = [ 'NA', 'EU', 'AS' ],
      URLS    = [ '/', '/servers', '/performance', '/impressions' ],
      SERVERS = data.servers[0].servers.map((row) => row.id).sort(),
      FIRST   = new Date('2016-11-07T00:00:00.000Z').getTime(),
      LAST    = new Date('2016-11-21T00:00:00.000Z').getTime(),
      RANGE   = LAST - FIRST;

function getRandomDate() {
    return FIRST + Math.floor(Math.random() * RANGE);
}

function getRandomDates() {
    const d1 = getRandomDate(),
          d2 = getRandomDate();

    return d1 < d2 ? [ d1, d2 ] : [ d2, d1 ];
}

function shouldBeOK(res) {
    if (res.status !== 200) {
        throw new Error('Response code is ' + res.status + ', not 200');
    }

    if (res.headers['content-type'] !== 'application/json; charset=utf-8') {
        throw new Error('Incorrect content type header');
    }

    if (!res.body) {
        throw new Error('Response body is missing.');
    }

    if (res.body.message !== 'OK') {
        throw new Error('Response body does not contain an OK message.');
    }
}

function shouldBeBadVerb(res) {
    if (res.status !== 405) {
        throw new Error('Response code is ' + res.status + ', not 405');
    }

    if (!res.body) {
        throw new Error('Response body is missing.');
    }

    if (res.body.message !== 'INCORRECT_HTTP_VERB') {
        throw new Error('Response body does not report incorrect HTTP verb.');
    }
}

function shouldFailValidation(res) {
    if (res.status !== 400) {
        throw new Error('Response code is ' + res.status + ', not 400');
    }

    if (res.headers['content-type'] !== 'application/json; charset=utf-8') {
        throw new Error('Incorrect content type header');
    }

    if (!res.body) {
        throw new Error('Response body is missing.');
    }

    if (res.body.message !== 'VALIDATION_FAILED' || !res.body.errors.length) {
        throw new Error('Response body does not report validation failure.');
    }
}

function shouldHaveEmptyData(res) {
    shouldBeOK(res);

    if (!Array.isArray(res.body.data) || res.body.data.length) {
        throw new Error('Response data should be empty.');
    }
}

function validateRawServersData() {
    // Check that servers matches aggregated DC data
    const srv = [].concat.apply([], DCS.map((dc) => Object.keys(data.perfstats[dc])))
        .filter((s) => s !== 'ALL')
        .sort();

    if (JSON.stringify(srv) !== JSON.stringify(SERVERS)) {
        throw new Error('Server list in servers route does not match that in performance routes: ' + JSON.stringify([ srv, SERVERS ]));
    }
}

function validateRawPerformanceData() {
    // Check that aggregated DC data matches individual DC data
    for (let dc of DCS) {
        let dataByTS = {};
        let keys     = Object.keys(data.perfstats[dc]);

        if (keys.pop() !== 'ALL') {
            throw new Error('No ALL data at end of keys for ' + dc);
        }

        for (let id of keys) {
            for (let row of data.perfstats[dc][id]) {
                const ts = row.timestamp;

                if (row.requests < 0 || row.mean < 0.002 || row.mean > 0.2 || row.lag < 5000 || row.warns < 0
                    || row.timing[0] < 0 || row.timing[1] < 0 || row.timing[2] < 0 || row.timing[3] < 0
                    || (row.timing[0] + row.timing[1] + row.timing[2] + row.timing[3]) !== row.requests) {
                    throw new Error('Invalid data: ' + JSON.stringify(row));
                }

                if (!dataByTS[ts]) {
                    dataByTS[ts] = {
                        timing0:  0,
                        timing1:  0,
                        timing2:  0,
                        timing3:  0,
                        requests: 0,
                        lag:      0,
                        warns:    0,
                        totmean:  0
                    };
                }

                dataByTS[ts].timing0 += row.timing[0];
                dataByTS[ts].timing1 += row.timing[1];
                dataByTS[ts].timing2 += row.timing[2];
                dataByTS[ts].timing3 += row.timing[3];
                dataByTS[ts].requests += row.requests;
                dataByTS[ts].warns += row.warns;
                dataByTS[ts].totmean += row.mean * row.requests;

                if (row.lag > dataByTS[ts].lag) {
                    dataByTS[ts].lag = row.lag;
                }
            }
        }

        for (let row of data.perfstats[dc].ALL) {
            const tsdata = dataByTS[row.timestamp];

            if (tsdata.requests !== row.requests
                || tsdata.timing0 !== row.timing[0]
                || tsdata.timing1 !== row.timing[1]
                || tsdata.timing2 !== row.timing[2]
                || tsdata.timing3 !== row.timing[3]
                || tsdata.warns !== row.warns
                || tsdata.lag !== row.lag
                || Math.abs(tsdata.totmean / tsdata.requests - row.mean) > 1e-5) {
                throw new Error('Mismatched data: ' + JSON.stringify([ tsdata, row ]));
            }
        }
    }
}

function validateRawImpressionsData() {
    // Check that total impressions is equal to total requests
    for (let dc of DCS) {
        const perf = data.perfstats[dc].ALL,
              imps = data.adstats[dc];

        if (perf.length * 6 !== imps.length) {
            throw new Error('performance/impressions length mismatch for ' + dc);
        }

        for (let i = 0; i < perf.length; i ++) {
            const pf = perf[i];
            let types   = {},
                totimps = 0;

            for (let j = i * 6; j < i * 6 + 6; j ++) {
                if (pf.timestamp !== imps[j].timestamp) {
                    throw new Error('Mismatched timestamps for ' + dc + ': ' + JSON.stringify([ pf, imps[j] ]));
                }

                if (imps[j].impressions <= 0 || imps[j].spend <= 0
                    || imps[j].spend / imps[j].impressons < 3
                    || imps[j].spend / imps[j].impressions > 40) {
                    throw new Error('Invalid impression data for ' + dc + ': ' + JSON.stringify(imps[j]));
                }

                types[imps[j].platform + '_' + imps[j].format] = true;

                totimps += imps[j].impressions;
            }

            if (!types.desktop_video || !types.desktop_banner
                || !types.mobile_video || !types.mobile_banner
                || !types.app_video || !types.app_banner) {
                throw new Error('Incorrect impression data types for ' + dc + ': ' + JSON.stringify(imps.slice(i, i + 6)));
            }

            if (pf.requests < 0 || pf.mean < 0.002 || pf.mean > 0.2 || pf.lag < 5000 || pf.warns < 0
                || pf.timing[0] < 0 || pf.timing[1] < 0 || pf.timing[2] < 0 || pf.timing[3] < 0) {
                throw new Error('Invalid data: ' + JSON.stringify(pf));
            }

            if ((pf.timing[0] + pf.timing[1] + pf.timing[2] + pf.timing[3]) !== pf.requests) {
                throw new Error('Incorrect request breakdown for ' + dc + ': ' + JSON.stringify(pf));
            }

            if ((imps[i * 6 + 0].impressions + imps[i * 6 + 1].impressions + imps[i * 6 + 2].impressions
                + imps[i * 6 + 3].impressions + imps[i * 6 + 4].impressions + imps[i * 6 + 5].impressions)
                !== pf.requests) {
                throw new Error('Incorrect format breakdown for ' + dc + ': ' + JSON.stringify([ pf, im ]));
            }
        }
    }
}

function validateServersResponse(res) {
    if (res.body.data.length !== SERVERS.length) {
        throw new Error('Incorrect data length in response.');
    }

    let found = {};
    for (let row of res.body.data) {

        if (found[row.id]) {
            throw new Error('Duplicate server: ' + row.id);
        }

        found[row.id] = true;

        if (typeof row.online !== 'number'
            || typeof row.status !== 'string'
            || SERVERS.indexOf(row.id) === -1
            || DCS.indexOf(row.dc) === -1
            || row.id.substr(0, 2) !== row.dc) {
            throw new Error('Invalid data for server ' + row.id);
        }
    }
}

function validatePerformanceResponse(res, dc, id, from = FIRST, to = LAST) {
    const now = Date.now(),
          d   = res.body.data,
          max = d.length,
          url = dc + '/' + id,
          raw = data.perfstats[dc][id].filter((row) => row.timestamp < now && row.timestamp >= from && row.timestamp <= to);

    // There could be an additional entry at the end of the raw data due to race conditions
    if (raw.length !== max && raw.length !== max + 1) {
        throw new Error('Wrong response data length: ' + max + ' instead of ' + raw.length);
    }

    let xxx = {};
    for (let i = 0; i < max; i++) {
        const row  = d[i],
              dstr = JSON.stringify(row);

        if (xxx[row.timestamp]) {
            throw new Error('Duplicate timestamp: ' + dstr);
        }
        xxx[row.timestamp] = true;

        if (dstr !== JSON.stringify(raw[i])) {
            throw new Error('Data mismatch for ' + url + ': ' + dstr + '; expected ' + JSON.stringify(raw[i]));
        }
    }
}

function validateImpressionResponse(res, dc, from = FIRST, to = LAST) {
    const now = Date.now(),
          d   = res.body.data,
          max = d.length,
          raw = data.adstats[dc].filter((row) => row.timestamp < now && row.timestamp >= from && row.timestamp <= to);

    // There could be six additional entries in the raw data due to race conditions
    if (raw.length !== max && raw.length !== max + 6) {
        throw new Error('Wrong response data length: ' + max + ' instead of ' + raw.length);
    }

    let xxx = {};
    for (let i = 0; i < max; i++) {
        var row  = d[i],
            key  = row.timestamp + ':' + row.platform + ':' + row.format,
            dstr = JSON.stringify(row);

        if (xxx[key]) {
            throw new Error('Duplicate entry for ' + dc + ': ' + dstr);
        }
        xxx[key] = true;

        if (dstr !== JSON.stringify(raw[i])) {
            throw new Error('Data mismatch for ' + dc + ': ' + dstr + '; expected ' + JSON.stringify(raw[i]));
        }

        if ((row.platform !== 'desktop' && row.platform !== 'mobile' && row.platform !== 'app')
            || (row.format !== 'banner' && row.format !== 'video')
            || row.impressions <= 0 || row.spend <= 0
            || (row.spend / row.impressions) < 1 || (row.spend / row.impressions) > 40) {
            throw new Error('Invalid entry for ' + dc + ': ' + dstr);
        }
    }
}

describe('Test Hack-With-IX Dataset', () => {
    it('raw servers data should be valid', (done) => {
        validateRawServersData();
        done();
    });

    it('raw performance data should be valid', (done) => {
        validateRawPerformanceData();
        done();
    });

    it('raw impressions data should be valid', (done) => {
        validateRawImpressionsData();
        done();
    });
});

describe('Test Hack-With-IX API', () => {
    const DCS_SERVS = [].concat.apply([],
        DCS.map((dc) => Object.keys(data.perfstats[dc]).map((sv) => [ dc, sv ])));

    let app, mock;

    function validatePerformance(dc, id, from, to) {
        let url = '/performance?dc=' + dc + '&id=' + id;

        if (from) { url += '&from=' + from; }
        if (to) { url += '&to=' + to; }

        it(url + ' should return valid performance data', (done) => {
            request(mock)
                .get(url)
                .expect(shouldBeOK)
                .end((err, res) => {
                    if (!err) { validatePerformanceResponse(res, dc, id, from, to); }
                    done(err);
                });
        });
    }

    function validateImpressions(dc, from, to) {
        let url = '/impressions?dc=' + dc;

        if (from) { url += '&from=' + from; }
        if (to) { url += '&to=' + to; }

        it(url + ' should return valid impressions data', (done) => {
            request(mock)
                .get(url)
                .expect(shouldBeOK)
                .end((err, res) => {
                    if (!err) { validateImpressionResponse(res, dc, from, to); }
                    done(err);
                });
        });
    }

    function validateValidationError(rawurl, q) {
        const url = urlmod.format({ pathname: rawurl, query: q });

        it(url + ' should return validation failure', (done) => {
            request(mock)
                .get(url)
                .expect(shouldFailValidation)
                .end(done);
        });
    }

    function validateEmptyData(rawurl, q) {
        const url = urlmod.format({ pathname: rawurl, query: q });

        it(url + ' should return empty data', (done) => {
            request(mock)
                .get(url)
                .expect(shouldHaveEmptyData)
                .end(done);
        });
    }

    before((done) => {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.resolve(__dirname, '..')
        }));

        mock = app.listen(1337);
    });

    after((done) => mock.close(done));

// Cases expected to fail
    for (let url of URLS) {
        it(url + ' with wrong method should return 405', (done) => {
            request(mock)
                .post(url)
                .expect(shouldBeBadVerb)
                .end(done);
        });
    }

    const GOOD_DC  = 'NA',
          BAD_DC   = 'FOO',
          GOOD_ID  = 'NA0001',
          NON_ID   = 'NA0010',
          BAD_ID   = 'NA00001',
          TOO_LOW  = new Date('2015-12-31T23:59:00.000Z').getTime(),
          TOO_HIGH = new Date('2017-01-01T00:01:00.000Z').getTime();

    const [ LOW_DATE, HIGH_DATE ] = getRandomDates();

    validateValidationError('/performance', { id: GOOD_ID });
    validateValidationError('/performance', { dc: BAD_DC, id: GOOD_ID });
    validateValidationError('/performance', { dc: GOOD_DC });
    validateValidationError('/performance', { dc: GOOD_DC, id: BAD_ID });
    validateValidationError('/performance', { dc: GOOD_DC, id: BAD_ID, from: TOO_LOW });
    validateValidationError('/performance', { dc: GOOD_DC, id: BAD_ID, from: TOO_HIGH });
    validateValidationError('/performance', { dc: GOOD_DC, id: BAD_ID, to: TOO_LOW });
    validateValidationError('/performance', { dc: GOOD_DC, id: BAD_ID, to: TOO_HIGH });
    validateValidationError('/impressions', { });
    validateValidationError('/impressions', { dc: BAD_DC });
    validateValidationError('/impressions', { dc: GOOD_DC, from: TOO_LOW });
    validateValidationError('/impressions', { dc: GOOD_DC, from: TOO_HIGH });
    validateValidationError('/impressions', { dc: GOOD_DC, to: TOO_LOW });
    validateValidationError('/impressions', { dc: GOOD_DC, to: TOO_HIGH });

// Cases expected to succeed
    it('/ should return hello world', (done) => {
        request(mock)
            .get('/')
            .expect(shouldBeOK)
            .end(done);
    });

    it('/servers should return ' + SERVERS.length + ' servers', (done) => {
        request(mock)
            .get('/servers')
            .expect(shouldBeOK)
            .end((err, res) => {
                if (!err) { validateServersResponse(res); }
                done(err);
            });
    });

    validateEmptyData('/performance', { dc: GOOD_DC, id: NON_ID });
    validateEmptyData('/performance', { dc: GOOD_DC, id: GOOD_ID, from: HIGH_DATE, to: LOW_DATE });
    validateEmptyData('/impressions', { dc: GOOD_DC, from: HIGH_DATE, to: LOW_DATE });

    for (let [ dc, id ] of DCS_SERVS) {
        const [ d1, d2 ] = getRandomDates();

        validatePerformance(dc, id);
        validatePerformance(dc, id, d1);
        validatePerformance(dc, id, undefined, d2);
        validatePerformance(dc, id, undefined, d1);
        validatePerformance(dc, id, d2);
        validatePerformance(dc, id, d1, d2);
    }

    for (let dc of DCS) {
        const [ d1, d2 ] = getRandomDates();

        validateImpressions(dc);
        validateImpressions(dc, d1);
        validateImpressions(dc, undefined, d2);
        validateImpressions(dc, undefined, d1);
        validateImpressions(dc, d2);
        validateImpressions(dc, d1, d2);
    }
});
