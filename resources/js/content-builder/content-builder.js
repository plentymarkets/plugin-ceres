$(document).ready(function()
{
    initCeresForGridstack();
});

function initCeresForGridstack()
{
    removeDefaultLinks();
    injectGridstackMarkup();
    addBackendEventListener();
}

function addBackendEventListener()
{
    $('body').on('shopbuilder_drop', function(element)
    {
        alert('drop:' + element);
    });

    // test
    $('.brand-wrapper').append('<button id="testEventButton">trigger event</button>');
    $('#testEventButton').on('click', function ()
    {
        $('body').trigger('shopbuilder_drop', this);
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
            var gridStackItem = $(  '<div class="grid-stack-item" ' +
                '     data-gs-x="0"' +
                '     data-gs-y="'+ j + '"' + // one element for each row
                '     data-gs-width="1"' +
                '     data-gs-height="1"><div class="grid-stack-item-content"></div>' +
                '</div>');

            // wrap current element with gridstack item markup
            $(this).wrap(gridStackItem)

            ++j;
        });

        // add gridstack container class for current drag & drop area
        $(this).addClass('grid-stack-' + i);

        // initialize gridstack for current gridstack container
        initGridstack(i, $(this).height());

        ++i;
    });
}

/**
 *
 * @param id for current container
 */
function initGridstack(id, height)
{
    var options = {
        width:1,
        cellHeight: null,
        float: true,
        acceptWidgets: '.grid-stack-item',
        animate: true // not working...?
    };

    var selector = '.grid-stack-' + id;
    $(selector).gridstack(options);
}