<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    style="background-color: rgba(0, 0, 0, 0.5);"
  >
    <div class="bg-white shadow-lg p-5">
      <p class="text-2xl p-5">{{ $t('deleteAllMessageConfirmation') }}</p>
      <div class="mt-4 flex justify-center p-4">
        <button @click="confirm" class="px-4 py-2 bg-red-700 text-white -md mr-4">{{ $t('confirm') }}</button>
        <button @click="reject" class="px-4 py-2 bg-white text-red-700 border-2  border-red-700">{{ $t('cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/store.ts';
export default {
  props: {
    message: String,
    onConfirm: Function,
    onReject: Function,
  },
  methods: {
    confirm() {
      this.onConfirm();
       useProductStore().resetProducts();
       
    },
    reject() {
      this.onReject();
    },
  },
};
</script>
