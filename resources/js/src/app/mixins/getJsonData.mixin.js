import { isNullOrUndefined } from "../helper/utils";
import Vue from "vue";

Vue.config.optionMergeStrategies.jsonDataFields = function(parent, child, vm)
{
    return child || [];
};

Vue.mixin({
    created()
    {
        if (!isNullOrUndefined(this.$options.jsonDataFields))
        {
            this.$options.jsonDataFields.forEach(dataField =>
            {
                const attrKey = dataField.replace(/([a-z])([A-Z])/g, "$1-$2")
                    .replace(/\s+/g, "-")
                    .toLowerCase();

                const uid = this.$attrs[attrKey];

                if (typeof document !== "undefined")
                {
                    // read json data from dom element on client side
                    const element = document.getElementById(uid);

                    if (!isNullOrUndefined(element))
                    {
                        this[dataField] = JSON.parse(element.textContent);
                    }
                }
                else if (typeof jsonData !== "undefined")
                {
                    // read json data from global object during ssr
                    this[dataField] = jsonData[uid];
                }
            });
        }
    }
});
