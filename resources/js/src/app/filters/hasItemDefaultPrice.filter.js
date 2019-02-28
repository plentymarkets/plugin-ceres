import { isDefined } from "../helper/utils";

Vue.filter("hasItemDefaultPrice", itemData =>
{
    const defaultPrice = itemData.prices.default;

    return isDefined(defaultPrice) && !isNaN(defaultPrice.price.value);
});
