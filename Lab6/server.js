const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);
app.use('/', router);
app.use(express.static(__dirname + '/pages/Task3'));

router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname+'/pages/Task3/index.html'));
});

router.post('/form', (req, res) => {

    var body = req.body;

    if (body) {

        console.log(body.input);
        var date = Date.now();
        res.json({date: date});
    }
});

app.listen(3010, () => console.log('Server ready'));