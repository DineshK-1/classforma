import Title from "../../Components/Title/Title.component";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import "./PdfViewer.styles.css"

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from "react";

import { useLocation } from "react-router";

const Viewer = () => {
    const location = useLocation()

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js";
    }, []);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const drawRect = () => {
        const canvas = document.getElementsByClassName("react-pdf__Page__canvas")
        const ctx = canvas[0].getContext('2d')
        
    }

    return (
        <div className="wrapper">
            <div className="left">
                <div className="Labels">
                    <Title content={"Labels"} />
                    <button className="Title">Title</button>
                    <button className="Author">Author</button>
                </div>
                <div className="Boxes">
                    <Title content={"Boxes"} />
                </div>
            </div>
            <div className="right">
                <Document file={location.state.PDFLink} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="pages">
                    <button className="left" onClick={() => { setPageNumber((page) => { if (page > 1) { return page - 1 } else { return 1 } }) }}>&#60;</button>
                    <span>{pageNumber} of {numPages}</span>
                    <button onClick={drawRect}>XD</button>
                    <button className="right" onClick={() => { setPageNumber((page) => { if (page < numPages) { return page + 1 } else { return numPages } }) }}>&#62;</button>
                </div>
            </div>
        </div>
    )
}

export default Viewer;