import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import "./Style Sheets/CardPage.css"
import data from "../Assets/data.json"
import Order from "./Order";

export default function CartPage(){
    
    const[products,setProducts] = useState(data.products);
    const[amount,setAmount] = useState();
    const [qty,setQty] = useState();
    

    function handleDelete(id){
        setProducts(products.filter(element=>{return element.id !== id}))
    }
    function emptyCart(){
        if(products.length === 0){
            setAmount(0)
            setQty(0)
        }
    }
    useEffect(()=>{
        emptyCart();

    },[amount,qty]);
    
    function getAmount(){
        const subtotals = document.querySelectorAll(".CardPrice");
        let sum = 0;
        for(let i = 0;i<subtotals.length;i++){
            sum += parseInt(subtotals[i].textContent)
        }
        setAmount(sum)
    }
    function getItems(){
        const arr = document.querySelectorAll(".itemNumbers");
        let count = 0;
        for(let i = 0;i<arr.length;i++){
            count += parseInt(arr[i].textContent);
        }
        setQty(count)
    }
    let cards = products.map(product=>{
        return <Card
    
        key = {product.id}
        id = {product.id}
        name = {product.name}
        price = {product.price}
        desc = {product.desc}
        handleDelete = {handleDelete}
        gift = {product.gift ? product.gift:""}
        tagline = {product.tagline}
        plan = {product.planLink}
        getAmount = {getAmount}
        getItems = {getItems}

        />
    })
    return(
        <div className="cardPage">
            <div className="discountPane">
                <h4>Shop for $5000 and more and get 10% discount on your order</h4>
            </div>
            <div className="cardTitle">
                <h2>Shopping cart</h2>
            </div>
            <div className="cardListHeading details">
                <ul>
                    <li className="productName">Product</li>
                    <li className="price">Price</li>
                    <li className="quantity">Quantity</li>
                    <li className="subTotal">Subtotal</li>
                </ul>
                <div className="listItems">
                   {cards}
                </div>
                <div className="DeliveryNorder">
                    <Order 
                    amount = {amount}
                    quantity = {qty}
                    
                    />
                </div>
            </div>
           

        </div>
    )
}