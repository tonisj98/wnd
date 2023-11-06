<template>
  <div v-if="isProductLoaded">
    <div class="button-container">
      <button
        @click="goBack"
        class="text-red-700 border-red-700 border-2 bg-white font-bold text-4xl mt-10 md:mt-10 mb-6 md:mx-40 relative headerText pr-4"
      >
        <i class="text-3xl pi pi-angle-left"></i> {{ $t("back") }}</button
      ><span
        v-if="product.bestSeller"
        class="relative text-2xl ml-60 top-0 right-0 bg-red-500 text-white px-20 py-1 font-semibold"
      >
        Best Sellers
      </span>
      <span class="underline-long"></span>
    </div>
    <div class="separation"></div>
  </div>
  <div class="flex flex-col md:flex-row mt-20">

    <div class="md:w-1/2 p-4">
      <div class="mb-4 relative">
        <img
          :src="product.images[0]"
          alt="Imagen del producto"
          class="w-full h-60 object-contain rounded"
        />
      </div>

      <div class="flex justify-center items-center">
        <div class="p-2">
          <img
            :src="product.images[1]"
            :alt="product.title"
            class="w-40 h-40 object-cover rounded-lg"
          />
        </div>
        <div class="p-2">
          <img
            :src="product.images[2]"
            :alt="product.title"
            class="w-40 h-40 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
   
    <div class="w-full md:w-1/2 p-4">
  
      <div class="flex flex-col">
        <div class="flex justify-start items-center mb-2">
          <div class="text-2xl font-semibold text-black">
            {{ product.title }}
          </div>
          <div class="flex items-center ml-10">
          <div >
            <i @click="isFavourite()" v-if="!product.favourites" class="pi pi-star text-red-700"></i>
             <i @click="isNotFavourite()" v-if="product.favourites" class="pi pi-star-fill text-red-700"></i>
             </div>
            <button
              class="px-4 py-2 bg-red-700 text-white ml-2"
              @click="handleBuyClick"
            >
              {{ $t("addToCart") }}
            </button>
          </div>
        </div>
        <div class="flex flex-wrap">
          <p
            v-if="product.bestSeller"
            class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 mr-2 text-xs"
          >
            #bestseller
          </p>
          <p
            class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 text-xs"
          >
            #{{ product.category }}
          </p>
        </div>
        <div class="text-lg font-semibold mt-4">{{ $t("description") }}</div>
        <p class="text-gray-600">{{ product.description }}</p>
        <div class="flex md:flex-row flex-col">
          <div class="md:w-1/2 w-full">
            <div class="text-lg font-semibold mr-4 mt-4">{{ $t("price") }}</div>
            <p class="text-gray-600 mt-4">${{ product.price }}</p>
          </div>
          <div class="md:w-1/2 w-full">
            <div class="text-lg font-semibold mt-4">{{ $t("stock") }}</div>
            <p class="text-gray-600 mt-4">
              {{ product.stock }} {{ $t("availables") }}
            </p>
          </div>
        </div>
        <div class="text-lg font-semibold mt-4">{{ $t("seller") }}:</div>
        <div class="flex md:flex-row flex-col items-center">
          <img
            :src="seller.image"
            alt="Imagen del producto"
            class="w-20 h-20 object-contain rounded"
          />
          <p class="text-gray-600 mt-4 md:w-20 w-full">
            {{ seller.company.name }}
          </p>
          <div class="mt-4 flex items-center">
            <svg
              class="w-4 h-4 text-red-700 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {{ product.rating }}
            </p>
          </div>
        </div>
      </div>
    </div>
   
  </div>
  <Toast class="toast-red" position="bottom-right" />
</template>

<script>
import { defineComponent } from "vue";
import { useProductStore } from "../stores/store.ts";
import { useToast } from "primevue/usetoast";

export default {
  data() {
    return {
      product: null,
      seller: null,
      isBestSeller: false,
      products: [],
      isProductLoaded: false,
      product: {},
      seller: {},
    };
  },

  async created() {
    
    const productId = this.$route.params.id;
    const productStore = useProductStore();
    const productsData = await productStore.getProducts();
   
    this.products = productStore.productsGot;
    
   

    for (let i = 0; i < this.products.length; i++) {
      
      if (this.products[i].id == productId) {
      
        this.product = this.products[i];
        
        this.isProductLoaded = true;
        break;
      } else {
      }
    }

    fetch(`https://dummyjson.com/users/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        this.seller = data;
       
      })
      .catch((error) => console.error(error));
  },
  methods: {
    isFavourite(){
      
      const productStore = useProductStore()
      productStore.addProductToFavourites(this.product)
    },
    goBack() {
      window.history.back();
    },
    checkIsBestSeller(productId) {
      
      if ([6, 13, 18, 25].includes(productId)) {
        this.isBestSeller = true; 
      }
    },
    handleBuyClick() {
      const productStore = useProductStore();
      productStore.incrementClickCount();
      if (this.product) {
        productStore.addProductToCart(this.product);
      }
      this.show(this.product);
    },
    showCartProducts() {
      const productStore = useProductStore();
      const cartProducts = productStore.products;
    
    },
    show(product) {
    
      const toast = useToast(); 

      this.$toast.add({
        severity: "success",
        summary: this.$t("productAddedSummary"),
        detail: this.$t("productAddedDetail", { product: product.title }),
        life: 3000,
      });
    },
    isNotFavourite(){
      const productStore = useProductStore()
      productStore.deleteFromFavourites(this.product)
    }
  },
};
</script>
<style scoped>
.image-row {
  display: flex;
  width: 100%; 
}

.button-container {
  position: relative;
  margin-left: 8rem;
}

.underline-long {
  position: absolute;
  width: 10%;
  height: 3%; 
  background-color: #c0071c; 
  bottom: 0rem; 
  left: 2rem;

  content: "";
  pointer-events: none; 
}

@media (max-width: 768px) {
  .underline-long {
    width: 60%;
  }
}
.separation {
  margin-top: -10px; 
}

.headerText {
  margin-left: 2rem;
}

.left {
  width: 50%;
  padding: 20px;
  background-color: #f0f0f0;
}

.right {
  width: 50%;
  background-color: #e0e0e0;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.image {
  width: 10%; 
  padding: 10px;
  box-sizing: border-box;
}

.image img {
  width: 61%;
  display: block;
}

.image.giant {
  width: 100%; 
}
</style>
