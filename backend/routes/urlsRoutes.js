// const express = require ('express');
// const router = express.Router();

// const rateLimiter = require('../middlewares/rateLimiter');
// const {
//     shortenUrl,
//     redirectUrl
// } = require("../controllers/urlController");

// //this is the route for shortening the url
// router.post("/shorten", rateLimiter, shortenUrl);

// //this is the route for redirecting the url
// router.get("/:alias", redirectUrl);

// module.exports = router;











// const express = require('express');
// const router = express.Router();

// const rateLimiter = require('../middlewares/rateLimiter');
// const { shortenUrl, redirectUrl, getAllUrls, getUrlClicks } = require("../controllers/urlController");

// router.post("/shorten", rateLimiter, shortenUrl);

// //this is analytics routes
// router.get("/urls", getAllUrls);
// router.get("/urls/:alias/clicks", getUrlClicks);

// router.get("/:alias", redirectUrl);

// module.exports = router;











const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const { shortenUrl, redirectUrl, getAllUrls, getUrlClicks } = require("../controllers/urlController");

router.post("/shorten", rateLimiter, shortenUrl);

router.get("/urls", getAllUrls);
router.get("/urls/:alias/clicks", getUrlClicks);

router.get("/:alias", redirectUrl);

module.exports = router;