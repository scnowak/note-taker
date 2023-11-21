const router = require ('express').Router();
const { v4: uuidv4 } = require('uuid');

const {readFile,writeFile} = require('fs/promises');

const fileName = './db/db.json';

router.get('/notes', async(req, res) =>{
    const data = await readFile(fileName, 'utf8');
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
})

router.post('/notes', async(req, res) =>{
    console.log(req.body)
    const note={
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    const data = await readFile(fileName, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(note);
    const update=await writeFile(fileName, JSON.stringify(parsedData));
    res.json(parsedData);
})

router.delete('/notes', (req, res) =>{
    res.json('success delete');
})


module.exports = router;