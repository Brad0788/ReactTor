const express = require("express");
const api = require('qbittorrent-api-v2')

const { qBittorrentClient } = require('@robertklep/qbittorrent');

const client = new qBittorrentClient('http://158.101.121.44:8443', 'Kururi', 'Rekjel07');


const PORT = process.env.PORT || 3001;

const app = express();

app.get("/send", async (req, res) => {
    const send = await client.torrents.add('magnet:?xt=urn:btih:aac6e90d04930123107c9cf3142219a58b5b5421&dn=%5BSubsPlease%5D%20Blue%20Lock%20-%2001v2%20%281080p%29%20%5BB1D5390F%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce');
    console.log("Done!")
});

app.get("/qbit", async (req, res) => {
    const info = await client.app.version();
    const torrents = await client.torrents.info();
    res.json({torrents})
    console.log(info);
});

app.get("/api", (req, res) => {
    api.connect('http://158.101.121.44:8443', 'Kururi', 'Rekjel07')
    .then(qbt => {
        qbt.torrents()
            .then(torrents => {
                res.json({ torrents });
                console.log(torrents)
            })
            .catch(err => {
                console.error(err)
            })
    })
    .catch(err => {
        console.error(err)
    })
    
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


 
