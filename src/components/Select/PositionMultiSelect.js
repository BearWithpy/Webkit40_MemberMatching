import React, { useState } from "react"
import Select from "react-select"

const posOptions = [
    { value: "frontend", label: "Front-End" },
    { value: "backend", label: "Back-End" },
    { value: "android", label: "Android" },
    { value: "ios", label: "IOS" },
    { value: "pm", label: "PM" },
    { value: "devops", label: "DevOps" },
    { value: "designer", label: "Designer" },
]

const PositionMultiSelect = ({ onStateChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(null)

    function handleChange(selected) {
        setSelectedOptions(selected)

        if (selected) {
            const posvalue = selected
                .map((obj) => obj.value)
                .filter((value) => value !== undefined)

            onStateChange(posvalue.join(","))
        } else {
            onStateChange("")
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            height: "60px",
        }),
    }

    return (
        <Select
            options={posOptions}
            isMulti
            styles={customStyles}
            value={selectedOptions}
            onChange={handleChange}
        />
    )
}

export default PositionMultiSelect
