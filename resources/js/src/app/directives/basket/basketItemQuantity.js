Vue.directive("basket-item-quantity",
    {
        update(el, binding)
        {
            el.innerHTML = binding.value;
        }
    });
