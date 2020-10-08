/* ==============================
    Modules
============================== */

const path = require("path");

/* ==============================
    APP CONFIGURATION
============================== */

const cfg = {};

cfg.appPort = 4444;

/* ==============================
    Banner
============================== */

cfg.bannerInterval = 30;
cfg.bannerPath = "./images/original.png";
cfg.bannerOutputFolder = "../public";
cfg.bannerOutputFile = "banner.png";
cfg.fontsFolder = "./fonts";
cfg.fonts = {
    "primary": path.resolve(__dirname, cfg.fontsFolder, "Ubuntu-B.ttf"),
    "secondary": path.resolve(__dirname, cfg.fontsFolder, "Ubuntu-B.ttf")
}
cfg.colors = {
    // RGB format
    "black": [0, 0, 0],
    "white": [255, 255, 255]
}

/* cfg.strings = [
    {
        text: "sample text",
        color: "black",
        font: "primary",
        size: number,
        x: number,
        y: number,
        angle: number
    }
]
*/

cfg.strings = [{
    text: "test",
    color: "black",
    font: "primary",
    size: 18,
    x: 100,
    y: 100,
    angle: 0
}];

/* ==============================
    Vote API key (https://teamspeak-servers.org/)
============================== */

cfg.voteEnable = true;
cfg.voteAPIkey = "";

/* ==============================
    Rank (Database)
============================== */

cfg.rankEenable = false;
cfg.ignoreUIDs = ["", "", ""];
cfg.topCount = 3;
cfg.dbFile = path.resolve("/home/sinusbot/data/db/name.sqlite");

/* ==============================
    TeamSpeak
============================== */

cfg.tsEnable = true;

cfg.botsGroups = [0, 0, 0];
cfg.queryDetails = {
    host: "localhost",
    protocol: "raw",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "",
    nickname: "Banner"
};

/* ==============================
    EXPORT CONFIGURATION
============================== */
module.exports = cfg;