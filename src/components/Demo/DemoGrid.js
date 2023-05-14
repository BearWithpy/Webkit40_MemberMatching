import React from "react"
import "./Grid.css"
import { Box, Grid } from "@mui/material"

function DemoGrid() {
    return (
        // <div className="grid-container">
        //     <a href="#">Link 1</a>
        //     <a href="#">Link 2</a>
        //     <a href="#">Link 3</a>
        //     <a href="#">Link 4</a>
        //     <a href="#">Link 5</a>
        //     <a href="#">Link 6</a>
        // </div>

        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box bgcolor="primary.main" color="info.contrastText" p={2}>
                        1
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box bgcolor="warning.main" color="info.contrastText" p={2}>
                        2
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box bgcolor="warning.main" color="info.contrastText" p={2}>
                        3
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} maxWidth={50}>
                    <Box
                        bgcolor="error.main"
                        maxWidth={500}
                        maxHeight={500}
                        color="info.contrastText"
                        p={2}
                    >
                        4
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} maxWidth={50}>
                    <Box bgcolor="error.main" color="info.contrastText" p={2}>
                        5
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} maxWidth={50}>
                    <Box bgcolor="error.main" color="info.contrastText" p={2}>
                        6
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} maxWidth={50}>
                    <Box bgcolor="error.main" color="info.contrastText" p={2}>
                        7
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default DemoGrid
