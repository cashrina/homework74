import express from 'express';
import {promises as fs} from 'fs';
import {IMessages, MessageWithDate} from "./types";

const app = express();
const port = 8000;

app.use(express.json());

const SAVE_DIR = 'messages';

app.post('/messages',async (req, res) => {
    const data : IMessages   =  req.body;
    const dataDate: MessageWithDate = {
        ...data,
        date: new Date().toISOString(),
    };

    const filename = `${SAVE_DIR}/${dataDate.date}.txt`;

    await fs.writeFile(filename, data.message);
    res.json(dataDate);

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});