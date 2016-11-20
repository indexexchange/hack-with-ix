'use strict';

var data    = require('../data/data.json'),
    servers = data.servers,
    perf    = data.perfstats,
    ads     = data.adstats,
    LAG     = 60 * 5 * 1000;

// byDate returns a filter function
// that can be used to filter a list of objects with `.timestamp` attributes
function byDate(from, to, now) {
    return (data) => {
        return data.timestamp >= from
            && data.timestamp <= to
            && data.timestamp < now;
    };
}

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

        return perf[dc][server].filter(byDate(from, to, now));
    },

    getAdsData: function getAdsData(dc, from, to) {
        var now = Date.now() - LAG;

        if (!ads[dc]) { return []; }

        return ads[dc].filter(byDate(from, to, now));
    },
};
