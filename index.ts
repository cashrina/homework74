import express from 'express';
import fs from 'fs';
import {IMessages, MessageWithDate} from "./types";

const app = express();
const port = 8000;

app.use(express.json());

const SAVE_DIR = 'messages';

app.post('/messages', (req, res) => {
    const data : IMessages   =  req.body;
    console.log(data);
    const dataDate: MessageWithDate = {
        ...data,
        date: new Date().toISOString(),
    };

    const filename = `${SAVE_DIR}/${dataDate.date}.txt`;

    fs.writeFile(filename, `${data.message}`, (err) => {
        if (err) {
            console.error(err);
        }
        res.json(data);
    });

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});