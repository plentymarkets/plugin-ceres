// item script extends category script
import "./category";

Vue.component("add-to-wish-list", () => import(/* webpackPrefetch: true */ "./app/components/item/AddToWishList.vue"));
Vue.component("graduated-prices", () => import(/* webpackPrefetch: true */ "./app/components/item/GraduatedPrices.vue"));
Vue.component("item-data-table", () => import(/* webpackPrefetch: true */ "./app/components/item/ItemDataTable.vue"));
Vue.component("item-image-carousel", () => import(/* webpackPrefetch: true */ "./app/components/item/ItemImageCarousel.vue"));
Vue.component("variation-select", () => import(/* webpackPrefetch: true */ "./app/components/item/VariationSelect.vue"));
Vue.component("order-property-list", () => import(/* webpackPrefetch: true */ "./app/components/item/OrderPropertyList.vue"));

import SingleItem from "./app/components/item/SingleItem.vue";
Vue.component("single-item", SingleItem);
