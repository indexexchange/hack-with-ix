'use strict';

var data    = require('../data/data.json'),
    servers = data.servers,
    perf    = data.perfstats,
    ads     = data.adstats,
    LAG     = 60 * 5 * 1000;

module.exports = {
    getServerData: function getServerData() {
        var now = Date.now(),
            i;

        for (i = servers.length; i--; ) {
            if (servers[i].timestamp < now) { return servers[i].servers; }
        }
    },

    getPerformanceData: function getPerformanceData(dc, server, from, to) {
        var now = Date.now() - LAG;

        if (!perf[dc] || !perf[dc][server]) { return []; }

        return perf[dc][server].filter((data) => {
            return data.timestamp >= from
                && data.timestamp <= to
                && data.timestamp < now;
        });
    },

    getAdsData: function getAdsData(dc, from, to) {
        var now = Date.now() - LAG;

        if (!ads[dc]) { return []; }

        return ads[dc].filter((data) => {
            return data.timestamp >= from
                && data.timestamp <= to
                && data.timestamp < now;
        });
    },
};
