import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./DemoTable.css"
import axios from "axios"

const JoinTable = ({ columnsJoin }) => {
    const [resultJoin, setResultJoin] = useState([])

    useEffect(() => {
        axios
            .get(
                `http://localhost:7777/project/jointable?id=${localStorage.getItem(
                    "ID"
                )}`
            )
            .then((response) => {
                console.log(response)
                setResultJoin(response.data)
            })
            .catch((error) => {
                console.error(error)
                return
            })

        axios
            .get(
                `http://localhost:7777/project/jointable?id=${localStorage.getItem(
                    "ID"
                )}`
            )
            .then((response) => {
                console.log(response)
                setResultJoin(response.data)
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
                        {columnsJoin.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resultJoin.map((column, i) => (
                        <tr key={i}>
                            <td className="title">
                                <Link to={`/detail?id=${column.projectid}`}>
                                    {column.projectname}
                                </Link>
                            </td>
                            <td>{column.joindate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default JoinTable
