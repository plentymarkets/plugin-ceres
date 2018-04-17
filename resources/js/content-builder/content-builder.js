$.noConflict(); // enable save mode

const BACKEND_URL = 'http://master.login.plentymarkets.com'; // TODO: get backend url dynamically
const CELL_HEIGHT = 40; // gridstack cell height

var resizeTimer; // delay for recalculating gridstack dimensions on resize


var isDragging = false;
var draggedElement;
var isAnimating = false;

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
    addScrollOnDragListener();

    dispatchBuilderEvent({
        name: 'shopbuilder_ready',
        data: {}
    });
}

/**
 *
 * @param isLoading
 */
function showTerraLoadingOverlay(isLoading)
{
    dispatchBuilderEvent({
        name: isLoading ? 'shopbuilder_loading' : 'shopbuilder_loaded',
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

            case 'shopbuilder_close_properties':

                focusElement(null);
                break;

            case 'shopbuilder_widget_replace':

                replaceContentWidget(eventData);
                break;

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
    var data = [];

    jQuery('[data-builder-container]').each(function()
    {
        var widgets = [];

        var container = {
            identifier: jQuery(this).attr('data-builder-container'),
            widgets: widgets
        };

        jQuery(this).find('[data-builder-identifier]').each(function()
        {
            widgets[jQuery(this).attr('data-gs-y')] = jQuery(this).attr('data-builder-identifier')
        });

        data.push(container);
    });

    dispatchBuilderEvent({
        name: 'shopbuilder_widget_order',
        data: data
    });
}

/**
 * zoom view by a given factor
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

/**
 * very ugly prototype
 */
function addScrollOnDragListener()
{
    // TODO: @vwiebe fix gridstack scope
    jQuery('.grid-stack-container-1').mousemove(function (event)
    {
        updateScrollbarPosition();
    });
}

function updateScrollbarPosition()
{
    if (isDragging && draggedElement)
    {
        var scrollValue = 0;

        if (jQuery(window).height() + jQuery('body, html').scrollTop() < jQuery(draggedElement).offset().top + jQuery(draggedElement).outerHeight() && !isAnimating)
        {
            scrollValue = 100
        }

        if (jQuery('body, html').scrollTop() > jQuery(draggedElement).offset().top && !isAnimating)
        {
            scrollValue = -100;
        }

        if (scrollValue != 0)
        {
            isAnimating = true;
            jQuery('body, html').stop().animate(
                { scrollTop : jQuery('body, html').scrollTop() + scrollValue },
                300,
                'linear', function()
                {
                    isAnimating = false;
                    updateScrollbarPosition();
                });
        }
    }
}

function updateContainerDimensions()
{
    jQuery('[data-builder-container]').each(function()
    {
        var container = this;

        jQuery(this).find('> *').each(function()
        {
            jQuery(container)
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
    // addDesignButton(element);
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

    // add delete event to button
    jQuery(element).find('.delete-icon').click(function ()
    {
        var container = jQuery(this).closest(jQuery('[data-builder-container]')).attr('data-builder-container');
        var widgetId = jQuery(this).closest(jQuery('[data-builder-identifier]')).attr('data-builder-identifier');

        deleteContentWidget(container, widgetId);
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

        focusElement(uniqueId);

        dispatchBuilderEvent({
            name: 'shopbuilder_open_properties',
            data: { uniqueId: uniqueId }
        });

    });
}

/**
 * add design button element for context menu
 * @param element
 */
function addDesignButton(element)
{
    // inject button markup into given context element
    jQuery(element).find('.context-menu').append('<div class="shopbuilder-icon design-icon fa fa-paint-brush"></div>');

    // open properties
    jQuery(element).find('.design-icon').click(function ()
    {
        var uniqueId = jQuery(this).closest(jQuery('[data-builder-identifier]')).attr('data-builder-identifier');

        focusElement(uniqueId);

        dispatchBuilderEvent({
            name: 'shopbuilder_open_design',
            data: { uniqueId: uniqueId }
        });

    });
}

/**
 *
 * @param id
 */
function focusElement(id)
{
    jQuery('[data-builder-identifier]').each(function ()
    {
        if (!id)
        {
            jQuery(this).removeClass('active');
        }
        else
        {
            if (id && jQuery(this).attr('data-builder-identifier') == id)
            {
                jQuery(this).addClass('active');

                // activate nested widget containers
                jQuery(this).find('.nested-widget-container').each(function ()
                {
                    if (!jQuery(this).hasClass('set'))
                    {
                        jQuery(this).html('<div class="shopbuilder-icon add-icon fa fa-plus"></div>');
                        jQuery(this).html('<div class="shopbuilder-icon add-icon fa fa-plus"></div>');

                        jQuery(this).find('.add-icon').click(function ()
                        {
                            jQuery('.nested-widget-container').each(function ()
                            {
                                jQuery(this).removeClass('active');
                            });

                            jQuery(this).closest('.nested-widget-container').addClass('active');
                        });
                    }


                });
            }
            else
            {
                jQuery(this).removeClass('active');

                // deactivate nested widget containers
                jQuery(this).find('.nested-widget-container').each(function ()
                {
                    jQuery(this).removeClass('active');
                    jQuery(this).find('.add-icon').remove();
                });
            }
        }
    });
}

function addBackendEventListener()
{
    window.addEventListener('message', handleBuilderEventResponse, false);
}

/**
 * add new content element to iframe
 * @param widgetData
 * @param position
 */
function addContentWidget(widgetData, position)
{
    var isNestedContainerActive = jQuery('.nested-widget-container.active').length;

    if (isNestedContainerActive)
    {
        addNestedWidget(widgetData);
    }
    else
    {
        addGridstackWidget(widgetData, position);
    }
}

/**
 * add widged into structure element
 * @param widgetData
 */
function addNestedWidget(widgetData)
{
    var uniqueId = widgetData.uniqueId;
    var markup = widgetData.htmlMarkup;

    var widget = jQuery('<div class="nested-widget" data-builder-identifier="' + uniqueId + '">' + markup + '</div>');

    jQuery('.nested-widget-container.active').html(widget);
    jQuery('.nested-widget-container.active').addClass('set');

    addContextMenu(widget);
    focusElement(null);
}

/**
 * add widget as gridstack item
 * @param widgetData
 * @param position
 */
function addGridstackWidget(widgetData, position)
{
    var container = widgetData.dropzone;
    var height = widgetData.defaultHeight;
    var markup = widgetData.htmlMarkup;
    var uniqueId = widgetData.uniqueId;
    var posX = 0;
    var posY = 0;

    if (position)
    {
        if (position.x) posX = position.x;
        if (position.y) posY = position.y;
    }

    // wrap element with gridstack containers
    var gridStackItem = jQuery(  '<div class="grid-stack-item" data-builder-identifier="' + uniqueId + '"' +
        '     data-gs-height="' + Math.round(height / CELL_HEIGHT) + '"><div class="grid-stack-item-content">' + markup + '</div>' +
        '</div>');

    setDragCursorToChildElements(gridStackItem);
    addContextMenu(gridStackItem);

    // scroll view to top
    $('html').animate({ scrollTop: 0 }, 0, function ()
    {
        jQuery('[data-builder-container="' + container + '"]').data('gridstack').addWidget(gridStackItem, posX, posY);
    });
}

/**
 * delete content widget by id
 * @param widgetId
 * @param keepProperties
 */
function deleteContentWidget(container, widgetId, keepProperties)
{
    var gridStackItem = jQuery('body').find('[data-builder-identifier="' + widgetId + '"]').closest('.grid-stack-item');

    // TODO: @vwiebe fix dropzone scope
    jQuery('.grid-stack-container-1').data('gridstack').removeWidget(gridStackItem);

    if(!keepProperties)
    {
        dispatchBuilderEvent({
            name: 'shopbuilder_delete',
            data: { uniqueId: widgetId }
        });
    }
}

/**
 * replace content widget
 * @param widgetData
 */
function replaceContentWidget(widgetData)
{
    var id = widgetData.uniqueId;
    var element = jQuery('body').find('[data-builder-identifier="' + id + '"]');

    var position = {
        x: jQuery(element).attr('data-gs-x'),
        y: jQuery(element).attr('data-gs-y')
    };

    var container = jQuery(element).closest(jQuery('[data-builder-container]')).attr('data-builder-container');

    deleteContentWidget(container, id, true);
    addContentWidget(widgetData, position);
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
        if (jQuery(this).attr('data-builder-container') != 'shop-builder-header')
        {
            jQuery(this).css('position', 'relative');
        }

        // iterate over all sub-elements
        // jQuery(this).find('> *').each(function(j)
        // {
        //     // create gridstack item markup
        //     var gridStackItem = jQuery(  '<div class="grid-stack-item"' +
        //         '     data-gs-height="' + Math.round(jQuery(this).outerHeight(true) / CELL_HEIGHT) + '"><div class="grid-stack-item-content"></div>' +
        //         '</div>');
        //
        //     // overwrite cursor for all contained elements
        //     setDragCursorToChildElements(jQuery(this));
        //
        //     // add hover menu to container
        //     addContextMenu(gridStackItem);
        //
        //     // wrap current element with gridstack item markup
        //     jQuery(this).wrap(gridStackItem);
        //
        //     ++j;
        // });

        // add gridstack container class for current drag & drop area
        jQuery(this).addClass('grid-stack-container-' + i);

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
        cellHeight: CELL_HEIGHT,
        verticalMargin: 0
        // acceptWidgets: '.grid-stack-item'
    };

    var selector = '.grid-stack-container-' + identifier;

    jQuery(selector).gridstack(options);

    // init gridstack event listeners
    jQuery(selector).on('added', function(event, items)
    {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function()
        {
            updateContainerDimensions();
        }, 100);
    });

    jQuery(selector).on('dragstart', function(event, items)
    {
        draggedElement = items.helper[0];
        isDragging = true;
    });

    jQuery(selector).on('dragstop', function(event, items)
    {
        draggedElement = null;
        isDragging = false;
    });
}
