import React from "react";
import {NavLink} from 'react-router-dom'
function Navbar() {
    return (
        <nav>
            <NavLink exact to="/" activeClassName="active">Subscription List</NavLink>{" | "}
            <NavLink to="/add-subscription" activeClassName="active">Add Subscription</NavLink>
        </nav>
    )
}
export default Navbar