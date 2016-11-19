const _ = require('lodash');
const data = require('./data/data.json');
const log = console.log.bind(console);

// Ads we are analyzing
const ads = data.adstats.AS;

const K = 1000;
const M = 1000000;
const G = 1000000000;

function SpendByPlatform(platform, format) {
    const sum = _.chain(ads)
    .filter(PlatformFilter(platform, format))
    .map("spend")
    .sum()
    .value();

    return money(sum);
}

function ImpressionsByPlatform(platform, format) {
    const sum = _.chain(ads)
    .filter(PlatformFilter(platform, format))
    .map("impressions")
    .sum()
    .value();

    return unitify(sum);
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
    log(`${platform} - ${format}:`,
        SpendByPlatform(platform, format),
        ImpressionsByPlatform(platform, format)
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