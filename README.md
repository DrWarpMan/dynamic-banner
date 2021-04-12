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
Dependencies (for Debian/Ubuntu):
```bash
sudo apt install libgd-dev build-essential
```
Clone the repository:
```bash
git clone https://github.com/DrWarpMan/dynamic-banner.git
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
and edit the config afterwards to your needs.

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
