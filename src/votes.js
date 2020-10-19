/* ==============================
    Votes
============================== */
const fetch = require("node-fetch");

module.exports = (voteAPIkey) => {
    async function getVotes() {
        try {
            const response = await fetch("https://teamspeak-servers.org/api/?object=servers&element=detail&key=" + voteAPIkey);
            const voteData = await response.json();
            return voteData.votes;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return {
        getVotes
    };
};