import {renderItems}from "services/CategoryRendererService";

Vue.directive("render-category", function(value)
{
    $(this.el).click(function(event)
    {
        event.preventDefault();

        renderItems(value);
    });
});
