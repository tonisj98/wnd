<template>
  <div class="flex flex-basis justify-between mr-4 -ml-4">
    <div>
      <p class="text-red-700 font-bold text-4xl mt-10 md:mt-10 mb-6 md:mx-40 relative headerText">
        {{ $t('bestSellers') }}
        <span class="underline-long"></span>
      </p>
    </div>
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
   
  </div>
  <div class="flex flex-wrap">
    <div class="p-8 ml-10 sm:ml-20 sm:mx-4  w-100 relative" v-for="(product, index) in filteredBestsellers" :key="index">
      <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
        <div class="ml-20">
          <Card :product="product" :bestProducts="true" :users="users" />
        </div>
      </router-link>
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible">
      <h2 class="text-2xl font-semibold mb-4">Filtros</h2>
 
      <div class="relative">
        <select
          v-model="selectedCategory"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Todas las categorías</option>
        
          <option v-for="categoria in categories" :key="categoria" :value="categoria">
            {{ categoria }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M4.293 6.293a1 1 0 011.414-1.414L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 01-1.414 0 1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      <div class="mt-4">
        <label for="priceDropdown" class="block text-sm font-medium text-gray-700">
          Price
        </label>
        <select
          v-model="selectedPriceOrder"
          id="priceDropdown"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          @change="sortProductsByPrice"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div class="mt-4">
        <label for="priceDropdown" class="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <select
          v-model="selectedRatingOrder"
          id="priceDropdown"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          @change="sortProductsByRating"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    </Sidebar>
  </div>
</template>

<script>
import Card from './Card.vue';
import { ref } from 'vue';
import { fetchProducts, fetchUsers } from '../services/apiServices.ts';
import { useProductStore } from '../stores/store.ts';

export default {
  components: {
    Card,
  },
  setup() {
    const visible = ref(false);

    const showSidebar = () => {
      visible.value = true;
    };

    return {
      visible,
      showSidebar,
    };
  },
  props: {
    searchQuery2: String,
  },
  data() {
    return {
      products: [],
      bestsellers: [],
      searchQuery: '',
      users: [],
    };
  },
  methods: {
    
  },
  async mounted() {
    const productStore = useProductStore();
     const productsData = await productStore.getProducts();
this.products = productStore.productsGot;

this.bestsellers = this.products.filter((product) => product.bestSeller);

    fetchUsers()
      .then((data) => {
        this.users = data;
      })
      .catch((error) => console.error(error));
      
  },
  computed: {
    filteredBestsellers() {
      return this.bestsellers.filter((product) =>
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
