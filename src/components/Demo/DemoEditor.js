import React, { useState } from "react"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const DemoEditor = ({ onStateChange }) => {
    const [content, setContent] = useState("")

    const handleChildStateChange = (value) => {
        setContent(value)
        onStateChange(value)
    }

    return <ReactQuill value={content} onChange={handleChildStateChange} />
}

export default DemoEditor
