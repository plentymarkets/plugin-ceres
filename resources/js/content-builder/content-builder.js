$.noConflict(); // enable save mode

const BACKEND_URL = 'http://master.login.plentymarkets.com'; // TODO: get backend url dynamically
const CELL_HEIGHT = 40; // gridstack cell height

var resizeTimer; // delay for recalculating gridstack dimensions on resize

// entry point
jQuery(document).ready(function()
{
    initCeresForGridstack();
});

// inject all shop-builder functions
function initCeresForGridstack()
{
    removeDefaultLinks();
    injectGridstackMarkup();
    addBackendEventListener();
    addWindowResizeListener();

    dispatchBuilderEvent({
        name: 'shopbuilder_ready',
        data: {}
    });
}

/**
 *
 * @param event
 */
function dispatchBuilderEvent(event)
{
    parent.postMessage(event, BACKEND_URL);
}

/**
 *
 * @param response
 */
function handleBuilderEventResponse(response)
{
    if(response.origin == BACKEND_URL)
    {
        var eventName = response.data.name;
        var eventData = response.data.data;

        switch(eventName)
        {
            case 'shopbuilder_widget_order':

                getWidgetOrder();
                break;

            case 'shopbuilder_reset':

                reloadView();
                break;

            case 'shopbuilder_drop':

                addContentWidget(eventData);
                break;

            case 'shopbuilder_zoom':

                zoomView(eventData.zoomFactor);
                break;

            default:

                console.log("Unknown event: " + eventName);
        }
    }
}

function getWidgetOrder()
{
    var data = {};

    jQuery('[data-builder-identifier]').each(function(i)
    {
        var key = jQuery(this).attr('data-gs-y');
        data[key] = jQuery(this).attr('data-builder-identifier');
    });

    dispatchBuilderEvent({
        name: 'shopbuilder_widget_order',
        data: data
    });
}

/**
 * Zoom view by a given factor
 * @param factor
 */
function zoomView(factor)
{
    jQuery('body').css('zoom', factor * 100 + '%');
    updateContainerDimensions();
}

function reloadView()
{
    window.location.reload(true);
}

/**
 *
 * @param element
 * @returns {number}
 */
function getRelativeElementHeight(element)
{
    return Math.round(jQuery(element).outerHeight(true) / CELL_HEIGHT);
}

function addWindowResizeListener()
{
    $(window).on('resize', function(e)
    {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function()
        {
            updateContainerDimensions();
        }, 100);

    });
}

function updateContainerDimensions()
{
    jQuery('[data-builder-container]').each(function()
    {
        jQuery(this).find('> *').each(function()
        {
            // TODO: @vwiebe fix gridstack scope
            jQuery('.grid-stack-0')
                    .data('gridstack')
                    .resize(jQuery(this),
                            1,
                            getRelativeElementHeight(jQuery(this).find('.grid-stack-item-content > *')));
        });
    });
}

/**
 * add context menu for hovered element
 * @param element
 */
function addContextMenu(element)
{
    // inject menu markup into given element
    jQuery(element).append('<div class="context-menu"></div>');

    // show context menu
    jQuery(element).mouseenter(function ()
    {
        jQuery(this).find('.context-menu').css('display','block');
    });

    // hide context menu
    jQuery(element).mouseleave(function ()
    {
        jQuery(this).find('.context-menu').css('display','none');
    });

    // add buttons
    addEditButton(element);
    addDeleteButton(element);
}

/**
 * add delete button element to context menu
 * @param element
 */
function addDeleteButton(element)
{
    // inject button markup into given context element
    jQuery(element).find('.context-menu').append('<div class="shopbuilder-icon delete-icon fa fa-trash"></div>');

    // delete widget container
    jQuery(element).find('.delete-icon').click(function ()
    {
        // todo: @vwiebe fix dropzone scope
        jQuery('.grid-stack-0').data('gridstack').removeWidget(jQuery(this).closest('.grid-stack-item'));
        
        var uniqueId = jQuery(this).closest(jQuery('[data-builder-identifier]')).attr('data-builder-identifier');

        dispatchBuilderEvent({
            name: 'shopbuilder_delete',
            data: { uniqueId: uniqueId }
        });
    });
}

/**
 * add edit button element for context menu
 * @param element
 */
function addEditButton(element)
{
    // inject button markup into given context element
    jQuery(element).find('.context-menu').append('<div class="shopbuilder-icon edit-icon fa fa-pencil"></div>');

    // open properties
    jQuery(element).find('.edit-icon').click(function ()
    {
        var uniqueId = jQuery(this).closest(jQuery('[data-builder-identifier]')).attr('data-builder-identifier');

        dispatchBuilderEvent({
            name: 'shopbuilder_open_properties',
            data: { uniqueId: uniqueId }
        });

    });
}

function addBackendEventListener()
{
    window.addEventListener('message', handleBuilderEventResponse, false);
}

/**
 * add new content element to iframe
 * @param element
 */
function addContentWidget(widgetData)
{
    var height = widgetData.defaultHeight;
    var markup = widgetData.htmlMarkup;
    var uniqueId = widgetData.uniqueId;

    // wrap element with gridstack containers
    var gridStackItem = jQuery(  '<div class="grid-stack-item" data-builder-identifier="' + uniqueId + '"' +
        '     data-gs-height="' + Math.round(height / CELL_HEIGHT) + '"><div class="grid-stack-item-content">' + markup + '</div>' +
        '</div>');

    setDragCursorToChildElements(gridStackItem);
    addContextMenu(gridStackItem);

    // scroll view to top
    $('html').animate({ scrollTop: 0 }, 'fast', function ()
    {
        // todo: @vwiebe fix dropzone scope
        jQuery('.grid-stack-0').data('gridstack').addWidget(gridStackItem);
        updateContainerDimensions();
    });
}

/**
 * set drag cursor on all element layers
 * @param element
 */
function setDragCursorToChildElements(element)
{
    // iterate over all child elements
    jQuery(element).find('*').each(function()
    {
        jQuery(this).css('cursor','move');
    });
}

function removeDefaultLinks()
{
    // iterate over all body elements
    jQuery('body').find('*').each(function()
    {
        jQuery(this).click(function (event)
        {
            // prevent default click action
            event.preventDefault();
        })
    });
}

function injectGridstackMarkup()
{
    // select drag & drop areas
    jQuery('[data-builder-container]').each(function(i)
    {
        jQuery(this).css('position', 'relative');

        // iterate over all sub-elements
        jQuery(this).find('> *').each(function(j)
        {
            // create gridstack item markup
            var gridStackItem = jQuery(  '<div class="grid-stack-item"' +
                '     data-gs-height="' + Math.round(jQuery(this).outerHeight(true) / CELL_HEIGHT) + '"><div class="grid-stack-item-content"></div>' +
                '</div>');

            // overwrite cursor for all contained elements
            setDragCursorToChildElements(jQuery(this));

            // add hover menu to container
            addContextMenu(gridStackItem);

            // wrap current element with gridstack item markup
            jQuery(this).wrap(gridStackItem);

            ++j;
        });

        // add gridstack container class for current drag & drop area
        jQuery(this).addClass('grid-stack-' + i);

        // initialize gridstack for current gridstack container
        initGridstack(i);

        ++i;
    });
}

/**
 * init function for gridstack
 * @param identifier
 */
function initGridstack(identifier)
{
    var options = {
        width: 1,
        cellHeight: 40,
        verticalMargin: 0,
        acceptWidgets: '.grid-stack-item'
    };

    var selector = '.grid-stack-' + identifier;
    jQuery(selector).gridstack(options);
}
