<template>
  <div class="nav">
    <h3>Choose category</h3>
    <select @change="getProductByCategory" v-model="selectedCategory">
      <option value="all">all</option>
      <option
        v-for="category in productsCategories"
        :value="category"
        :key="category"
      >
        {{ category }}
      </option>
    </select>
  </div>

  <div  class="container">
    <div class="search__bar">
      <input type="text" placeholder="Search" v-model="searchQuery" />
    </div>
    <div
      class="product__card"
      v-for="product in searchProducts"
      :key="product.id"
    >
      <img :src="product.image" alt="asd" />
      <h1>{{ product.title }}</h1>
      <h4>${{ product.price.toFixed(2) }}</h4>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data: () => ({
    selectedCategory: "all",
    searchQuery: "",
  }),
  computed: {
    products() {
      return this.$store.state.products;
    },
    productsCategories() {
      return this.$store.state.productsCategories;
    },
    productsByCategory() {
      if(this.selectedCategory === 'all'){
        return this.products;
      }
      return this.$store.state.productByCategory;
    },
    searchProducts() {
      return this.productsByCategory.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    getProducts() {
      this.$store.dispatch("getProducts");
    },
    getProductsCategories() {
      this.$store.dispatch("getProductsCategories");
    },
    getProductByCategory() {
      this.$store.dispatch("getProductsByCategory", this.selectedCategory);
    },
  },
  mounted() {
    this.getProducts();
    this.getProductsCategories();
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.product__card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.search__bar {
  grid-column-start: span 3;
}
img {
  width: 200px;
  height: 200px;
}
</style>
