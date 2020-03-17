// item script extends category script
import "./category";

Vue.component("add-to-wish-list", () => import("./app/components/item/AddToWishList.vue"));
Vue.component("graduated-prices", () => import("./app/components/item/GraduatedPrices.vue"));
Vue.component("item-data-table", () => import("./app/components/item/ItemDataTable.vue"));
Vue.component("item-image-carousel", () => import("./app/components/item/ItemImageCarousel.vue"));
Vue.component("item-price", () => import("./app/components/item/ItemPrice.vue"));
import ItemSetComponent from "./app/components/item/ItemSetComponent.vue";
Vue.component("item-set-component", ItemSetComponent);
Vue.component("order-property-list", () => import("./app/components/item/OrderPropertyList.vue"));
Vue.component("variation-select", () => import("./app/components/item/VariationSelect.vue"));
Vue.component("item-availability", () => import("./app/components/item/ItemAvailability.vue"));
Vue.component("single-item-bundle", () => import("./app/components/item/SingleItemBundle.vue"));
Vue.component("single-add-to-basket", () => import("./app/components/item/SingleAddToBasket.vue"));

import SingleItem from "./app/components/item/SingleItem.vue";
Vue.component("single-item", SingleItem);
