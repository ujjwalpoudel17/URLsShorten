

const rateLimitStore = {};

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!rateLimitStore[ip]) {
        rateLimitStore[ip] = { count: 1, startTime: currentTime };
        return next();
    }

    const timeDiff = (currentTime - rateLimitStore[ip].startTime) / 1000; // seconds
    if (timeDiff < 60) {
        if (rateLimitStore[ip].count >= 5) {
            const remainingTime = Math.ceil(60 - timeDiff);
            return res.status(429).json({ message: `Too many requests. Try after ${remainingTime} seconds.` });
        }
        rateLimitStore[ip].count += 1;
        return next();
    } else {
        rateLimitStore[ip] = { count: 1, startTime: currentTime };
        return next();
    }
};

module.exports = rateLimiter;
