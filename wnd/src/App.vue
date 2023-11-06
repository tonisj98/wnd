<template>
  <div class="flex flex-col h-screen">
    <Header />
    <router-view class="flex-grow" />
    <Footer />
  </div>
  
</template>


<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'; 
import Main from '@/components/Main.vue'; 
import ProductDetail from '@/views/ProductDetail.vue';
import ProductsList from '@/views/ProductsList.vue'

export default {
  components: {
    Header,
    Footer,
    Main, 
    ProductDetail,
    ProductsList,

  },
};
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
