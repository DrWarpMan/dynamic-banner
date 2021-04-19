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
cfg.bannerPath = path.resolve("./images/original.png"); // banner image path
cfg.bannerOutputFolder = path.resolve("./public"); // where to output the image
cfg.bannerOutputFile = path.join(cfg.bannerOutputFolder, "banner.png"); // name of the output image
cfg.fontsFolder = path.resolve("./fonts"); // fonts foler
cfg.fonts = {
    "customname": path.join(cfg.fontsFolder, "Ubuntu-B.ttf")
}
cfg.colors = { // RGB
    "black": [0, 0, 0],
    "white": [255, 255, 255]
}

/*
Parameters:
- text, color, font, size, x, y, angle (x, y can also be replaced with a string "center")
Currently available placeholders are:
- %platform%, %online%, %max%, %votes%, %time%, %date%
*/
cfg.strings = [{
        text: "Welcome to the community!",
        color: "white",
        font: "customname",
        size: 18,
        x: "center",
        y: 177, // or "center"
        angle: 0
    },
    {
        text: "%date%",
        color: "white",
        font: "customname",
        size: 18,
        x: 214,
        y: 248,
        angle: 0
    },
    {
        text: "%time%",
        color: "white",
        font: "customname",
        size: 18,
        x: 420,
        y: 248,
        angle: 0
    },
    {
        text: "Empty..",
        color: "white",
        font: "customname",
        size: 18,
        x: 582,
        y: 248,
        angle: 0
    },
    {
        text: "Empty..",
        color: "white",
        font: "customname",
        size: 18,
        x: 764,
        y: 248,
        angle: 0
    }
];

/* ==============================
    Vote API key (https://teamspeak-servers.org/)
============================== */

cfg.voteEnable = false;
cfg.voteAPIkey = "";

/* ==============================
    TeamSpeak
============================== */

cfg.tsEnable = false;

cfg.queryDetails = {
    qURL: "https://domain.tld/byport/9987/", // query api url with port
    qKey: "queryapikey",
    qBotsUIDs: [ // list of bots UIDs to ignore
        "botuid1",
        "botuid2"
    ],
    qBotsGroups: ["botgroup1", "botgroup2"] // list of bots group IDs to ignore
}

/* ==============================
    EXPORT CONFIGURATION
============================== */
module.exports = cfg;