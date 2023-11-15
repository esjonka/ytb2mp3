const express = require('express');
const cors = require('cors');
const download = require('./routes/download')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./src/temp'));

const PORT = 3001;

app.use('/download', download);

app.get('/', (req, res) => {
    res.send('endpoint test');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


