$(document).ready(function()
{
    initCeresForGridstack();
});

function initCeresForGridstack()
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
 * @param height of current container (acutally not really sure about this...)
 */
function initGridstack(id, height)
{
    var options = {
        // verticalMargin: 0 + 'px', // this kinda breaks everything... ?
        width:1,
        cellHeight: null,
        float: false,
        acceptWidgets: '.grid-stack-item',
        // animate: true
    };
    console.log(height);

    var selector = '.grid-stack-' + id;
    $(selector).gridstack(options);
}