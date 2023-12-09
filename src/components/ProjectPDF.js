import { Box } from '@mui/material';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// import {  } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Test() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }
  
    function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
  
    function previousPage() {
      changePage(-1);
    }
  
    function nextPage() {
      changePage(1);
    }
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', 

          

        }}
      >
        <Document
          file={"https://file.notion.so/f/f/24131e48-6721-45e4-ba1e-c23acaee2142/f1f394a9-9170-4529-90e1-7815995f6dab/iVOLVE_Standard_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD.pdf?id=08fdfb71-4762-4066-a53f-35b1efe1187b&table=block&spaceId=24131e48-6721-45e4-ba1e-c23acaee2142&expirationTimestamp=1702180800000&signature=ltkEq1a4PZb75Sg-XGrs9WyY7VA8zGU7W4nXiU2sjZo&downloadName=iVOLVE+Standard+%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
        //   rotate={90}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </Box>
    );
  }