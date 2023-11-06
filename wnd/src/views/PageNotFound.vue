<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
    <img src="../assets/images/404.png" class="h-80 w-max"/>
      <h1 class="text-4xl font-bold text-red-500">{{ $t('error404') }}</h1>
      <p class="text-lg mt-2 underl">{{ $t('pageNotFound') }}</p>
      <router-link class="underline text-blue-600" to="/">{{ $t('mainPage') }}</router-link>
    </div>
  </div>
</template>
