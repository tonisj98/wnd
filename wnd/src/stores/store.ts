import { defineStore } from "pinia";
import { fetchProducts } from "../services/apiServices.ts";

export const useProductStore = defineStore("product", {
  state: () => ({
    clickCount: 0,
    products: [],
    productsGot: [],
    productsFetchedInit: false,
    favouriteProducts: [],
  }),
  actions: {
    incrementClickCount() {
      this.clickCount++;
    },
    addProductToCart(product) {
      const existingProduct = this.products.find(
        (p) => p.title === product.title
      );

      if (existingProduct) {
        existingProduct.Quantity += 1;
      } else {
        const productWithQuantity = {
          ...product,
          Quantity: 1,
        };
        this.products.push(productWithQuantity);
      }

    },
    getCartProducts() {
      return this.products;
    },
    removeProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },
    async getProducts() {

      if (this.productsFetchedInit == false) {
        try {
          const products = await fetchProducts();
          this.productsGot = products;
          this.productsGot.forEach((product) => {
            product.favourites = false;
          });
          this.productsFetchedInit = true;
        } catch (error) {
        }
      } else {
        this.products.forEach((product) => {
          const matchingProduct = this.productsGot.find(
            (p) => p.id === product.id
          );
          if (matchingProduct) {
            Object.assign(product, matchingProduct);
          }
        });
      }
    },

    resetProducts() {
      this.products = [];
    },
    addProductToFavourites(product) {
      const existingFavourite = this.favouriteProducts.find(
        (p) => p.id === product.id
      );

      if (!existingFavourite) {
        product.favourites = true;
        this.favouriteProducts.push(product);
      }
    },
    deleteFromFavourites(product){
      const index = this.favouriteProducts.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        this.favouriteProducts.splice(index, 1);
    
        const productInGot = this.productsGot.find((p) => p.id === product.id);
        if (productInGot) {
          productInGot.favourites = false;
        }
      }

    }
  },
});
