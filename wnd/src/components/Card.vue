<template>


<div v-if="bestProducts" class="w-80  bg-white rounded-lg">
    <div class="relative h-full">
        <img :src="product.images[0]" alt="Imagen del producto" class="w-full h-60 object-cover rounded">
         <span class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 font-semibold rounded-bl-xl">
            Best Sellers
        </span>
    </div> 
    <div class="flex">
    <p  class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 mr-2 text-xs">#bestseller</p>
    <p class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 mr-2 text-xs">#{{product.brand}}</p>
    <p class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4  text-xs">#{{product.category}}</p>
    
    
    
    </div>
    <h2 class="text-xl font-bold text-black truncate block capitalize px-4 py-3">{{ product.title }}</h2>
    <div class="flex items-center">
    <svg class="ml-4 w-4 h-4 text-red-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{{product.rating}}</p>
</div>
    <p class="text-sm text-gray-600 px-4 py-3 line-clamp-1">{{ product.description }}</p>
    <div class="flex items-center justify-between px-4 py-3">
 <p><b>{{ $t('seller') }}:</b> <u>{{ getUserSellerName(product) }}</u></p>
    </div>


    <div class="flex items-center justify-between px-4 py-3">
        <div class="text-lg font-semibold text-black">${{ product.price }}</div>
        <div class="text-gray-500 text-sm">
            <button class="px-4 py-2 bg-red-700 text-white  hover:bg-red-600 focus:outline-none" @click="handleBuyClick">
            {{ $t('buy') }}
        </button>
        
        </div>
    </div>
</div>

<div class="ml-1 ">
<div v-if="allProducts" class="w-80 bg-white rounded-lg  my-2 sm:mx-4 sm:my-4 md:mx-6 md:my-6  lg:my-8">
    <div class="relative h-full">
        <img :src="product.images[0]" alt="Imagen del producto" class="w-full h-60 object-contain rounded">
          <span v-if="product.bestSeller" class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 font-semibold rounded-bl-xl">
            Best Sellers
        </span>
    </div>
    <div class="flex">
       <p v-if="product.bestSeller" class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 mr-2 text-xs">#bestseller</p>

        <p  class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 mr-2 text-xs">#{{product.brand}}</p>
        <p class="border-red-700 border p-2 rounded-full text-red-700 w-max mt-4 text-xs">#{{product.category}}</p>
    </div>
    <h2 class="text-xl font-bold text-black truncate block capitalize px-4 py-3">{{ product.title }}</h2>
    <div class="flex items-center">
        <svg class="ml-4 w-4 h-4 text-red-500  mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{{product.rating}}</p>
    </div>
    <p class="text-sm text-gray-600 px-4 py-3 line-clamp-1">{{ product.description }}</p>
      <p class="mt-4"><b>{{ $t('seller') }}:</b> <u>{{ users ? getUserSellerName(product) : $t('loading') }}</u></p>


    <div class="flex items-center justify-between px-4 py-3">
    
      
        <div class="text-lg font-semibold text-black">${{ product.price }}</div>
        
        <div class="text-gray-500 text-sm">
        
            <button class="px-4 py-2 bg-red-700 text-white hover:bg-red-600 focus:outline-none" @click="handleBuyClick">
                {{ $t('buy') }}
            </button>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
    data(){return{
               isBestSeller: '',
    }

    },
  props: {
    product: {
      type: Object,
      required: true,
      
    },
     users: {
      type: Object,
      required: true,
      
    },
     bestProducts: {
      type: Boolean,
      default: false,
    },
    allProducts: {
      type: Boolean,
      default: false,
    },
      bestSellers: {
       type: Object,
      required: true,
    },
    
  },
  methods: {
    handleBuyClick() {
    
    },
      getUserSellerName(product) {
      const user = this.users.find((user) => user.id === product.id);
      return user ? user.company.name : "Usuario no encontrado";
    },
  },
  created(){
        if ([6, 13, 18, 25].includes(this.product.id)) {
      
      this.isBestSeller = true;
    }
    
  }
};
</script>

