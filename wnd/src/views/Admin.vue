<template>
  <div class="card m-20 p-fluid">
    
     <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem' 
                    })
                }
            }"
        >
            <Column field="id" header="Id" style="width: 20%">
                <template #editor="{ data, field }">
                   <InputText class="w-10" v-model="data[field]" />
                </template>
            </Column>
            <Column field="title" header="Title" style="width: 20%">
                <template #editor="{ data, field }">
                   <InputText class="w-max" v-model="data[field]" />
                </template>
            </Column>
            <Column field="brand" header="Brand" style="width: 20%">
                <template #editor="{ data, field }">
                   <InputText class="w-max" v-model="data[field]" />
                </template>
            </Column>
             <Column field="description" header="Description" style="width: 20%">
                <template #editor="{ data, field }">
                   <InputText class="w-max" v-model="data[field]" />
                </template>
            </Column>
             <Column field="images" header="Images" style="width: 20%">
                <template #editor="{ data, field }">
                   <InputText class="w-max" v-model="data[field]" />
                </template>
            </Column>
             <Column field="rating" header="Rating" style="width: 20%">
                <template #editor="{ data, field }">
                   <InputText class="w-10" v-model="data[field]" />
                </template>
            </Column>
             <Column field="price" header="Price" style="width: 40%">
                <template #editor="{ data, field }">
                    <InputText class="w-10" v-model="data[field]" />
                </template>
            </Column>
          <Column field="bestSeller" header="Best Seller" style="width: 40%">
    <template #editor="{ data, field }">
         <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status">
        </Dropdown>
    </template>
</Column>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/store.ts';

const products = ref();
const editingRows = ref([]);
const productStore = useProductStore();
const statuses = ref([
    { label: 'true', value: 'true' },
    { label: 'false', value: 'false' },
]);
const getStatusLabel = (status) => {
    switch (status) {
        case 'true':
            return 'true';

        case 'false':
            return 'false';
        default:
            return null;
    }
};
onMounted(async () => {
  await productStore.getProducts();
  products.value = productStore.productsGot;
  products.value = products.value
});

const data = {
  searchQuery: "",
};

const onRowEditSave = (event) => {
  let { newData, index } = event;
  products.value[index] = newData;
  productStore.productsGot = products.value
  productStore.getProducts()
  
};



</script>

