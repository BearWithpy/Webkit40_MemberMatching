import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./DemoTable.css"
import axios from "axios"

const ApplyTable = ({ columnsApply }) => {
    const [resultApply, setResultApply] = useState([])

    useEffect(() => {
        axios
            .get(
                `http://localhost:7777/project/applytable?id=${localStorage.getItem(
                    "ID"
                )}`
            )
            .then((response) => {
                // console.log(response)
                setResultApply(response.data)
            })
            .catch((error) => {
                console.error(error)
                return
            })
    }, [])

    return (
        <>
            {/* <label>승인 대기 중인 프로젝트</label> */}

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

export default ApplyTable
