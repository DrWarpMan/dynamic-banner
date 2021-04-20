/* ==============================
    TeamSpeak
============================== */
const fetch = require("node-fetch");

module.exports = queryDetails => {
    async function getData() {
        const requestOptions = {
            method: `GET`,
            headers: { "x-api-key": queryDetails.qKey }
        };

        const commands = ["clientlist?-uid&-groups", "serverinfo"];

        try {
            const tsData = {};

            for (const command of commands) {
                const response = await fetch(queryDetails.qURL + command, requestOptions);
                const result = await response.json();

                switch (command) {
                    case "clientlist?-uid&-groups":
                        const clients = result.body;
                        const online = clients.filter(client => !isBot(client));

                        tsData["online"] = online.length;

                        break;
                    case "serverinfo":
                        const info = result.body;
                        const max = info[0]["virtualserver_maxclients"];
                        const platform = info[0]["virtualserver_platform"];

                        tsData["max"] = max;
                        tsData["platform"] = platform;

                        break;
                    default:
                        throw new Error("Invalid command!");
                }
            }

            return tsData;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    function isBot(client) {
        return client["client_servergroups"].split(",").some(gID => (queryDetails.qBotsGroups || []).includes(gID)) ||
            (queryDetails.qBotsUIDs || []).includes(client["client_unique_identifier"]) ||
            client["client_type"] === "1";
    }

    return {
        getData
    };
};