import { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <h3>Documents</h3>
            <hr />
            <ul>
                <Link to=""><li>Sample Document 1.pdf</li></Link>
                <Link to=""><li>Sample Document 2.pdf</li></Link>
                <Link to=""><li>Sample Document 3.pdf</li></Link>
            </ul>
        </Fragment>
    )
}
export default Home;