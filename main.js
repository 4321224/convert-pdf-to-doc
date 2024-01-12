const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

async function convertPdfToDoc(pdfPath, docPath) {
  try {
    const pdfData = await fs.promises.readFile(pdfPath);

    const data = await pdf(pdfData);

    const textContent = data.text;

    const htmlContent = `<html><body><p>${textContent}</p></body></html>`;

    // Convert HTML to DOCX using mammoth.js
    mammoth.extractRawText({ arrayBuffer: Buffer.from(htmlContent) })
      .then((result) => {
        const docxContent = result.value;

        // Save the DOCX file
        fs.writeFileSync(docPath, docxContent);

        console.log('Conversion completed successfully.');
      })
      .catch((error) => {
        console.error('Error converting to DOCX:', error);
      });
  } catch (error) {
    console.error('Error reading PDF file:', error);
  }
}

const pdfFilePath = 'path/to/your/file.pdf';
const docFilePath = 'path/to/save/output.docx';

convertPdfToDoc(pdfFilePath, docFilePath);
