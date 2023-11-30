import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./style.scss";

function Wishlist() {
  const [data, setData] = useState([]);
  const [wishlist, setWishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((api) => setData(api));

  function handleAddWishlist(item) {
    let itemIndex = wishlist.findIndex((x) => x.id === item.id);

    if (itemIndex !== -1) {
      const newWishlist = [...wishlist];
      setWishlist(newWishlist);
    } else {
      setWishlist([...wishlist, { ...item }]);
    }
  }
  function handleRemove(id) {
    setWishlist(wishlist.filter((x) => x.id !== id));
  }

  return (
    <div className="home">
      <h2>Wishlist</h2>

      <div className="cards">
        {wishlist.map((item) => (
          <div className="card" key={item.id}>
            <img width={110} src={item.image} alt={item.name} />
            <button className="button" onClick={() => handleRemove(item.id)}>
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <p>{item.name}</p>
            <p>
              <span>$</span>
              {item.price}
            </p>
            <button>Add basket</button>
          </div>
        ))}
      </div>

      <hr />
      <h2>Products</h2>
      <div className="cards">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <button
              className={`button ${
                wishlist.some((x) => x.id === item.id) ? "active" : ""
              }`}
              onClick={() => handleAddWishlist(item)}
            >
              <i class="fa-solid fa-heart"></i>
            </button>
            <p>
              <span>$</span>
              {item.price}
            </p>
            <button>Add basket</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
