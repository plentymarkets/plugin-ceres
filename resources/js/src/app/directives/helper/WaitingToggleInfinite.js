Vue.directive("waiting-animation-infinite", function()
{
    $(this.el).click(event =>
    {
        event.currentTarget.classList.add("disabled");

        event.currentTarget.children[0].className = "";
        event.currentTarget.children[0].className = "fa fa-circle-o-notch fa-spin";

        if (event.currentTarget.children[0].initialClass.includes("fa-lg"))
		{
            event.currentTarget.children[0].className += " fa-lg";
        }
    });
});
