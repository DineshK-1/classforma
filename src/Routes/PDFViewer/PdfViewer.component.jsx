import Title from "../../Components/Title/Title.component";
import "./PdfViewer.styles.css"

import { useEffect, useRef, useState } from "react";
import { usePdf } from '@mikecousins/react-pdf';

import { useLocation } from "react-router";

const Viewer = () => {
    const location = useLocation()

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const [draw, setDraw] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)

    const canvasRef = useRef(null);

    const { pdfDocument, pdfPage } = usePdf({
        file: location.state.PDFLink,
        page: pageNumber,
        canvasRef,
    });

    const docXRef = useRef()
    const docYRef = useRef()

    useEffect(() => {
        if (pdfDocument) {
            setNumPages(pdfDocument.numPages)            
        }
    }, [pdfDocument])

    
    const clickXRef = useRef()
    const clickYRef = useRef()

    const handleClick = (e) => {
        setIsDrawing(true)
        if(!isDrawing){
            const rect = canvasRef.current.getBoundingClientRect()
            docXRef.current = rect.top
            docYRef.current = rect.left
            clickXRef.current = e.clientX - docXRef.current
            clickYRef.current = e.clientY - docYRef.current
            setIsDrawing(true)
        }
    }

    const drawRect = (e) => {
        if(!isDrawing){
            console.log("o")
            return
        }
        const mouseX = clickXRef - docXRef.current
        const mouseY = clickYRef- docYRef.current

        const rectWidth = mouseX - clickXRef.current
        const rectHeight = mouseY - clickYRef.current

        
        let ctx = canvasRef.current.getContext("2d")
        ctx.fillRect(mouseX, mouseY, rectWidth, rectHeight)
        console.log(mouseX, mouseY, rectWidth, rectHeight)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const handleButton = (x) => {
        if (x === 0) {
            //Set Color
        } else {
            //Set Color
        }
        setDraw(true)
        setIsDrawing(true)
    }

    return (
        <div className="wrapper">
            <div className="left">
                <div className="Labels">
                    <Title content={"Labels"} />
                    <button className="Title" onClick={() => handleButton(1)}>Title</button>
                    <button className="Author" onClick={() => handleButton(0)}>Author</button>
                </div>
                <div className="Boxes">
                    <Title content={"Boxes"} />
                </div>
            </div>
            <div className="right">
                {!pdfDocument && <span>Loading PDF Document...</span>}
                <canvas id="pdf_viewport" ref={canvasRef} onMouseDown={handleClick} onMouseMove={drawRect} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}></canvas>
                <div className="pages">
                    <button className="left" onClick={() => { setPageNumber((page) => { if (page > 1) { return page - 1 } else { return 1 } }) }}>&#60;</button>
                    <span>{pageNumber} of {numPages}</span>
                    <button>XD</button>
                    <button className="right" onClick={() => { setPageNumber((page) => { if (page < numPages) { return page + 1 } else { return numPages } }) }}>&#62;</button>
                </div>
            </div>
        </div>
    )
}

export default Viewer;