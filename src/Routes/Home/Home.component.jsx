import { Fragment } from "react";
import { Link } from "react-router-dom";
import Title from "../../Components/Title/Title.component";
import "./Home.styles.css"

const Home = () => {
    return (
        <Fragment>
            <Title content={"Documents"}/>
            <ul>
                <Link to="/PDFViewer" state={{PDFLink:"https://arxiv.org/pdf/2212.08011.pdf"}}><li>Sample Document 1.pdf</li></Link>
                <Link to="/PDFViewer" state={{PDFLink:"https://arxiv.org/pdf/2212.07937.pdf"}}><li>Sample Document 2.pdf</li></Link>
                <Link to="/PDFViewer" state={{PDFLink:"https://arxiv.org/pdf/2212.07931.pdf"}}><li>Sample Document 3.pdf</li></Link>
            </ul>
        </Fragment>
    )
}
export default Home;