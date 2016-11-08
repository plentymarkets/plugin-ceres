Vue.directive("change-lang", function(value)
{
    $(this.el).click(function(event)
    {
        var subPath = window.location.pathname.split("/");

        subPath = subPath[1] == value.currLang ? window.location.pathname.substring(3) : window.location.pathname;

        window.location.assign(window.location.origin + "/" + value.lang + "" + subPath);
    });
});
