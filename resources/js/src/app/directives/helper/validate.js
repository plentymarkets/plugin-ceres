Vue.directive("validate", {

    update(el, binding)
    {
        if (binding.value === false)
        {
            delete el.dataset.validate;
        }
        else
        {
            el.dataset.validate = binding.argument || null;
        }
    }
});
