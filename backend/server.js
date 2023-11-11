
const docx = require('docx');
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');

const app = express();
const port = 3000;
const { Document, Packer, Paragraph, TextRun } = docx;

app.use(cors());


app.get('/quote', async (req, res) => {
    //const doc = createQuote();
    const doc = await docx.patchDocument(fs.readFileSync("templates/quote.docx"), {
        patches: {
            client: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("Aji Nav")]
            },
            address: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")]
            }
        }
    })

    fs.writeFileSync("finalquote.docx", doc);

    res.setHeader('Content-Disposition', 'attachment; filename=finalquote.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    res.sendFile("finalquote.docx", {root: __dirname}, (err) => {
        if (err){
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error');
        } 
        else {
            console.log('File sent successfully!');
            // Remove the file after sending it
            fs.unlinkSync("finalquote.docx");
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


function createReport(){
    
}

function createQuote(){
    return docx.patchDocument(fs.readFileSync("templates/quote.docx"), {
        patches: {
            client: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("Aji Nav")]
            },
            address: {
                type: docx.PatchType.PARAGRAPH,
                children: [new TextRun("27 Kingfisher Gardens")]
            }
        }
    });
}
