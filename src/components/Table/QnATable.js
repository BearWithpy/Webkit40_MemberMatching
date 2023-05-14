import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const QnATable = ({ columnsApply }) => {
    const [resultApply, setResultApply] = useState([])

    useEffect(() => {
        axios
            .get(
                `http://localhost:7777/project/applytable?id=${localStorage.getItem(
                    "ID"
                )}`
            )
            .then((response) => {
                console.log(response)
                setResultApply(response.data)
            })
            .catch((error) => {
                console.error(error)
                return
            })
    }, [])

    return (
        <>
            <table className="styled-table">
                <thead>
                    <tr>
                        {columnsApply.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resultApply.map((column, i) => (
                        <tr key={i}>
                            <td className="title">
                                <Link to={`/detail?id=${column.projectid}`}>
                                    {column.title}
                                </Link>
                            </td>
                            <td>{column.applydate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default QnATable
