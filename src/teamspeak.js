/* ==============================
    TeamSpeak
============================== */
const { TeamSpeak } = require("ts3-nodejs-library");

module.exports = (queryDetails, botsGroups) => {
    async function getData() {
        try {
            let tsData = {};

            const ts = await TeamSpeak.connect(queryDetails);

            const clients = (await ts.clientList({ client_type: 0 })).filter(c => !isBot(c));
            tsData["online"] = clients.length;
            const serverInfo = await ts.serverInfo();
            tsData["platform"] = serverInfo.virtualserver_platform;

            await ts.quit();

            return tsData;
        } catch (err) {
            console.log(err);
            return { online: -1, platform: "invalid" };
        }
    }

    function isBot(client) {
        return client.servergroups.some(gID => botsGroups.includes(gID));
    }

    return {
        getData
    };
};