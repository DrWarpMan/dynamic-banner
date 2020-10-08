/* ==============================
    Modules
============================== */

const express = require("express");
const gd = require("node-gd");
const path = require("path");
const fs = require("fs");

const votes = require("./votes");
const teamspeak = require("./teamspeak");

const cfg = require("./config");

/* ==============================
    Run simple checking tasks
============================== */

// Create banner output folder
try {
    fs.mkdirSync(path.resolve(__dirname, cfg.bannerOutputFolder));
} catch (err) {
    if (err.code != "EEXIST") {
        console.log("Could not create output directory: " + cfg.bannerOutputFolder);
    }
}

/* ==============================
    Load handlers
============================== */

const tsHandler = teamspeak(cfg.queryDetails, cfg.botsGroups);
const voteHandler = votes(cfg.voteAPIkey);

/* ==============================
    Banner request handling
============================== */

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, path.join(cfg.bannerOutputFolder, cfg.bannerOutputFile)), err => {
        if (err) {
            console.log(err);
            res.end("FATAL ERROR: Contact the webmaster!");
        }
    });
});

/* ==============================
    Banner generator
============================== */

generateBanner();
setInterval(generateBanner, (cfg.bannerInterval || 60) * 1000);

async function generateBanner() {
    try {
        // Open image
        const image = await gd.openFile(path.resolve(__dirname, cfg.bannerPath));

        const data = await getBannerData();

        if (!data) throw new Error("FATAL ERROR: Banner data could not be received!");

        // Allocate colors from configuration
        let colors = {};
        Object.keys(cfg.colors).forEach(colorName => {
            const rgb = cfg.colors[colorName];
            colors[colorName] = image.colorAllocate(rgb[0], rgb[1], rgb[2]);
        });

        cfg.strings.forEach(string => {
            image.stringFT(colors[string.color], cfg.fonts[string.font], string.size, string.angle, string.x, string.y, string.text);
        });

        // Export image
        await image.savePng(path.resolve(__dirname, path.join(cfg.bannerOutputFolder, cfg.bannerOutputFile)), 0);

        image.destroy();
        return;
    } catch (err) {
        console.log(err);
    }
}

/* ==============================
    Functions
============================== */

async function getBannerData() {
    try {
        return {
            tsData: (cfg.tsEnable) ? await tsHandler.getData() : false,
            votes: (cfg.voteHandler) ? await voteHandler.getVotes() : false
        };
    } catch (err) {
        console.log(err);
        return false;
    }
}

function timeString() {
    const dNow = new Date();
    return ((dNow.getHours() < 10) ? "0" : "") + dNow.getHours() + ":" + ((dNow.getMinutes() < 10) ? "0" : "") + dNow.getMinutes();
}

function dateString() {
    const dNow = new Date();
    const day = dNow.getDate();
    const month = dNow.getMonth() + 1;

    return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}`;
}

function centerPosX(image, color, font, fSize, angle, y, text) {
    const bbox = image.stringFTBBox(color, font, fSize, angle, 0 /* x = 0 */ , y, text); // returns [xll, yll, xlr, ylr, xur, yur, xul, yul]
    const width = bbox[4];
    return Math.floor((image.width - width) / 2);
}

function getDaysOfExistence() {
    const dNow = Date.now();
    const dStart = 1461250680000; // Date of the start of the project
    const difference = dNow - dStart;
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(difference / oneDay);
    return days.toString();
}


/* ==============================
    LISTEN
============================== */
app.listen(cfg.appPort, "localhost");