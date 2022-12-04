import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { Component } from "react";
import "./Style Sheets/order.css";
import data from "../Assets/data.json";

import locationIcon from "../Assets/icon/LOCATION.png";
import tick from "../Assets/icon/check.png"

export default function Order(props) {
  const [discount, setDiscount] = useState(data.discount);
  const pincodes = Object.entries(data.pincode);
  const amount = props.amount;
  const quantity = props.quantity;
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputData, setInputData] = useState({ pinCode: "" });
  const [isCOD,setIsCOD] = useState();
  const [deliveryPrice,setDeliveryPrice] = useState(0)
  const [minDays,setMinDays] = useState();
  const [maxDays,setMaxDays] = useState();
  const [isCorrectPincode,setIsCorrectPincode] = useState(false);
  const [printDeliveryPrice,setPrintDeliveryPrice] = useState("---");
  const [orderTotal,setOrderTotal]= useState()

  function getOrderTotal(){
    if(window.innerWidth <= 500){
      setOrderTotal("Grand Total")
    }
    else if(window.innerWidth <= 860){
      setOrderTotal("")
    }
    else{
      setOrderTotal("Order Total")
    }
  }

  function getDiscount() {
    if (amount >= parseInt(discount.minTotal)) {
      setDiscountAmount(
        (parseInt(discount.discountPercentage) * amount * -1) / 100
      );
    } else {
      setDiscountAmount(0);
    }
  }
  function getTotalAmount() {
    
      setTotalAmount(amount + discountAmount + deliveryPrice);
  }
  function handleChange(event) {
    setInputData(event.target.value);
  }
  
  function handleCheck() {
    let pincode = parseInt(inputData);
    if (pincode >= 100000 && pincode <= 999999) {
      for (let i = 0; i < pincodes.length; i++) {
        if (pincode === parseInt(pincodes[i][0])) {
              setIsCorrectPincode(true)
              setIsCOD(pincodes[i][1].cashOnDelivery)
              console.log("pincode is  matching");  
              setDeliveryPrice(pincodes[i][1].deliveryPrice)
              setMinDays(pincodes[i][1].estimatedDays.min)
              setMaxDays(pincodes[i][1].estimatedDays.max)
              if(pincodes[i][1].deliveryPrice === 0){
                setPrintDeliveryPrice("Free");
              }
              else{
                setPrintDeliveryPrice(pincodes[i][1].deliveryPrice)
              }

              return;
            
        } 
        else{
          setIsCorrectPincode(false)
          console.log("pincode does not match");
          setPrintDeliveryPrice("---")
          setDeliveryPrice(0)
          setMinDays(0)
          setMaxDays(0)
        }
      }
    } else {
      setIsCorrectPincode(false)
      console.log("pincode is not valid");
      setPrintDeliveryPrice("---")
      setDeliveryPrice(0)
      setMinDays(0)
      setMaxDays(0)
    }
  }
  useEffect(() => {
    getDiscount();
    getTotalAmount();
    getOrderTotal();
  });
  return (
    <div className="deliveryNorder">
      <div className="delivery">
        <h3 className  ="deliveryheading">Delivery Availability</h3>
        <div className="pincode">
          <div className="group">
            <img src={locationIcon} alt = "" />
            <input id = "input" type="number" name="pinCode" onChange={handleChange} onKeyPress = {(event)=>{
              if(event.key ==="Enter"){
                handleCheck();
              }
            }}></input>
          </div>
          <button className="checkBtn" onClick={handleCheck}>
            CHECK
          </button>
        </div>
        <div className="returnedElements" style={isCorrectPincode === false ? {display:"none"}:{}}>
          
          <div className="deliveryDetails">

            <div className="freeDelivery featuredetails" style={printDeliveryPrice !== "Free" ?{display:"none"}:{}}>
              <div className="checkimg"><img src={tick} alt = "check"/></div>
              {printDeliveryPrice === "Free" ? <p>Free<br/> delivery</p>:""}
            </div>
            
            <div className="cashOnDelivery featuredetails" style={!isCOD ? {display:"none"}:{}}>
              <div className="checkimg"><img src={tick} alt = "check"/></div>
              {isCOD ? <p>Cash on<br/> delivery</p> : ""}           
            </div>

            <div className="deliveryDays featuredetails">
              <div className="checkimg">{isCorrectPincode ? <img src={tick} alt = "check"/>:""}</div>
              {isCorrectPincode ? <p>Estimated delivery <br/> time is {minDays === maxDays ? minDays: `${minDays} - ${maxDays}`} days</p> :""}
            </div>
              
            
          </div>
        </div>
      </div>
      <div className="OrderSummary">
        <h3 className="deliveryheading">
          Order Summary{" "}
          <span>
            ( {quantity}
            {quantity === 1 ? " item" : " items"} )
          </span>
        </h3>
        <div className="summary">
          <h4>Subtotal</h4>
          <h4>{amount} $</h4>
        </div>
        <div className="summary">
          <h4>Total Discount</h4>
          <h4>{discountAmount} $</h4>
        </div>
        <div className="summary">
          <h4>Standard Shipping</h4>
          <h4>{printDeliveryPrice === "Free" ? printDeliveryPrice:printDeliveryPrice + "$"} </h4>
        </div>
        <div className="summary orderTotal">
          <h4>{orderTotal}</h4>
          <h2>{totalAmount} $</h2>
        </div>
        <div className ="summary buttons">
          <button className="continue"
          >CONTINUE SHOPPING</button>
          <button className={`checkout ${(quantity >0 && isCorrectPincode === true)? "":"inactive"}`}
            disabled={quantity > 0 && isCorrectPincode === true ? false : true}  
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
