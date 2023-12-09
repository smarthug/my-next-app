import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Box } from '@mui/material';

// import './Sample.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 1200;

export default function Sample() {
    const [file, setFile] = useState('/sample.pdf');
    const [numPages, setNumPages] = useState();
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState();

    const onResize = useCallback((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onFileChange(event) {
        const { files } = event.target;

        if (files && files[0]) {
            setFile(files[0] || null);
        }
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }


    // const [numPages, setNumPages] = useState(null);
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
                width: '100%',
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center',

            }}
        >


            <div className="Example">
                <header>
                    {/* <h1>react-pdf sample page</h1> */}
                </header>
                <div className="Example__container">
                    {/* <div className="Example__container__load">
                        <label htmlFor="file">Load from file:</label>{' '}
                        <input onChange={onFileChange} type="file" />
                    </div> */}
                    <div className="Example__container__document" ref={setContainerRef}>
                        <Document file={"https://file.notion.so/f/f/24131e48-6721-45e4-ba1e-c23acaee2142/f1f394a9-9170-4529-90e1-7815995f6dab/iVOLVE_Standard_%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD.pdf?id=08fdfb71-4762-4066-a53f-35b1efe1187b&table=block&spaceId=24131e48-6721-45e4-ba1e-c23acaee2142&expirationTimestamp=1702180800000&signature=ltkEq1a4PZb75Sg-XGrs9WyY7VA8zGU7W4nXiU2sjZo&downloadName=iVOLVE+Standard+%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD.pdf"} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                                />
                            ))}

                            {/* <Page pageNumber={pageNumber}
                            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                            /> */}
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
                    </div>
                </div>
            </div>

        </Box>


    );
}
