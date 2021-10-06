import { store } from "../../store/index";
import { isDefined } from "../../helper/utils";
import Vue from "vue";

Vue.directive("populate-store", {

    bind(el, binding)
    {
        const name = binding.value.name;
        const data = binding.value.data;
        const type = binding.arg;

        if (isDefined(name))
        {
            if (type === "action")
            {
                store.dispatch(name, data);
            }
            else if (type === "mutation")
            {
                store.commit(name, data);
            }
        }
    }
});
