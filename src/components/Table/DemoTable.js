import React from "react"

import { Link } from "react-router-dom"

const DemoTable = ({ columns, result }) => {
    return (
        <>
            <table className="styled-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr key="21k3ljb12">
                        <td className="title">
                            <Link to={`/`}>"Hello World"</Link>
                        </td>
                        <td>category</td>
                        <td>200000원</td>
                    </tr>
                    {/* {result &&
                        result.map(({ title, category, price, bookid }) => (
                            <tr key={title + category + price}>
                                <td className="title">
                                    <Link to={`/detail/${bookid}`}>
                                        {title}
                                    </Link>
                                </td>
                                <td>{category}</td>
                                <td>{price}원</td>
                            </tr>
                        ))} */}
                </tbody>
            </table>
        </>
    )
}

export default DemoTable
