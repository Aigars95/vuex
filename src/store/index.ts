import { createStore } from "vuex";
import axios from "axios";
import { ProductType } from "@/store/stateTypes";

type Store = {
  products: ProductType[];
  productsCategories: string[];
  productByCategory: ProductType[];
};

export default createStore({
  state() {
    return {
      products: [],
      productsCategories: [],
      productByCategory: [],
    };
  },
  mutations: {
    setProducts(state: Store, data) {
      state.products = data;
    },
    setProductsCategories(state: Store, data) {
      state.productsCategories = data;
    },
    setProductByCategory(state: Store, data) {
      state.productByCategory = data;
    },
  },
  actions: {
    async getProducts(context) {
      const { data } = await axios.get(`https://fakestoreapi.com/products`);
      context.commit("setProducts", data);
    },
    async getProductsCategories(context) {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/categories`
      );
      context.commit("setProductsCategories", data);
    },
    async getProductsByCategory(context, category: string) {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      context.commit("setProductByCategory", data);
    },
  },
  modules: {},
});
