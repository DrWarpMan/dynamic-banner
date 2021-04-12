/* ==============================
    Modules
============================== */

const path = require("path");

/* ==============================
    APP CONFIGURATION
============================== */

const cfg = {};

cfg.appPort = 4444;
cfg.host = "localhost";

/* ==============================
    Banner
============================== */

cfg.bannerInterval = 30; // how often will data be refreshed
cfg.bannerPath = "./images/original.png"; // banner image path
cfg.bannerOutputFolder = "../public"; // where to output the image
cfg.bannerOutputFile = "banner.png"; // anme of the output image
cfg.fontsFolder = "./fonts"; // fonts foler
cfg.fonts = {
    "primary": path.resolve(__dirname, cfg.fontsFolder, "Ubuntu-B.ttf"),
    "secondary": path.resolve(__dirname, cfg.fontsFolder, "Ubuntu-B.ttf")
}
cfg.colors = {
    // RGB format
    "black": [0, 0, 0],
    "white": [255, 255, 255]
}

/*
Parameters:
- text, color, font, size, x, y, angle (x, y can also be replaced with "center")
Available placeholders:
- %platform%, %online%, %max%, %votes%, %time%, %date%
*/
cfg.strings = [{
    text: "test",
    color: "black",
    font: "primary",
    size: 18,
    x: 100, // or "center" 
    y: 100, // or "center"
    angle: 0
}];

/* ==============================
    Vote API key (https://teamspeak-servers.org/)
============================== */

cfg.voteEnable = false;
cfg.voteAPIkey = ""; // can be retrieved at their website

/* ==============================
    TeamSpeak
============================== */

cfg.tsEnable = false;

cfg.queryDetails = {
    qPort: "9987", // server port
    qURL() { return `http://domain.tld/byport/${this.qPort}/` }, // api url
    qKey: "queryapikey", // api key for query
    qBotsUIDs: [ // list of bots UIDs
        "botuid1",
        "botuid2"
    ],
    qBotsGroups: ["botgroup1", "botgroup2"]
}

/* ==============================
    EXPORT CONFIGURATION
============================== */
module.exports = cfg;