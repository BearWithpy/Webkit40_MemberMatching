import { TextField } from "@mui/material"

import React, { useEffect, useState } from "react"

const DemoDatepicker = ({ onStateChange }) => {
    const dateNow = new Date()
    const today = dateNow.toISOString().slice(0, 10)
    const [startDate, setStartDate] = useState(today)
    useEffect(() => {
        onStateChange(startDate)
    }, [])

    const handleChildStateChange = (event) => {
        const newState = event.target.value
        setStartDate(newState)
        onStateChange(newState)
    }

    return (
        <TextField
            fullWidth
            id="date"
            // label="시작일"
            type="date"
            defaultValue={today}
            // onChange={(e) => {
            //     setSaleStartDate(e.target.value)
            //     // console.log(e.target.value)
            //     // console.log(typeof e.target.value)
            // }}
            onChange={handleChildStateChange}
            inputProps={{ min: today }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}
export default DemoDatepicker
