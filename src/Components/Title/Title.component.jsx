import { Fragment } from "react"
import "./Title.styles.css"

const Title = ({ content }) => {
    return (
        <Fragment>
            <h3 className="Title">
                {content}
            </h3>
            <hr />
        </Fragment>
    )
}

export default Title;