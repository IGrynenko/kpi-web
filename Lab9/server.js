const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.static(__dirname + '/pages'));
app.disable('etag');

router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname+'/pages/index.html'));
});

router.get('/settings', (req, res) => {

    fs.readFile('user-settings.json', (err, data) => {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        
        const settings = JSON.parse(data);
        res.status(200)
            .send(settings)
    })
});

app.use('/', router);

app.listen(3010, () => console.log('Server ready'));