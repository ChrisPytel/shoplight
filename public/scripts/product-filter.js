document.getElementById('sort-dropdown').addEventListener('change', function() {
  const sortBy = this.value;
  const productContainer = document.querySelector('.product-listings-container');
  const productItems = productContainer.querySelectorAll('.product-container');

  const sortedListings = Array.from(productItems).sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
    const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
    if (sortBy === 'low-to-high') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  // clear existing listings and append sorted listings
  productContainer.innerHTML = '';
  sortedListings.forEach(listing => productContainer.appendChild(listing));
});
