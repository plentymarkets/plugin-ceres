// item script extends category script
import "./category";

Vue.component("add-to-wish-list", function(resolve)
{
    require(["./app/components/item/AddToWishList.vue"], resolve);
});
Vue.component("graduated-prices", function(resolve)
{
    require(["./app/components/item/GraduatedPrices.vue"], resolve);
});
Vue.component("item-data-table", function(resolve)
{
    require(["./app/components/item/ItemDataTable.vue"], resolve);
});
Vue.component("item-image-carousel", function(resolve)
{
    require(["./app/components/item/ItemImageCarousel.vue"], resolve);
});
Vue.component("variation-select", function(resolve)
{
    require(["./app/components/item/VariationSelect.vue"], resolve);
});
import SingleItem from "./app/components/item/SingleItem.vue";
Vue.component("single-item", SingleItem);
Vue.component("order-property-list", function(resolve)
{
    require(["./app/components/item/OrderPropertyList.vue"], resolve);
});
