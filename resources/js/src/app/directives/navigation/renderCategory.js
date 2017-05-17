var CategoryRendererService = require("services/CategoryRendererService");

Vue.directive("render-category", function(value)
{
    $(this.el).click(function(event)
    {
        event.preventDefault();

        CategoryRendererService.renderItems(value);
    });
});
