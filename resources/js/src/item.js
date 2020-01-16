// item script extends category script
import "./category";

import AddToWishList from "./app/components/item/AddToWishList.vue";
Vue.component("add-to-wish-list", AddToWishList);
import GraduatedPrices from "./app/components/item/GraduatedPrices.vue";
Vue.component("graduated-prices", GraduatedPrices);
import ItemDataTable from "./app/components/item/ItemDataTable.vue";
Vue.component("item-data-table", ItemDataTable);
import ItemImageCarousel from "./app/components/item/ItemImageCarousel.vue";
Vue.component("item-image-carousel", ItemImageCarousel);
import VariationSelect from "./app/components/item/VariationSelect.vue";
Vue.component("variation-select", VariationSelect);
// unused?
import OrderProperties from "./app/components/item/OrderProperties.vue";
Vue.component("order-properties", OrderProperties);
import "./app/components/item/OrderPropertyList";
import "./app/components/item/SingleItem";
