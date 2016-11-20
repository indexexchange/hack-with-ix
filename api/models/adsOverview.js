const _ = require('lodash');
const DATA = require('../data/data.json');

function SpendByPlatform(ads, platform, format) {
    return _.chain(ads)
    .filter(PlatformFilter(platform, format))
    .map("spend")
    .sum()
    .value();
}

function ImpressionsByPlatform(ads, platform, format) {
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


function Breakdown(ads, platform, format) {
    const spend = SpendByPlatform(ads, platform, format);
    const views = ImpressionsByPlatform(ads, platform, format);

    return {
        spend: spend,
        views: views,
        platform: platform,
        format: format,
    };
}

function BreakdownAll(ads) {
    const PLATFORMS = ["desktop", "mobile", "app"];
    const FORMATS = ["video", "banner"];

    return _.flatten(PLATFORMS.map((platform) => {
        return FORMATS.map((format) => {
            return Breakdown(ads, platform, format);
        });
    }));
}

function AdsOverview() {
    const ads = DATA.adstats;

    const NA = ads.NA;
    const EU = ads.EU;
    const AS = ads.AS;
    const ALL = [].concat(NA, EU, AS);

    // Breakdown across continents
    return {
        all: BreakdownAll(ALL),
        NA: BreakdownAll(NA),
        EU: BreakdownAll(EU),
        AS: BreakdownAll(AS),
    };
}

module.exports = AdsOverview;
