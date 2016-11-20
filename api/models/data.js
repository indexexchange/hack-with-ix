'use strict';

var data    = require('../data/data.json'),
    servers = data.servers,
    perf    = data.perfstats,
    ads     = data.adstats,
    query     = data.adstats,
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

    getQueryData: function getQueryData(dc, pf, ft) {
        var now = Date.now() - LAG;

        if (dc && pf && ft) {
            return query[dc].filter((data) => {
                return data.platform == pf
                    && data.format == ft
                    && data.timestamp < now;
            });          
        }

        if (dc && pf) {
            return query[dc].filter((data) => {
                return data.platform == pf
                    // && data.format == ft
                    && data.timestamp < now;
            }); 
        }

        if (dc && ft) {
            return query[dc].filter((data) => {
                return data.format == ft
                    && data.timestamp < now;
            }); 

        }

        // if (pf && ft) {


        // }

        if (dc) {
            return query[dc].filter((data) => {
                return data.timestamp < now;
            }); 
        }

        // if (pf) {

        // }

        // if (ft) {


        // }

        return query;
    },

    rankData: function rankData(result, limit) {
        var ranked = result;


        ranked['data'].sort(function (a, b) {
            return (a['spend']/(a['impressions']*1000)) - (b['spend']/(b['impressions']*1000));
        });

        ranked['data'] = ranked['data'].slice(0, limit);
        for (var i = 0; i < ranked['data'].length; i++) {
            ranked['data'][i]['cdm'] = (ranked['data'][i]['spend']/(ranked['data'][i]['impressions']*1000))
        }

        return ranked;
    },
};
