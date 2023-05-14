import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material"

import { useEffect, useState } from "react"
import styles from "./qnaboard.module.css"
import axios from "axios"
import { Link } from "react-router-dom"

const QnABoard = ({ searchQuery }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [qna, setQna] = useState([])

    useEffect(() => {
        console.log(searchQuery.category)
        console.log(searchQuery.query)
        axios
            .get(
                `http://localhost:7777/qna?category=${searchQuery.category}&query=${searchQuery.query}`
            )
            .then((response) => {
                setQna(response.data.data.reverse())
            })
            .catch((error) => {
                console.error(error)
                alert(error)
                return
            })
    }, [searchQuery])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <TableContainer
            component={Paper}
            className={styles.tableContainer}
            style={{ justifyContent: "center", width: "105%" }}
        >
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ width: "15%" }}>
                            순번
                        </TableCell>
                        <TableCell align="center" style={{ width: "55%" }}>
                            제목
                        </TableCell>
                        <TableCell align="center" style={{ width: "15%" }}>
                            작성자
                        </TableCell>
                        <TableCell align="center" style={{ width: "15%" }}>
                            등록일
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? qna.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : qna
                    ).map((row, i) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">
                                {qna.length - i}
                            </TableCell>
                            <TableCell>
                                <Link to={`/qnadetail?id=${row.id}`}>
                                    {row.title}
                                </Link>
                            </TableCell>
                            <TableCell align="center">{row.writer}</TableCell>
                            <TableCell align="center">
                                {row.createdate.substring(0, 10)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[8]}
                component="div"
                count={qna.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}

export default QnABoard
