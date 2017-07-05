import {renderItems}from "services/CategoryRendererService";

Vue.directive(
    "render-category",
    {
        bind: function(el)
        {
            el.onclick = function(event)
            {
                event.preventDefault();
                renderItems(value);
            };
        }
    });
