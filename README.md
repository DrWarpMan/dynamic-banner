# dynamic-banner
Dynamic banner

Information
-
Dynamic banner created mainly for TeamSpeak servers,
to show various data about the server on a banner.
This data will be dynamically updated, hence the name.

Including:
- Basic data - custom text, time, date
- TeamSpeak data - online clients, max. clients
- Server votes - (API: https://teamspeak-servers.org)

Download
-
```bash
git clone https://github.com/DrWarpMan/dynamic-banner.git
```

Take a look here https://www.npmjs.com/package/node-gd,
to install node-gd library properly.

E.g.: Debian / Ubuntu users:
```bash
sudo apt install libgd-dev
```
then install packages
```bash
npm install
```


Configure
-
```bash
cp config.default.js config.js
```
and edit the config afterwards to your needs


Run
-
```bash
npm start
```
or
```bash
node .
```

Configuration
-
TBA


