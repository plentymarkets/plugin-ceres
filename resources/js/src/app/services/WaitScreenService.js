module.exports = (function($)
{

    const overlay = {
        count    : 0,
        isVisible: false
    };

    return {
        getOverlay    : getOverlay,
        showWaitScreen: showWaitScreen,
        hideWaitScreen: hideWaitScreen
    };

    function getOverlay()
    {
        return overlay;
    }

    function showWaitScreen()
    {
        overlay.count = overlay.count || 0;
        overlay.count++;
        overlay.isVisible = true;
    }

    function hideWaitScreen(force)
    {
        overlay.count = overlay.count || 0;
        if (overlay.count > 0)
        {
            overlay.count--;
        }

        if (force)
        {
            overlay.count = 0;
        }

        if (overlay.count <= 0)
        {
            overlay.count = 0;
            overlay.visible = false;
        }

    }

})(jQuery);
