import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Style Sheets/card.css";

import incrementImage from "../Assets/icon/plus.png";
import decrementImage from "../Assets/icon/minus.png";
import decrementActive from "../Assets/icon/minus-active.png";
import deleteImage from "../Assets/icon/DELETE.png";

import image1 from "../Assets/Images/Earphone.png";
import image2 from "../Assets/Images/phone.png";
import image3 from "../Assets/Images/stick.png";

export default function Card(props) {
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const images = [image1, image2, image3];
  const [isImage, setIsImage] = useState(true);
  const numberOfImages = images.length;

  const [setImages, changeSetImages] = useState([]);

  function setImage() {
    if (isImage) {
      setIsImage(false);
      let arr = [];
      arr.push(images[Math.floor(Math.random() * numberOfImages)]);
      arr.push(images[Math.floor(Math.random() * numberOfImages)]);
      changeSetImages(arr);
    }
  }

  const cashback = props.tagline ? parseInt(props.tagline) : 0;
  useEffect(() => {
    props.getAmount();
    props.getItems();
    setImage();
  });
  function increment() {
    setQuantity((prev) => {
      return prev + 1;
    });
    setSubTotal(parseInt(props.price) * (quantity + 1) - cashback);
  }
  function decrement() {
    setQuantity((prev) => {
      return prev - 1;
    });
    setSubTotal(parseInt(props.price) * (quantity - 1));
  }

  function handleDelete() {
    props.handleDelete(props.id);
    setSubTotal(0);
    setQuantity(0);
  }

  function Gift() {
    if (props.gift && quantity > 0) {
      return (
        <div className="gift">
          <div className="product">
            <div className="image">
              <img src={setImages[0]}  alt = ""/>
            </div>

            <div className="name giftName">
              <h4
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                }}
              >
                GIFT
              </h4>
              <div className="name">
              <h3>{props.gift.name}</h3>
              <p>{props.gift.desc}</p>
              </div>
            </div>
          </div>

          <div className="price">
            <p>{props.gift.price} $ </p>
          </div>

          <div className="quantity">
            <p>1</p>
          </div>
          <div className="subTotal" style={{ visibility: "hidden" }}>
            <p>{subTotal}</p>
            <button
              style={{ marginLeft: "20px" }}
              className="deleteBtn btn"
              onClick={handleDelete}
            >
              <img src={deleteImage} alt="" />
            </button>
          </div>
        </div>
      );
    }
  }
  function CashBack() {
    if (props.tagline) {
      return (
        <div className="cashBack">
          <h4>{props.tagline}</h4>
        </div>
      );
    }
    console.log(props.tagline);
  }
  function Plans() {
    if (props.plan) {
      return (
        <a
          href={props.plan}
          style={{
            textDecoration: "none",
            color: "midnightblue",
            fontWeight: "700",
          }}
        >
          {" "}
          View Plan{" "}
        </a>
      );
    }
  }
  return (
    <div className="cardNgift">
      <div className="card" id={props.id}>
        <div className="product">

          <div className="image">
            <img src={setImages[1]} alt="" />
          </div>

          <div className="nameNcashBack">
            <CashBack />
            <div className="name">
              <h3>{props.name}</h3>
              <p>
                {props.desc} <Plans />
              </p>
            </div>
          </div>
          
        </div>

        <div className="price">
          <p>{props.price} $ </p>
        </div>

        <div className="quantity">
          <button className="increment btn" onClick={increment}>
            <img src={incrementImage} alt = "" />
          </button>
          <p className="itemNumbers">{quantity}</p>
          <button
            className="decrement btn"
            onClick={decrement}
            disabled={quantity > 0 ? false : true}
          >
            <img src={quantity > 0 ? decrementActive : decrementImage} alt = "" />
          </button>
        </div>

        <div className="subTotal">
          <p className="CardPrice">{subTotal}</p>
          <button
            style={{ marginLeft: "20px" }}
            className="deleteBtn btn"
            onClick={handleDelete}
          >
            <img src={deleteImage} alt = ""/>
          </button>
        </div>
      </div>

      <Gift />
    </div>
  );
}
