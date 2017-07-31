import {renderItems}from "services/CategoryRendererService";

Vue.directive(
    "render-category",
    {
        bind: function(el, binding)
        {
            el.onclick = function(event)
            {
                event.preventDefault();
                renderItems(binding.value);
            };
        }
    });
