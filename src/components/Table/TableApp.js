import React from "react"
import DemoTable from "./DemoTable"
import ApplyTable from "./ApplyTable"
import JoinTable from "./JoinTable"

const TableApp = () => {
    const columns = ["제목", "카테고리", "가격"]
    const columnsApply = ["제목", "지원 날짜"]
    const columnsJoin = ["제목", "승인 날짜"]

    return (
        <>
            {/* <DemoTable columns={columns} /> */}
            <ApplyTable columnsApply={columnsApply} />
            <JoinTable columnsJoin={columnsJoin} />
        </>
    )
}

export default TableApp
