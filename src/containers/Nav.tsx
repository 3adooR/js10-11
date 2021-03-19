import React from 'react'
import {NavLink} from "react-router-dom";
import {nav, ul, li, link, linkActive} from "../styles";

export const Navigation = () => (<>
    <nav style={nav}>
        <ul style={ul}>
            <li style={li}>
                <NavLink exact to="/" style={link} activeStyle={linkActive}>Home</NavLink>
            </li>
            <li style={li}>
                <NavLink to="/cities" style={link} activeStyle={linkActive}>Change city</NavLink>
            </li>
        </ul>
    </nav>
</>);