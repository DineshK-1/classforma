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
    const overlayRef = useRef(null);
    const drawRef = useRef(null);

    const initOverlays = () => {
        overlayRef.current.width = canvasRef.current.width
        overlayRef.current.height = canvasRef.current.height
        drawRef.current.width = canvasRef.current.width
        drawRef.current.height = canvasRef.current.height
    }

    const { pdfDocument, pdfPage } = usePdf({
        file: location.state.PDFLink,
        page: pageNumber,
        canvasRef,
        onPageRenderSuccess: initOverlays,
    });

    const docXRef = useRef()
    const docYRef = useRef()
    const clickXRef = useRef()
    const clickYRef = useRef()
    const widthRef = useRef()
    const heightRef = useRef()

    useEffect(() => {
        if (pdfDocument) {
            setNumPages(pdfDocument.numPages)
        }
    }, [pdfDocument])

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isDrawing) {
            const rect = canvasRef.current.getBoundingClientRect()
            docXRef.current = rect.top
            docYRef.current = rect.left

            clickXRef.current = e.clientX - docYRef.current
            clickYRef.current = e.clientY - docXRef.current

            setIsDrawing(true)
        }
    }

    const drawRect = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isDrawing) {
            console.log("o")
            return
        }

        const mouseX = e.clientX - docYRef.current
        const mouseY = e.clientY - docXRef.current

        widthRef.current = mouseX - clickXRef.current
        heightRef.current = mouseY - clickYRef.current



        let ctx = drawRef.current.getContext("2d")
        ctx.clearRect(0, 0, drawRef.current.width, drawRef.current.height)
        ctx.fillRect(clickXRef.current, clickYRef.current, widthRef.current, heightRef.current)
    }

    const stopDrawing = () => {
        if (isDrawing) {
            //Save Data
            setIsDrawing(false)
        }

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
                    {draw && <span>Is Drawing</span>}
                    <button className="Title" onClick={() => handleButton(1)}>Title</button>
                    <button className="Author" onClick={() => handleButton(0)}>Author</button>
                    {isDrawing && <span>Is Drawing...</span>}
                </div>
                <div className="Boxes">
                    <Title content={"Boxes"} />
                </div>
            </div>
            <div className="right">
                {!pdfDocument && <span>Loading PDF Document...</span>}
                <div className="viewport">
                    <canvas id="pdf_viewport" ref={canvasRef}></canvas>
                    <canvas id="overlay" ref={overlayRef}></canvas>
                    <canvas id="draw" ref={drawRef} onMouseDown={handleClick} onMouseMove={drawRect} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}></canvas>
                    <div className="pages">
                        <button className="left" onClick={() => { setPageNumber((page) => { if (page > 1) { return page - 1 } else { return 1 } }) }}>&#60;</button>
                        <span>{pageNumber} of {numPages}</span>
                        <button>XD</button>
                        <button className="right" onClick={() => { setPageNumber((page) => { if (page < numPages) { return page + 1 } else { return numPages } }) }}>&#62;</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewer;