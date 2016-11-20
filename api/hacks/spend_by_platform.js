const _ = require('lodash');
const data = require('../data/data.json');
const log = console.log.bind(console);

// Ads we are analyzing
const ads = data.adstats.NA;

const K = 1000;
const M = 1000000;
const G = 1000000000;

function SpendByPlatform(platform, format) {
    return _.chain(ads)
    .filter(PlatformFilter(platform, format))
    .map("spend")
    .sum()
    .value();
}

function ImpressionsByPlatform(platform, format) {
    return _.chain(ads)
    .filter(PlatformFilter(platform, format))
    .map("impressions")
    .sum()
    .value();
}

function PlatformFilter(platform, format) {
    if(!format && !platform) {
        return {};
    } else if(!platform) {
        return {format};
    } else if(!format) {
        return {platform};
    }
    return {platform, format};
}

function money(x) {
    return "$" + unitify(x);
}

function unitify(x) {
    x = Math.floor(x);
    if(x < K) {
        return Math.floor(x);
    } else if(x < M) {
        return Math.floor(x / K) + "k";
    }
    return Math.floor(x / M) + "M";
}

function Breakdown(platform, format) {
    const spend = SpendByPlatform(platform, format);
    const views = ImpressionsByPlatform(platform, format);

    log(`${platform} - ${format}:`,
        money(spend),
        unitify(views),
        unitify(spend/views)
    );
}
// Desktop
Breakdown("desktop", "video");
Breakdown("desktop", "banner");
// Mobile
Breakdown("mobile", "video");
Breakdown("mobile", "banner");
// App
Breakdown("app", "video");
Breakdown("app", "banner");