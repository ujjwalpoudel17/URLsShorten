

const Url = require("../models/Urls");
const aliasGenerate = require("../utils/aliasGenerate");

// Create short URL
exports.createShortUrl = async (longUrl) => {
    let alias;
    let exists;

    do {
        alias = aliasGenerate().toLowerCase();
        exists = await Url.findOne({ alias });
    } while (exists);

    const newUrl = await Url.create({
        originalUrl: longUrl,
        alias: alias
    });

    return newUrl;
};

// Get URL by alias (case-insensitive) and track clicks
exports.getUrlByAlias = async (alias) => {
    alias = alias.toLowerCase().trim();
    if (alias.endsWith('/')) alias = alias.slice(0, -1);

    const url = await Url.findOne({ alias: { $regex: `^${alias}$`, $options: "i" } });
    if (!url) return null;

    url.clicks += 1;
    url.clickHistory.push({ timestamp: new Date() });
    await url.save();

    return url;
};

// Get all URLs
exports.getAllUrls = async () => {
    return await Url.find({}, { originalUrl: 1, alias: 1, clicks: 1 });
};

// Get clicks for analytics
exports.getUrlClicks = async (alias) => {
    const url = await Url.findOne({ alias: { $regex: `^${alias}$`, $options: "i" } });
    if (!url) return null;
    return url.clickHistory.map(c => c.timestamp);
};