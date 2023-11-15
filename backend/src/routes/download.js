const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');
const fs = require('fs');
const router = express.Router();

router.route('/mp3').post(async (req, res) => {
    
    try {

        const options = {
            filter: 'audioonly',
        };

        const url = req.body.url;
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title

        const audioPath = path.join(__dirname, 'temp', 'video.mp3');
        const audioWriteStream = fs.createWriteStream(audioPath);
        ytdl(url, options).pipe(audioWriteStream);

        audioWriteStream.on('finish', () => {
            res.download(audioPath, 'video.mp3', () => {
                fs.unlinkSync(audioPath);
            });
        });

    } catch (err) {
        console.log (`Error: ${err}`);
    }
})

router.route('/title').post(async (req, res) => {
    try {
        const url = req.body.url;
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title

        res.send(`{"url": "${title}"}`)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;