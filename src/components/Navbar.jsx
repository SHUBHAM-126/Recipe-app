import styled from "styled-components"
import { Link } from 'react-router-dom';
import Search from "./Search";

function Navbar() {
    return (
        <div className="nav-container">
            <NavBar>
                <Link className="logo" to="/">Home</Link>
                <Search />
            </NavBar>
        </div>
    )
}

const NavBar = styled.div`{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:2rem;
    width:90%;
    max-width:1280px;
    padding:1rem;
    margin:auto;

    .logo{
        font-size:34px;
        text-decoration:none;
        color:#000;
    }
}`;

export default Navbar