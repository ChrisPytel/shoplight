// Client facing scripts here

const express = require('express');
const app = express();
const productsRouter = require('./routes/products-api');

app.use('/products', productsRouter);

$(document).ready(function() {
  $.get('/products', function(products) {
    renderProducts(products);
  });
});

function createProductListing(productData) {
  let $productListing = `
    <div class="product-container">
      <div class="product-image" style="background-image:url(${productData.photo_url})"></div>
      <div class="product-box">
        <div class="product-name">${productData.name}</div>
        <div class="product-price">${productData.price}</div>
        <div class="product-description">${productData.description}</div>
        <div class="product-icons">
          <div class="in-stock"><i class="fa-solid fa-circle-check"></i></div>
          <div class="message-seller">
            <a href="/messages">
              <i class="fa-regular fa-envelope"></i>
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
          <div class="add-favorite">
            <form action="/add-to-favorites" method="post">
              <button type="submit">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-heart"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  return $productListing;
}

function renderProducts(products) {
  products.forEach(productBox => {
    const $newProductListing = createProductListing(productBox);
    $('.product-listings-container').append($newProductListing);
  });
}
