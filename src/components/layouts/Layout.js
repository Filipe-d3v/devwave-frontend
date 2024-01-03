import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { Container } from "./layout.styled";

export default function Layout() {
    return (
        <>
            <Nav />
            <Container>
                <Outlet />
            </Container>
        </>
    )
};