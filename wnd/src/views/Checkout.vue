
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
    <img src="../assets/images/purchase.png" class="h-80 w-max"/>
      <h1 class="text-4xl font-bold text-red-500">{{ $t('successfulPurchase') }}</h1>
      <router-link class="underline text-blue-600" to="/">{{ $t('mainPage') }}</router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/store.ts';
export default {
  
  data() {
    return {

      showSuccessMessage: false,
    };
  },
   setup() {
 
    const store = useProductStore();

    
    onMounted(() => {
      store.resetProducts();
    });
  },
  methods: {
    completePurchase() {
      
      if (this.isFormValid()) {
        this.showDialogCart = true;
      

        this.showSuccessMessage = true;


        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      }
    },
    redirectToHome() {
       

      this.$router.push("/"); 
    },
  },
};
</script>
