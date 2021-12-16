import { Store } from "vuex";
import { ProductType } from "@/store/stateTypes";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    products: ProductType[];
    productsCategories: string[];
    productByCategory: ProductType[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
