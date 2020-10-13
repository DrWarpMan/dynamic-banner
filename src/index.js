/* ==============================
    Modules
============================== */

const express = require("express");
const gd = require("node-gd");
const path = require("path");
const fs = require("fs");

const votes = require("./votes");
const teamspeak = require("./teamspeak");

const cfg = require("./config.default");

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

        const replacePH = str => {
            const { ts, votes } = data;

            if (ts !== false) {
                str = str.replace("%platform%", ts.platform);
                str = str.replace("%online%", ts.online);
            }

            if (votes !== false) {
                str = str.replace("%votes%", votes);
            }

            // Other simple replacements
            str = str.replace("%time%", timeString());
            str = str.replace("%date%", dateString());

            return str;
        }

        cfg.strings.forEach(string => {
            let params = [colors[string.color], cfg.fonts[string.font], string.size, string.angle, string.x, string.y, replacePH(string.text)];

            if (params[4] === "center") // string.x
                params[4] = centerPos("x", image, ...params);
            if (params[5] === "center") // string.y
                params[5] = centerPos("y", image, ...params);

            image.stringFT(...params);
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
            ts: (cfg.tsEnable) ? await tsHandler.getData() : false,
            votes: (cfg.voteEnable) ? await voteHandler.getVotes() : false
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
    const year = dNow.getFullYear();

    return `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;
}

// https://y-a-v-a.github.io/node-gd/ 
function centerPos(pos = "x", image, color, font, fSize, angle, x, y, text) {
    // ignore x,y
    const bbox = image.stringFTBBox(color, font, fSize, angle, 0, 0, text);
    return Math.floor((image[(pos === "x") ? "width" : "height"] - ((pos === "x") ? bbox[4] : bbox[5])) / 2);
}


/* ==============================
    LISTEN
============================== */
app.listen(cfg.appPort, cfg.host);