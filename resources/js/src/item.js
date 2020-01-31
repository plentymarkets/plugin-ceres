// item script extends category script
import "./category";

Vue.component("add-to-wish-list", () => import("./app/components/item/AddToWishList.vue"));
Vue.component("graduated-prices", () => import("./app/components/item/GraduatedPrices.vue"));
Vue.component("item-data-table", () => import("./app/components/item/ItemDataTable.vue"));
Vue.component("item-image-carousel", () => import("./app/components/item/ItemImageCarousel.vue"));
Vue.component("variation-select", () => import("./app/components/item/VariationSelect.vue"));
Vue.component("order-property-list", () => import("./app/components/item/OrderPropertyList.vue"));

import SingleItem from "./app/components/item/SingleItem.vue";
Vue.component("single-item", SingleItem);
