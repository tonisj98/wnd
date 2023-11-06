<template>

  <div  class="flex flex-basis justify-between mr-4 -ml-4">
  <div>
  <p class="text-red-700 font-bold text-4xl mt-10 mb-6 md:mx-40 relative headerText"
  >
    {{ $t('allProducts') }}
    <span class="underline-long"></span>
  </p></div>
  <div class="mr-40">
<div class="relative">
  <input
    type="text"
    v-model="searchQuery"
    :placeholder="$t('searchByName')"
    class="w-20 mt-40 sm:w-60 sm:mt-20 sm:mr-20 p-2 my-4 border-b border-red-700 outline-none"
  />
  <i class="pi pi-search relative right-20  text-red-700" style="font-size: 1rem"></i>
</div>

  </div>
  </div>
  <div class="flex">
    <div
      @click="visible = true"
      class="border-red-700 border p-3 border-2 text-red-700 ml-0 md:ml-40 w-max mb-5 h-12"
    >
      <p>{{ $t('allFilters') }} <i class="pi pi-sliders-h"></i></p>
      
    </div>
    <div class="ml-4">
    <div @click="resetFilters" class="border-red-700 border p-3 border-2 text-red-700 ml-0  w-max mb-5 h-12">
    <p>{{ $t('resetFilters') }}</p>
    </div>
    </div>
  </div>
  <div class="flex flex-wrap  ml-40">
    <div
          v-for="(product, index) in filteredProducts"
      :key="index"
      @click="mostrarProducto(product)"
    >
      <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
        <Card :product="product" :allProducts="true" :users="users" :bestSellers="bestSellers"/>
      </router-link>
    </div>
  </div>



<div v-if="products.length == 0" class="flex items-center justify-center h-screen text-xl">
<p><p> {{ $t('noProducts') }}</p></p>
</div>





  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible">
      <h2 class=" text-2xl font-semibold mb-4">{{ $t('filter') }}</h2>
   
      <div class="relative">
       <label
          for="priceDropdown"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t('category') }}
        </label>
        <select
          v-model="selectedCategory"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">{{ $t('allCategories') }}</option>
       
          <option
            v-for="categoria in categories"
            :key="categoria"
            :value="categoria"
          >
            {{ categoria }}
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M4.293 6.293a1 1 0 011.414-1.414L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 01-1.414 0 1 1 0 010-1.414z"
            />
          </svg>
        </div>
      </div>
        <div class="mt-4">
        <label
          for="priceDropdown"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t('brand') }}
        </label>
        <select
          v-model="filteredBrand"
          id="priceDropdown"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          @change="filterByBrand"
        >
          <option
            v-for="product in products"
            :key="product.brand"
            :value="product.brand"
          >
            {{ product.brand }}
          </option>
        </select>
      </div>
      <div class="mt-4">
        <label
          for="priceDropdown"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t('price') }}
        </label>
        <select
          v-model="selectedPriceOrder"
          id="priceDropdown"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          @change="sortProductsByPrice"
        >
          <option value="ascending">{{ $t('ascending') }}</option>
          <option value="descending">{{ $t('descending') }}</option>
        </select>
      </div>

      <div class="mt-4">
        <label
          for="priceDropdown"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t('rating') }}
        </label>
        <select
          v-model="selectedRatingOrder"
          id="priceDropdown"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          @change="sortProductsByRating"
        >
          <option value="ascending">{{ $t('ascending') }}</option>
          <option value="descending">{{ $t('descending') }}</option>
        </select>
      </div>
        
         <div class="mt-4">
      <label for="minPrice" class="block text-sm font-medium text-gray-700">
        {{$t('priceRate')}}
      </label>
      <div class="flex">
        <input
          type="number"
          v-model="minPrice"
          id="minPrice"
          placeholder="Mín"
          class="block w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-l shadow leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="number"
          v-model="maxPrice"
          id="maxPrice"
          placeholder="Máx"
          class="block w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-r shadow leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>

    <div class="mt-4">
      <button @click="filterByPriceRange" class="block bg-red-700 text-white px-4 py-2  hover:bg-red-800">
        {{$t('apply')}}
      </button>
    </div>
    </Sidebar>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useProductStore } from "../stores/store.ts";
