
const urlService = require('../services/urlService');

exports.shortenUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!longUrl) return res.status(400).json({ message: "Long URL is required" });

        const newUrl = await urlService.createShortUrl(longUrl);

        res.status(201).json({ shortUrl: newUrl.alias });
    } catch (error) {
        console.error("Error occurred while shortening URL:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        let { alias } = req.params;

        const url = await urlService.getUrlByAlias(alias);

        if (!url) return res.status(404).json({ message: "URL not found" });

        res.redirect(url.originalUrl);
    } catch (error) {
        console.error("Error in redirectUrl:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await urlService.getAllUrls();
        res.json(urls);
    } catch (error) {
        console.error("Get URLs error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUrlClicks = async (req, res) => {
    try {
        const { alias } = req.params;
        const clicks = await urlService.getUrlClicks(alias);

        if (!clicks) return res.status(404).json({ message: "URL not found" });

        res.json({ clicks });
    } catch (error) {
        console.error("Clicks error:", error);
        res.status(500).json({ message: "Server error" });
    }
};