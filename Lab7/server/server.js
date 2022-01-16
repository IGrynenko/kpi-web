const express = require('express');
const router = express.Router();
const parser = require('body-parser');
const cors = require('cors');
const programService = require('./programService');
const Program = require('./program');
const app = express();

app.use(cors());
app.use(parser.json());
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

router.route('/programs').put(async (req, res) => {

    if (!req.body) 
        res.status(400)
            .json({ status: 400, message: 'Body is required'})

    const program = {...req.body};
    const existingProgram = await programService.getProgram(program.Id);

    if (existingProgram.length === 0)
        res.status(404)
            .json({ status: 404, message: 'Such program doesn\'t exist'});

    await programService.updateProgram(program);

    res.sendStatus(204);
});

app.listen(3010, () => console.log('Server ready'));