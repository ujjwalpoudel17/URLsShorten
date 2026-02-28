// const Url = require("../models/Urls");
// const aliasGenerate = require("../utils/aliasGenerate");

// //this is where we create a short url
// exports.createShortUrl = async (req, res) => {
//     let alias;
//     let exists;

//     //preventing the collision of alias
//     do{
//         alias = aliasGenerate();
//         exists = await Url.findOne({ ShortUrl: alias});
//     }
//     while(exists);

//     const newUrl = await Url.create({
//         longUrl,
//         shortUrl: alias
//     });
//     return newUrl;
// };

// //this is where we get the long url from the short url i.e reduirect and track the click

// exports.getUrlByAlias = async (alias) => {
//     const url = await Url.findOne({ shortUrl: alias });

// if(!url) return null;

// url.click += 1;
// url.clickHistory.push({});
// await url.save();

// return url;
// };























// const Url = require("../models/Urls");
// const aliasGenerate = require("../utils/aliasGenerate"); // use one alias generator

// // Create short URL
// exports.createShortUrl = async (longUrl) => {
//     let alias;
//     let exists;

//     do {
//         alias = aliasGenerate();
//         exists = await Url.findOne({ alias });
//     } while (exists);

//     const newUrl = await Url.create({
//         originalUrl: longUrl,
//         alias: alias
//     });

//     return newUrl;
// };

// // Get URL by alias and track click
// exports.getUrlByAlias = async (alias) => {
//     // normalize alias
//     alias = alias.toLowerCase().trim();

//     const url = await Url.findOne({ alias: { $regex: `^${alias}$`, $options: "i" } });
//     if (!url) return null;

//     url.clicks += 1;
//     url.clickHistory.push({ timestamp: new Date() });
//     await url.save();

//     return url;
// };


// // ---------------- GET ALL URLS ----------------
// exports.getAllUrls = async (req, res) => {
//     try {
//         const urls = await urlService.getAllUrls();
//         res.json(urls);
//     } catch (error) {
//         console.error("Get URLs error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ---------------- GET CLICKS ----------------
// exports.getUrlClicks = async (req, res) => {
//     try {
//         const { alias } = req.params;

//         const clicks = await urlService.getUrlClicks(alias);

//         if (!clicks) {
//             return res.status(404).json({ message: "URL not found" });
//         }

//         res.json({ clicks });

//     } catch (error) {
//         console.error("Clicks error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };


















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