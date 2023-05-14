import { Col, Row } from "reactstrap"

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear()
        return year
    }

    return (
        <div className="Footer">
            <hr />
            <br />

            <div>
                <Row>
                    <Col>
                        <p>
                            Copyright &copy;{" "}
                            <span>
                                {thisYear()} JSS Inc. All Rights Reserved
                            </span>
                        </p>
                    </Col>
                </Row>
            </div>
            <footer></footer>
        </div>
    )
}

export default Footer