import Card from "../components/Card.vue";
import { ref, watch } from "vue";
import { fetchProducts, fetchUsers, fetchCategories } from '../services/apiServices.ts';

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const products = ref();
const visible = ref(false);

export default {
  setup() {

    const isModalOpen = ref(false);
    const categorias = ref(new Set());
    const visible = ref(false);

    const showSidebar = () => {
      visible.value = true;
    };
    const openModal = () => {
      isModalOpen.value = true;
     
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
   
    return { isModalOpen, openModal, closeModal, visible, showSidebar };
  },
  components: {
    Card,
  
  },
  data() {
    return {
      products: [],
      bestsellers: [],
      categories: new Set(),
      selectedCategory: "",
      filtered: false,
      searchQuery: "",
      filteredBrand: "",
    };
  },

 async mounted() {
 const productStore = useProductStore();

    const productsData = await productStore.getProducts();
 this.products = productStore.productsGot;
    
  
    fetchCategories()
      .then((data) => {
        this.categories = data;
       
      })
      .catch((error) => console.error(error));

        fetchUsers()
      .then((data) => {
        this.users = data;
        
      })
      .catch((error) => console.error(error));
  },
  watch: {
    selectedCategory(newValue) {
      
      fetch(`https://dummyjson.com/products/category/${newValue}`)
        .then((res) => res.json())
        .then((data) => {
       
          this.products = data.products.map((product) => {
        if ([6, 13, 18, 25].includes(product.id)) {
          this.isBestSeller = true;
        } else {
          this.isBestSeller = false;
        }
        return product;
      });
      
    
        });
        
    },
     filteredBrand(newValue) {
   
     if (this.filteredBrand) {
      this.products = this.products.filter((product) => product.brand === this.filteredBrand);
    }
        
    },
    
  },
  methods: {
    
filterByPriceRange() {
  
  const min = parseFloat(this.minPrice);
  const max = parseFloat(this.maxPrice);

  if (!isNaN(min) && !isNaN(max)) {
   
    this.products = this.products.filter((product) => {
      const productPrice = parseFloat(product.price);
      return !isNaN(productPrice) && productPrice >= min && productPrice <= max;
    });

    
  } else {
    
  }
},

  
  
 resetFilters() {
    this.selectedCategory = "";
    this.filteredBrand = "";
    this.selectedPriceOrder = "";
    this.selectedRatingOrder = "";
    this.minPrice ="";
    this.maxPrice ="";
    this.filterByPriceRange()
    this.sortProductsByPrice()
    this.sortProductsByRating()
  },
    sortProductsByPrice() {
      if (this.selectedPriceOrder === "ascending") {
       
        this.products.sort((a, b) => a.price - b.price);
      } else if (this.selectedPriceOrder === "descending") {
    
        this.products.sort((a, b) => b.price - a.price);
      } else if (this.selectedPriceOrder === "") {
       
        this.products= fetchProducts()
      .then((data) => {
        this.products = data;
      })
      .catch((error) => console.error(error));
      }
    },
    sortProductsByRating() {
      if (this.selectedRatingOrder === "ascending") {
      
        this.products.sort((a, b) => a.rating - b.rating);
      } else if (this.selectedRatingOrder === "descending") {
       
        this.products.sort((a, b) => b.rating - a.rating);
      }
      else if (this.selectedRatingOrder === "") {
       
        this.products= fetchProducts()
      .then((data) => {
        this.products = data;
      })
      .catch((error) => console.error(error));
      }
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
<style scoped>
.underline-long {
  position: absolute;
  width: 120%;
  height: 8%; 
  background-color: currentColor; 
  bottom: -5px;
  left: 0;
  content: "";
  pointer-events: none; 
}
@media (max-width: 768px) {
  .underline-long {
    width: 60%;
  }
  .headerText {
    margin-left: 2rem;
  }
}
</style>
