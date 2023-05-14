import {
    Box,
    FormControl,
    IconButton,
    NativeSelect,
    TextField,
} from "@mui/material"
import React from "react"
import SearchIcon from "@mui/icons-material/Search"

function DemoSearchBar({ onSearch }) {
    const handleSearch = (e) => {
        e.preventDefault()
        const searchQuery = e.target.search.value
        const searchCategory = e.target.category.value

        if (!(searchCategory === "title" || searchCategory === "writer")) {
            alert("범위를 정해주세영!")
            return
        }

        onSearch(searchQuery, searchCategory)
        // window.location.reload()
    }
    return (
        <div>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "20ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSearch}
            >
                {" "}
                <FormControl sx={{ m: 1, minWidth: 50 }}>
                    <NativeSelect
                        defaultValue={"none"}
                        inputProps={{
                            name: "category",
                            id: "uncontrolled-native",
                        }}
                    >
                        <option value={"none"}>범위</option>
                        <option value={"title"}>제목</option>
                        <option value={"writer"}>작성자</option>
                    </NativeSelect>
                </FormControl>
                <TextField
                    id="standard-search"
                    type="search"
                    variant="standard"
                    name="search"
                />
                <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Box>
        </div>
    )
}

export default DemoSearchBar
