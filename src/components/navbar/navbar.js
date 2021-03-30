import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FavouriteCard from "../favouritecard/favouritecard";
import Card from "../card/card";
import { Link } from "react-router-dom"


const Customnavbar = (props) => {

    console.log("On est ici.")

    const handleFavourite = (value) => {
        console.log(value);
        props.handleFavouritebeers(value);
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Beers App</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/" onSelect={(_, e) => {e.preventDefault(); handleFavourite(false)}}>Home</Nav.Link>
              <Nav.Link href="/favourites" onSelect={(_, e) => {e.preventDefault(); handleFavourite(true)}}>My favourite beers</Nav.Link>
            </Nav>
            </Navbar>
        </>
    )
}

export default Customnavbar;


