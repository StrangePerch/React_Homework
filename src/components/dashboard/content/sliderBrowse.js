import Container from "@mui/material/Container";
import * as React from "react";
import Slider from "../slider/slider";

export default function SliderBrowse() {
    return (<Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Slider/>
    </Container>)
}