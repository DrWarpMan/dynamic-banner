# dynamic-banner
Dynamic banner for TeamSpeak

Information
-
Dynamic banner created mainly for TeamSpeak servers,
to show various data about the server on a banner.
This data will be dynamically updated, hence the name.

Including:
- Basic data - custom text, time, date
- TeamSpeak data - online clients, max. clients
- Server votes - (API: https://teamspeak-servers.org)

Example
-
![alt text](https://github.com/DrWarpMan/dynamic-banner/blob/main/images/example.png?raw=true)

Live demo of my own dynamic banner: https://banner.dark-gaming.eu/

Download
-
Dependencies:
```bash
sudo apt install libgd-dev build-essential
```
(this is for Debian/Ubuntu, for other platforms read here - https://www.npmjs.com/package/node-gd)

Clone the repository:
```bash
git clone https://github.com/DrWarpMan/dynamic-banner.git
cd dynamic-banner
```
then install the packages:
```bash
npm install
```

Configure
-
Copy the default config:
```bash
cp config.default.js config.js
```
and edit it to your needs afterwards.

Run
-
```bash
npm start
```
or
```bash
cd dynamic-banner && node .
```
you can / will need to run the app via PM2 in the background.

Configuration
-
TBA
