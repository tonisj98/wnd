import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export async function fetchProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    const products = response.data.products;

 
    const bestSellerPositions = [6, 13, 18, 25];
    const productsWithBestSeller = products.map((product, index) => ({
      ...product,
      bestSeller: bestSellerPositions.includes(index + 1),
    }));

    return productsWithBestSeller;
  } catch (error) {
    throw error;
  }
}


export async function fetchUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
  } catch (error) {
    throw error;
  }
}
export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
