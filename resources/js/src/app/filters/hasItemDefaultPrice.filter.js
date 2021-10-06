import { isDefined } from "../helper/utils";
import Vue from "vue";

Vue.filter("hasItemDefaultPrice", itemData =>
{
    const defaultPrice = itemData.prices.default;

    return isDefined(defaultPrice) && !isNaN(defaultPrice.price.value) || itemData.item.itemType === "set";
});
