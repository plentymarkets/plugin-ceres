$(document).ready(function()
{
    initCeresForGridstack();
});

function initCeresForGridstack()
{
    removeDefaultLinks();
    injectGridstackMarkup();
    addBackendEventListeners();
    addDeleteButtons();
}

function addDeleteButtons()
{
    $('.grid-stack-item').each(function ()
    {
            $(this).append('<div class="shopbuilder_deleteIcon fa fa-trash""></div>');

            $(this).mouseenter(function ()
            {
                $(this).addClass('contextMenuVisible');
            });

            $(this).mouseleave(function ()
            {
                $(this).removeClass('contextMenuVisible');
            });

            $('.shopbuilder_deleteIcon').click(function ()
            {
                $(this).parent().remove();
            });
    });
}

function addBackendEventListeners()
{
    $('body').on('shopbuilder_drop', function(element)
    {
        alert('drop:' + element);
    });

    $('body').on('shopbuilder_reset', function()
    {
        alert('reset');
    });

    $('body').on('shopbuilder_zoom_in', function()
    {
        alert('zoom_in');
    });

    $('body').on('shopbuilder_zoom_out', function()
    {
        alert('zoom_out');
    });

    // test
    // $('.brand-wrapper').append('<button id="testEventButton">trigger event</button>');
    // $('#testEventButton').on('click', function ()
    // {
    //     $('body').trigger('shopbuilder_drop', this);
    // });
}

function setDragCursorToChildElements(element)
{
    // iterate over all child elements
    $(element).find('*').each(function()
    {
        $(this).css('cursor','move');
    });
}

function removeDefaultLinks()
{
    // iterate over all body elements
    $('body').find('*').each(function()
    {
        $(this).click(function (event)
        {
            //prevent all existing click actions
            event.preventDefault();
        })
    });
}

function injectGridstackMarkup()
{
    // select drag & drop areas
    $('.mkt-homepage').each(function(i)
    {
        // iterate over all sub-elements
        $(this).find(' > div, > hr').each(function(j)
        {
            // create gridstack item markup
            var gridStackItem = $(  '<div class="grid-stack-item"' +
                // '     data-gs-x="0"' +
                // '     data-gs-y="' + j + '"' + // one element for each row
                // '     data-gs-width="1"' +
                '     data-gs-height="' + Math.round($(this).height() / 40) + '"><div class="grid-stack-item-content"></div>' +
                '</div>');

            setDragCursorToChildElements($(this));

            // wrap current element with gridstack item markup
            $(this).wrap(gridStackItem)

            ++j;
        });

        // add gridstack container class for current drag & drop area
        $(this).addClass('grid-stack-' + i);

        // initialize gridstack for current gridstack container
        initGridstack(i);

        ++i;
    });
}

/**
 *
 * @param id for current container
 */
function initGridstack(id)
{
    var options = {
        width:1,
        cellHeight: 40,
        verticalMargin: 0,
        acceptWidgets: '.grid-stack-item',
    };

    var selector = '.grid-stack-' + id;
    $(selector).gridstack(options);
}