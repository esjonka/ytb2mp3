const express = require('express');
const path = require('path');
const cors = require('cors');
const download = require('./routes/download')

const app = express();

let corsOptions = {
    origin: 'https://ytb2mp3-stg-0840c0604471.herokuapp.com/'
}

app.use(express.json());
app.use(cors(), corsOptions);
app.use(express.static(path.join(__dirname, '../../frontend/build')));

const PORT = process.env.PORT || 3001;

app.use('/download', download);

app.get('/*', (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../frontend/build/index.html"),
        function(err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


