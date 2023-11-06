<template>

  <header class="bg-red-700 p-4 sm:p-8">
     <nav class="container mx-auto flex flex-wrap items-center justify-between">
      <router-link to="/" class="text-white text-3xl sm:text-5xl font-bold ml-2 sm:-ml-10 -ml-5">
        NexaStore
      </router-link>
      <div class="flex items-center space-x-2 sm:space-x-8 ml-2 sm:ml-0">
        <router-link to="/" class="text-white hover:underline">
           {{ $t('bestSellers') }}
        </router-link>
        <router-link to="/productList" class="text-white hover:underline">
           {{ $t('allProducts') }}
        </router-link>

       <div @click="toggleCart">
        <!-- <router-link to="/cart" class="relative text-white hover:underline"> -->
          <i class="pi pi-shopping-cart text-white"></i>
          <Badge class="relative top-0 right-0 transform -translate-y-4 w-5 h-5 sm:w-6 sm:h-6 inline-flex rounded-full bg-gray-50  py-1 text-xs sm:text-sm font-medium text-red-700 sm:ring-1 ring-inset ring-gray-500/10">
  {{ cartItemCount }}
</Badge>
       </div>
        <!-- </router-link> -->
      
        <div class="text-white">
         <button @click="changeLanguage('en')">EN |</button>
        <button @click="changeLanguage('de')">DE |</button>
        <button @click="changeLanguage('es')">ES |</button>
          <button @click="changeLanguage('fr')">FR</button>
        </div>
       <i @click="toggle" class="pi pi-user text-white hover:underline ml-2 sm:ml-4" v-tooltip="'User: admin Password: admin'" type="text" placeholder="Right"></i>
      </div>
        
    </nav>
    
  </header>
 <div class="card flex justify-content-center">

         <OverlayPanel ref="op" @click="toggle" class="w-96 mx-auto bg-white shadow-md p-4 rounded-lg">
   <div v-if="loggedIn">
<div class="flex justify-between mb-4">
  <div>
    <p >{{$t('welcome')}} admin</p>
  </div>
  <div>
          <router-link to="/favourites" class="text-gray-700 hover:underline">
           <p>{{ $t('favorites') }}</p>
        </router-link></div>
  <div>
    <i @click="logOff" class="pi pi-power-off text-red-700"></i>
  </div>
</div>

    <router-link to="/admin" class="relative  hover:underline">
   <button class="bg-red-700 text-white p-2">{{$t('administratorPanel')}}</button>
   
   </router-link>
   </div>
    <div v-if="!loggedIn">
      <h2 class="text-xl font-semibold mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full border border-gray-300 rounded p-2"
            @click.stop
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full border border-gray-300 rounded p-2"
            @click.stop
          />
        </div>
        <button @click.stop
          type="submit"
          class="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 "
        >
          Login
        </button>
      </form>
    </div>
  </OverlayPanel>


         <OverlayPanel ref="opCart" @click="toggleCart" class="w-90 mx-auto bg-white shadow-md p-4 rounded-lg ">
    <div v-if="products.length > 0">
      <h2 class="text-xl font-semibold mb-4">{{ $t('cartProducts') }}</h2>
      <ul>
        <li class="flex p-4" v-for="product in products" :key="product.id">
        
         <img :src="product.images[0]" alt="Imagen del producto" class="w-10 h-10 object-cover rounded mr-2"> {{ product.title }} x {{product.Quantity}} = ${{product.price*product.Quantity}}
        </li>
      </ul>
      <router-link to="/cart" class="text-white text-3xl sm:text-5xl font-bold  ">
      <button

              class="bg-red-700 font-semibold hover:bg-red-600 py-3 text-sm text-white uppercase w-full"
            >
              {{ $t('checkout') }}
            </button>
            </router-link>
    </div>
    <div v-else>
       <p>{{ $t('emptyCart') }}</p>
    </div>
          </OverlayPanel>
    </div>
<div class="position-relative marquee-container d-none d-sm-block text-white">
  <div class="marquee d-flex justify-content-around">
 <span class="ml-4">PROMOTION CODE: WND</span>
 <span class="ml-4">PROMOTION CODE: WND</span>
 <span class="ml-4">PROMOTION CODE: WND</span>
  </div>

</div>
<Dialog v-model:visible="visible" modal header="Enhorabuena" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <p>
        {{$t("promotionMessage")}}
    </p>
</Dialog>
</template>

<script>
import { useProductStore } from '../stores/store.ts';
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';


const open = ref(false);
 
export default {
  data() {
    return {
      productStore: useProductStore(),
      isModalOpen: false,
      searchQuery2: '',
       username: '',
      password: '',
      loggedIn: false,
    };
  },
  setup() {
      const visible = ref(false);
   const productStore = useProductStore();
    const products = computed(() => productStore.getCartProducts());
    const overlayPanel = ref(null);

    const showOverlayPanel = () => {
      overlayPanel.value.show();
    };

    const hideOverlayPanel = () => {
      overlayPanel.value.hide();
    };
const op = ref();
const opCart = ref();

const toggle = (event) => {
    op.value.toggle(event);
}
const toggleCart = (event) => {
    opCart.value.toggle(event);
}
setTimeout(() => {
      visible.value=true; 
    }, 1000); 
    return {
      overlayPanel,
      showOverlayPanel,
      hideOverlayPanel,
      toggle,
      op,
      toggleCart,
      opCart,
      products,
      visible
    };
  },
  computed: {
    clickCount() {
      return this.productStore.clickCount;
    },
     $productStore() {
      return useProductStore();
    },
     cartItemCount() {
    return this.productStore.products.length;
  },
  },
  methods:{
      openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
     changeLanguage(language) {
      this.$i18n.locale = language;
    },
     login() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.loggedIn = true;
      } else {
        alert('Login failed. Please use username "admin" and password "admin".');
      }
    },
    logOff(){
      this.loggedIn=false
    }
    
  }
  
};


</script>
<style scoped>
.marquee-container {
  max-width: 100vw; 
  height: 30px;
  overflow: hidden;
  line-height: 30px;

  .marquee {
    top: 0;
    width: max-content; 
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    animation: marquee 30s linear infinite;
  }

  .marquee2 {
    animation-delay: 15s;
  }

  b {
    padding-left: 10px;
  }
}

@keyframes marquee {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

</style>