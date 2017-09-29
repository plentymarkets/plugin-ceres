Vue.directive("waiting-animation-infinite", function()
{
    $(this.el).click(event =>
    {
        event.currentTarget.classList.add("disabled");

        event.currentTarget.children[0].className = "";
        event.currentTarget.children[0].className = "fa fa-circle-o-notch fa-spin";
    });
});
