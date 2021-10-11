import Container from "@mui/material/Container";
import * as React from "react";
import ItemList from '../itemList/ItemList'
import PortfolioItem from "../itemList/Portfolio/PortfolioItem";
import PortfolioForm from "../itemList/Portfolio/PortfolioForm";
export default function PortfolioEdit() {
    return (<Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <ItemList api={"/api/portfolio/"} item={PortfolioItem} form={PortfolioForm} ignore={"__v"}/>
    </Container>)
}