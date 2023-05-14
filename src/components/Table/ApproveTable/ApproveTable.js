import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastStyleContainer } from "./styleToast"

const ApproveTable = ({
    applicantInfo,
    setApplicantInfo,
    columnsApply,
    applicant,
    headcount,
}) => {
    const handleChecked = (item) => {
        if (applicantInfo.includes(item.memberid)) {
            // console.log("memberid already exists")
            // console.log(applicantInfo)

            const popApplicant = applicantInfo.filter(
                (i) => i !== item.memberid
            )
            setApplicantInfo(popApplicant)
            return
        }
        const newApplicantInfo = [...applicantInfo, item.memberid]

        if (applicantInfo.length === headcount) {
            alert("모집 인원보다 많은 인원을 모집할 수 없습니다!!")
            return
        }

        setApplicantInfo(newApplicantInfo)
    }

    const testToast = (item) => {
        axios
            .get("/auth/origintoast", {
                params: {
                    id: item.memberid,
                },
            })
            .then((res) => {
                console.log(res)
                toast.success(
                    <div>
                        <label>지원자 정보</label>
                        <h1 style={{ textAlign: "center" }}>
                            {item.membername}
                        </h1>
                        <br />
                        {/* {item.memberid} */}
                        <h2 style={{ textAlign: "left" }}>역할:</h2>{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {res.data.data[0].position}
                        <br />
                        <h2 style={{ textAlign: "left" }}>기술 stack:</h2>{" "}
                        {res.data.data[0].tech.split(",").map((item, i) => (
                            <p key={i}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {item}
                            </p>
                        ))}
                        <br />
                    </div>,
                    {
                        position: "top-left",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
            })
    }

    return (
        <>
            <table className="styled-table">
                <thead>
                    <tr>
                        {columnsApply.map((column) => (
                            <th key={column} style={{ textAlign: "center" }}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {applicant.map((item, i) => (
                        <tr key={item.id} style={{ textAlign: "center" }}>
                            <td className="checkbox">
                                <Link>{applicant.length - i}</Link>
                            </td>
                            <td
                                className="name"
                                onClick={() => testToast(item)}
                            >
                                {item.membername}
                                {/* <ToastContainer /> */}
                                <ToastStyleContainer />
                            </td>
                            <td>{item.applydate}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    disabled={
                                        applicantInfo.length >= headcount + 1
                                    }
                                    checked={applicantInfo.includes(
                                        item.memberid
                                    )}
                                    onChange={() => handleChecked(item)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ApproveTable
