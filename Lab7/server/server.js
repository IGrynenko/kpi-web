const express = require('express');
const router = express.Router();
const parser = require('body-parser');
const cors = require('cors');
const programService = require('./programService');
const Program = require('./program');
const app = express();
const jsonParser = parser.json()

app.use(cors());
app.use(jsonParser);
app.use('/api', router);

router.route('/programs').get(async (req, res) => {
    
    const result = await programService.getAllPrograms();
    res.send(result[0]);
});

router.route('/programs/:title').get(async (req, res) => {
    
    const title = req.params.title;

    if (!title)
        res.status(400)
            .json({ status: 400, message: 'Title is required'})

    const result = await programService.getProgram(title);

    if (!result[0] || result[0].length === 0)
        res.sendStatus(404);

    res.send(result[0]);
});

router.route('/programs').post(async (req, res) => {

    if (!req.body) 
        res.status(400)
            .json({ status: 400, message: 'Body is required'})

    console.log(req.body);

    const program = {...req.body};
    const newProgram = await programService.createProgram(program);

    console.log(newProgram);

    res.sendStatus(204);
});

app.listen(3010, () => console.log('Server ready'));