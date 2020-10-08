/* ==============================
    Top Data
============================== */
const { Database, OPEN_READONLY } = require('sqlite3');

module.exports = (dbFile, ignoreUIDs, topCount) => {
    function getData() {
        return new Promise((resolve, reject) => {
            let topData = [];

            const db = new Database(dbFile, OPEN_READONLY, err => {
                if (err) {
                    reject(err);
                    return console.log("Error while connecting to a database!");
                }

                //console.log("Successful connection!");

                let sql = "SELECT * FROM scriptdata";

                db.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err);
                        return console.log("Error while querying a database!");
                    }

                    //console.log("Succesfully retrieved rows!");

                    const allUsersNicknames = JSON.parse((rows.find(row => row.uuid === "tunakills_ranking" && row.keyname.startsWith("allUserListed"))).data);
                    const allUsersData = rows.filter(row => row.uuid === "tunakills_ranking" && row.keyname.startsWith("timetrak"))
                        .sort((a, b) => b.data - a.data);

                    topData = allUsersData.filter(userData => {
                        const uid = userData.keyname.substring("timetrak".length);
                        return (ignoreUIDs.includes(uid)) ? false : true;
                    });

                    topData = topData.slice(0, topCount);

                    topData = topData.map(userData => {
                        const uid = userData.keyname.substring("timetrak".length);
                        const nick = allUsersNicknames.find(i => i.uid === uid)["name"];

                        return {
                            "nick": nick,
                            "uid": uid
                        };
                    });

                    db.close(err => {
                        if (err) {
                            reject(err);
                            return console.log("Error while closing a database!");
                        }

                        //console.log("Succesfully closed the database!");

                        resolve(topData);
                    });
                });
            });
        });
    }

    return {
        getData
    };
};