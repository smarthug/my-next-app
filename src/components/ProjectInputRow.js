import { Box, Divider, Grid, Typography } from "@mui/material";

export default function ProjectInputRow(props) {


    return (
        <Box sx={{ width: '100%', marginTop: "56px" }}>


            <Grid container spacing={2} alignItems="center" sx={{marginBottom:"14px"}}>
                <Grid item xs={5}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {props.label}
                    </Typography>

                    <Typography variant="subtitle1" component="div" gutterBottom>
                        {props.description}
                    </Typography>

                </Grid>
                <Grid item xs={7}>
                    {props.children}
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: "48px" }} />
        </Box>
    )

}