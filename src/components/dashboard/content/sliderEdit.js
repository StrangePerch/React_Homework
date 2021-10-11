import Container from "@mui/material/Container";
import * as React from "react";
import ItemList from '../itemList/ItemList'
import SlideItem from "../itemList/Slide/SlideItem";
import SlideForm from "../itemList/Slide/SlideForm";
export default function SliderEdit() {
    return (<Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <ItemList api={"/api/slides/"} item={SlideItem} form={SlideForm} ignore={"__v"}/>
    </Container>)
}