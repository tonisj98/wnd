<template>

<div>
    <div class="p-mb-2">
      <Steps :model="items" :activeIndex="activeIndex" @onStepChange="handleStepChange" />
    </div>
    <div v-if="activeIndex === 0">
      <div class="bg-gray-100">
    <div class="container mx-auto mt-10">
      <div class="flex flex-col md:flex-row shadow-md my-10">
        <div class="w-full md:w-3/4 bg-white px-4 md:px-10 py-10">
          <div class="flex flex-col md:flex-row justify-between border-b pb-4 md:pb-8">
            <h1 class="font-semibold text-2xl">{{ $t('shoppingCart') }}</h1>
           
            <h2 class="font-semibold text-2xl">
              {{ getProducts.length }} Item(s)  
               <ConfirmDialog
      v-if="showDialogCart"
      :message="confirmationMessage"
      :onConfirm="onConfirm"
      :onReject="onReject"
    ></ConfirmDialog>
               <button  @click="showConfirmDialog"><i class="pi pi-trash" style="color: red; font-size: 1.2rem"></i></button>
            </h2>
          </div>
          <div class="flex mt-5 md:mt-10 mb-5">
            <h3 class="font-semibold text-gray-600 text-xs uppercase w-full md:w-2/5">
              {{ $t('productDetails') }}
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              {{ $t('quantity') }}
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              {{ $t('price') }}
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              {{ $t('total') }}
            </h3>
          </div>

          <div
            v-for="product in getProducts"
            :key="product.id"
            class="flex flex-col md:flex-row items-center hover:bg-gray-100 -mx-4 px-6 py-5"
          >
            <div class="flex md:w-2/5">
              <div class="w-full md:w-20">
                <img :src="product.images[0]" alt="Imagen del producto" class="w-full" />
              </div>
              <div class="flex flex-col justify-between ml-0 md:ml-4 flex-grow">
                <span class="font-bold text-sm">{{ product.title }}</span>
                <span class="text-red-500 text-xs">{{ product.category }}</span>
                <button
                  @click="removeProduct(product.id)"
                  class="font-semibold hover:text-red-500 text-gray-500 w-1 text-center"
                >
                  {{ $t('remove') }}
                </button>
              </div>
            </div>

            <div class="flex justify-center w-full md:w-1/5 mt-4 md:mt-0">
              <button @click="decrementQuantity(product)">-</button>
              <input
                class="mx-2 border text-center w-8"
                type="text"
                v-model="product.Quantity"
              />
              <button @click="incrementQuantity(product)">+</button>
            </div>
            <span class="text-center w-full md:w-1/5 font-semibold text-sm">
              ${{ product.price }}
            </span>
            <span class="text-center w-full md:w-1/5 font-semibold text-sm">
              ${{ product.Quantity * product.price }}
            </span>
          </div>

<router-link to="/">
          <a  class="flex font-semibold text-indigo-600 text-sm mt-5 md:mt-10">
            <svg
              class="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
              />
            </svg>
            Continue Shopping
          </a>
          </router-link>
        </div>
        <div id="summary" class="w-full md:w-1/4 px-4 md:px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-4">{{ $t('orderSummary') }}</h1>
          <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase">{{ $t('shipping') }}</label>
            <select class="block p-2 text-gray-600 w-full text-sm">
              <option>{{ $t('standardShipping') }} - $10.00</option>
            </select>
          </div>
          <div  class="py-10">
            <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">{{ $t('promoCode') }}</label>
            <input   v-model="promoCode" type="text" id="promo" :placeholder="$t('enterCode')" class="p-2 text-sm w-full" />
            <div  v-if="isPromotioned">
              <p class="text-red-700 text-xs">{{ $t('wnd') }}</p>
            </div>
            <div v-if="!isPromotioned">
              <p class="text-red-700 text-xs">{{ $t('notwnd') }}</p>
            </div>
          </div>
          <button  v-tooltip="'Promotion code: WND'" type="text" placeholder="Right"  @click="applyPromotionCode" class="bg-red-700 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            {{ $t('apply') }}
          </button>
          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>{{ $t('totalCost') }}</span>
              <div v-if="isPromotioned">
                <p class="text-red-700 text-xs">${{ totalValuePromoted }}</p>
              </div>
              <span v-if="!isPromotioned">${{ totalValue }}</span>
            </div>
          
            <button @click="nextStep" class="bg-red-700 font-semibold hover:bg-red-600 py-3 text-sm text-white uppercase w-full">
              {{ $t('checkout') }}
            </button>
          
          </div>
        </div>
      </div>
    </div>
  </div> 
    </div>
    <div v-if="activeIndex === 1">
     <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-4 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold">Checkout</h2>

      <form @submit.prevent="completePurchase">
      
        <div>
          <h3 class="text-xl font-semibold">Datos de Facturación</h3>
          <div class="mt-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="billingData.name" type="text" id="name" class="input-field" required>
          </div>
          <div class="mt-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="billingData.email" type="email" id="email" class="input-field" required>
          </div>
        
        </div>

        <div class="mb-4">
          <h3 class="text-xl font-semibold">Datos de Envío</h3>
          <div class="mt-2">
            <label for="shippingAddress" class="block text-sm font-medium text-gray-700">Dirección de Envío</label>
            <input v-model="shippingData.address" type="text" id="shippingAddress" class="input-field" required>
          </div>
          <div class="mt-2">
            <label for="city" class="block text-sm font-medium text-gray-700">Ciudad</label>
            <input v-model="shippingData.city" type="text" id="city" class="input-field" required>
          </div>
         
        </div>

      
        <div>
          <h3 class="text-xl font-semibold">Resumen de Compra</h3>
       
          <div v-for="product in getProducts" :key="product.id" class="mt-4">
            <div class="flex justify-between">
              <span>{{ product.title }}</span>
              <span>{{ product.Quantity }} x ${{ product.price }}</span>
            </div>
          </div>

          <div class="mt-4 text-xl font-semibold">
           <div v-if="isPromotioned">
                <p class="text-red-700 text-xl">${{ totalValuePromoted }}</p>
              </div>
              <div>
              <span v-if="!isPromotioned">${{ totalValue }}</span>
              </div>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="btn-primary" >Completar Compra</button>
          <ConfirmDialog
      v-if="showDialogPurchase"
      :message="confirmationMessage"
      :onConfirm="onConfirm"
      :onReject="onReject"
    ></ConfirmDialog>
        </div>
      </form>
    </div>
  </div>
      <button @click="prevStep">Anterior</button>
    </div>
    
  </div>
