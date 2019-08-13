import Vue from "vue";

Vue.directive("basket-item-sum",
    {
        update(el, binding)
        {
            el.innerHTML = Vue.filter("currency").apply(Object, [binding.value]);
        }
    });
