 const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Tesseract = require("tesseract.js");

/*
====================================
Universal Document Intelligence Engine
====================================
*/

async function extractDocumentText(filePath){

    if(!fs.existsSync(filePath)){
        throw new Error("File not found");
    }

    const extension = filePath.split(".").pop().toLowerCase();

    let text = "";

    /*
    -----------------------------
    PDF Processing
    -----------------------------
    */
     if(extension === "pdf"){

    const dataBuffer = fs.readFileSync(filePath);

    const parsed = await pdfParse(dataBuffer);

    text = parsed.text || "";

}

    /*
    -----------------------------
    Word Document Processing
    -----------------------------
    */
    else if(extension === "docx" || extension === "doc"){
        const result = await mammoth.extractRawText({
            path:filePath
        });
        text = result.value;
    }

    /*
    -----------------------------
    Image OCR Processing
    -----------------------------
    */
    else if(
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg"
    ){
        const result = await Tesseract.recognize(
            filePath,
            "eng"
        );
        text = result.data.text;
    }

    /*
    -----------------------------
    Text File Processing
    -----------------------------
    */
    else if(extension === "txt"){
        text = fs.readFileSync(filePath,"utf8");
    }

    return text;
}

module.exports = { extractDocumentText };