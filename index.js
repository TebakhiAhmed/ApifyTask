// Task Requirements

// 1_Fetch data from JSON API  https://api.ecommerce.com/products
// 2_ overcome the 1000 products limitaions.
// 3_ use Min and Max prices 
// 4_ declare products array.
// 5_API result(total to give me how many products in the specific range of price) (count means how many were returned on this API call (max is 1000))
// 6_ the count must be max 1000 

//declare a variable contain API url
const API_url = "https://api.ecommerce.com/products";

//Prices range is from 0-100000
const minPrice = 0;
const maxPrice = 100000;
const products = [];

// We need to modify the min and max price in case we dont have enough element  or extra product (1000)
//for that we need to declare count.
const countNarrowPrice = 1000;

// Define an async function to make a GET request with the price range parameters
async function getProducts(minPrice, maxPrice) {
    // add the maxPrice and minPrice parameters to the URL query 
    let url = API_url + `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  // Define an async function to loop through the price range and get all products
async function loopProducts() {
    // declare a boolean flag to tell the algorithm if there are more product to add or not
    let addMoreProducts = true;
    while (addMoreProducts) {
      // Get the products for the current price range
      let result = await getProducts(minPrice, maxPrice);
      // Check the total number of products from the total method that provided from API
      // Check the number of products from the count method that provided from API
      let total = result.total;
      let count = result.count;
      // Append the products array to the products array
      products.push(...result.products);
      if (total <= count) {
        //stop adding more products in case the total less or equals 1000 products(count)
        addMoreProducts = false;
      } else {
        // Otherwise, modify the minPrice and maxPrice by adding the countNarrowPrice to minPrice and Sub it from MaxPrice
        minPrice += countNarrowPrice;
        maxPrice -= countNarrowPrice;
      }
    }
    return products;
  }

  loopProducts().then((products) => console.log(products));