</template>

<script>

import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/store.ts";
import ConfirmDialog from "../components/ConfirmDialog.vue";
import { useRouter, useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();

const isActive = (item) => {
  return item.route ? router.resolve(item.route).path === route.path : false;
};

export default {
  components: {
    ConfirmDialog,

  },

  data() {
    return {
      productStore: useProductStore(),
      productss: [],
      isOpen: false,
       showDialogPurchase: false,
       items: [
        { label: 'Shopping Cart' },
        { label: 'Personal Information' },
        ],
         billingData: {
        name: "",
        email: "",
        
      },
      shippingData: {
        address: "",
        city: "",
     
      },
      
      activeIndex: 0,
    };
  },
  setup() {
    const showDialog = ref(false);
      const showDialogCart = ref(false);
    const confirmationMessage = ref("");
    const productStore = useProductStore();
    const products = ref(productStore.products);
    const promoCode = ref("");
    const isPromotioned = ref(false);
    const errorPromotion = ref(false);
    const incrementQuantity = (product) => {
      
      product.Quantity++;
    };
    const decrementQuantity = (product) => {
    
      if (product.Quantity > 1) {
        product.Quantity--;
      }
    };

    const removeProduct = (productId) => {
      productStore.removeProduct(productId);
      products = this.productStore.products;
    };
    const applyPromotionCode = () => {
      const code = promoCode.value.trim();
      if (code === "WND") {
        isPromotioned.value = true;
      } else {
        errorPromotion.value = true;
      }
    };
    const showConfirmDialog = () => {
      confirmationMessage.value = "¿Estás seguro de continuar?";
      showDialog.value = true;
    };
    const showConfirmDialogCart = () => {
      confirmationMessage.value = "¿Estás seguro de continuar?";
      showDialog.value = true;
    };


    const onConfirm = () => {
      
    
      showDialog.value = false;
    };

    const onReject = () => {
     
    
      showDialog.value = false;
    };

    return {
      products,
      incrementQuantity,
      decrementQuantity,
      removeProduct,
      applyPromotionCode,
      promoCode,
      isPromotioned,
      errorPromotion,
      showDialog,
       showDialogCart,
      confirmationMessage,
      showConfirmDialog,
      onConfirm,
      onReject,
    };
  },

  computed: {
    totalValue() {
      this.products = this.productStore.products;
      return this.products.reduce((total, product) => {
        return total + product.price * product.Quantity;
      }, 0);
    },
    totalValuePromoted() {
      this.products = this.productStore.products;
      return this.products
        .reduce((total, product) => {
          const subtotal = product.price * product.Quantity;
          const discount = subtotal / 10;
          const roundedSubtotal = subtotal - discount;
          return total + roundedSubtotal;
        }, 0)
        .toFixed(2);
    },
    getProducts() {
     

      return this.productStore.products;
    },
  },
  methods: {
    goBack() {
      window.history.back();
    },
    checkOut() {
   
    },
      handleStepChange(event) {
      this.activeIndex = event.index;
    },
    nextStep() {
      this.activeIndex += 1;
    },
    prevStep() {
      this.activeIndex -= 1;
    },
    complete() {
    
    },
    
    completePurchase() {
      
      if (this.isFormValid()) {
        this.showDialogCart=true
      
 this.$router.push("/checkout");
      
      }
    },
    isFormValid() {

      return this.isBillingDataValid() && this.isShippingDataValid();
    },
    isBillingDataValid() {
     
      return this.billingData.name && this.billingData.email;
    },
    isShippingDataValid() {
    
      return this.shippingData.address && this.shippingData.city;
    },
    
  },
  };

</script>
<style>
.input-field {
  @apply block w-full border border-gray-300 rounded-md py-2 px-3 mt-1 placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm;
}

.btn-primary {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800;
}
</style>