const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(__dirname + '/pages/Task3'));


router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname+'/pages/Task3/index.html'));
});

app.use('/', router);

app.listen(3010, () => console.log('Server ready'));