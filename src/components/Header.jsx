import React from "react";
import "./Style Sheets/Header.css"

import search from "../Assets/icon/search.png"
import user from "../Assets/icon/user.png"
import cart from "../Assets/icon/shopping.png"
import logo from "../Assets/Images/logo.png"

export default function Header(){
    return(
        <div parent>
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt = ""/>
                </div>
                <div className="navItems">
                    <a href="#" className="trackOrder">Track Order</a><span className="trackOrder" style={{paddingLeft:"10px"}}>|</span>
                    <div className="searchBar items">
                        <img src={search} alt = ""/><span>|</span>
                    </div>
                    <div className="user items" >
                        <img src={user} alt = ""/><span>|</span>
                    </div>
                    <div className="cart items">
                        <img src={cart} alt = ""/>
                    </div>
                </div>
            </div>
            <div className="oderStatus"></div>
        </div>
    )
}