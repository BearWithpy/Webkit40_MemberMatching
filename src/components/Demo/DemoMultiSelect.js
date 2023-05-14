import React, { useState } from "react"
import Select from "react-select"

const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "durian", label: "Durian" },
]
const techOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "durian", label: "Durian" },
]
const posOptions = [
    { value: "frontend", label: "Front-End" },
    { value: "backend", label: "Back-End" },
    { value: "android", label: "Android" },
    { value: "ios", label: "IOS" },
    { value: "pm", label: "PM" },
    { value: "devops", label: "DevOps" },
    { value: "designer", label: "Designer" },
]

const DemoMultiSelect = () => {
    const [selectedOptions, setSelectedOptions] = useState([])

    function handleChange(selectedOptions) {
        setSelectedOptions(selectedOptions)
    }

    return (
        <Select
            options={options}
            isMulti
            value={selectedOptions}
            onChange={handleChange}
        />
    )
}

export default DemoMultiSelect
