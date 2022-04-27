import React, { useState } from "react";

export default function CreateProduct() {
  const [imageSrc, setImageSrc] = useState("/icons/add-pro.svg");
  return (
    <div className="create-product">
      <img src="/icons/r-logo.svg" alt="" />
      <div className="create-product-section">
        <h1>Create Product</h1>

        <div className="create-product-flex">
          <img src={imageSrc} alt="" />

          <div className="create-product-flex-right">
            <h2 className="label">Name</h2>
            <input type="text" />
            <h2 className="label">Category</h2>
            <input type="text" />
            <h2 className="label">Price</h2>
            <input type="text" />

            <button className=""></button>
          </div>
        </div>
      </div>
    </div>
  );
}
