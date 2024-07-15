import {pipeline} from '@xenova/transformers';
import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const pipe = await pipeline('sentiment-analysis')//allocate a pipeline for sentimental-analysis
// console.log(await pipe('i am so so excited'));
const app = express(); //initialize the express instance 


//middleware setup to send the json data 
app.use(express.json()); 

//Middleware to make the public files available everywhere on the web page
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/', async(req,res) => {
    const result = await pipe(req.body.text);
    res.json(result);
});

//GET api to send the html file as response for http request
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});

app.listen(3000, () => {
    console.log("server listening at port 3000");
});