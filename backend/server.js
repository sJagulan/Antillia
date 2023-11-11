
const docx = require('docx');
const express = require('express');
const cors = require('cors')

const app = express();
const port = 3000;
const { Document, Packer, Paragraph, TextRun } = docx;

app.use(cors());

app.get('/report', async (req, res) => {
    const doc = new Document();

    const b64string = await Packer.toBase64String(doc);
    
    res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
    res.send(Buffer.from(b64string, 'base64'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




function createReport(){

}

function createQuote(){
    
}

