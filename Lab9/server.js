const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(cors());
app.use(express.static(__dirname + '/pages'));
app.disable('etag');
app.use(jsonParser);
app.use('/', router);

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
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200)
            .send(settings)
    })
});


router.post('/settings', (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0)
        res.sendStatus(400)
            .json({ message: 'No body', status: 400 });

    const settings = {...req.body};

    fs.writeFile('user-settings.json', JSON.stringify(settings), (err) => {

        if (err) console.log(err);

        res.sendStatus(204);
    });
});

app.listen(3010, () => console.log('Server ready'));