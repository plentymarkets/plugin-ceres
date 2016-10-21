module.exports = (function($)
{

    return {
        scrollTo: _scrollTo
    };

    function _scrollTo(elem, offset)
    {
        var $elem      = $(elem);
        var $container = $("html, body");
        var scrollTop  = $elem.offset().top;

        offset = offset || 0;

        if ($elem.parents(".modal").length > 0)
        {
            $container = $elem.parents(".modal").find(".modal-body");
            scrollTop = $container.scrollTop() - ($container.offset().top - $elem.offset().top);
        }
        else if ($elem.is(".modal"))
        {
            $container = $elem.find(".modal-body");
            scrollTop = $container.scrollTop() - ($container.offset().top - $elem.offset().top);
        }

        if (scrollTop - offset < window.pageYOffset || scrollTop > (window.pageYOffset + window.innerHeight))
        {
            $container.animate({
                scrollTop: scrollTop - offset
            });
        }
    }

})(jQuery);
