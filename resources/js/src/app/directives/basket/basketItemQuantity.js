import { floatLength } from "../../helper/number";
import { defaultValue } from "../../helper/utils";
import Vue from "vue";

Vue.directive("basket-item-quantity",
    {
        update(el, binding)
        {
            const value     = defaultValue(binding.value, 0);
            const decimals  = floatLength(value);

            el.innerHTML = value.toFixed(decimals).replace(".", App.decimalSeparator);
        }
    });
