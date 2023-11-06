<template>
  <footer class="bg-gray-900 text-white py-4 absolute bottom-0 left-0 w-full">
    <div class="container mx-auto text-center">
      <p>{{ $t('footerTop') }}</p><br>
      <p>{{ $t('footerBot') }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear,
    };
  },
};
</script>

<style scoped>

footer {
  position: relative;
  bottom: 0;
  left: 0;
  margin-top: 4rem;
  width: 100%;
  min-height: 8rem; 
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
