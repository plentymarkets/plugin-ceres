import { isDefined } from "../helper/utils";
import Vue from "vue";

Vue.filter("hasItemDefaultPrice", itemData =>
{
    const defaultPrice = itemData.prices.default;

    return (isDefined(defaultPrice) && !isNaN(defaultPrice.price.value) && defaultPrice.price.value > 0) || itemData.item.itemType === "set" || itemData.variation.id == 12650;
});
