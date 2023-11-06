<template>
<div>
    <h1 class="text-2xl font-semibold">Lista de Productos</h1>
    <div v-for="(product, index) in bestsellers" :key="index">
      <router-link :to="{ name: 'ProductDetail', params: { id: product } }">
        <Card :product="product" />
      </router-link>
      </div>
  </div>

</template>

<script>
import Card from './Card.vue';

export default {
 
  components: {
    Card,
  },
  data() {
    return {
      products: [], 
      bestsellers: [],
    };
  },
    methods: {
    mostrarProducto(product) {
     
    },
  },
  mounted() {
 
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
      
        this.products = data.products;
         this.bestsellers = [data.products[5], data.products[12], data.products[17]];
        
       
        
      })
      .catch((error) => console.error(error));
  },
};


</script>
