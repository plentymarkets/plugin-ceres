var widgetTemplates; // holds static markup for sidebar widgets

// entry point
$(document).ready(function()
{
    initCeresForGridstack();
});

// inject all shop-builder functions
function initCeresForGridstack()
{
    initWidgetTemplates();
    removeDefaultLinks();
    injectGridstackMarkup();
    addBackendEventListeners();
}

// get static markup for loaded sidebar widgets
function initWidgetTemplates()
{
    widgetTemplates = {
        'Image Slider': [$('#carousel-example').clone(), $('#carousel-example').height()],
        'Category Highlight': [$('#recommended-plugins').parent().parent().clone(), $('#recommended-plugins').parent().parent().height()]
    };
}

/**
 * add context menu for hovered element
 * @param element
 */
function addContextMenu(element)
{
    $(element).append('<div class="context-menu"></div>');

    // show context menu
    $(element).mouseenter(function ()
    {
        $(this).find('.context-menu').css('display','block');
    });

    // hide context menu
    $(element).mouseleave(function ()
    {
        $(this).find('.context-menu').css('display','none');
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
    // inject button markup into context menu
    $(element).find('.context-menu').append('<div class="shopbuilder-icon delete-icon fa fa-trash"></div>');

    // delete widget container
    $(element).find('.delete-icon').click(function ()
    {
        // todo: @vwiebe fix dropzone scope
        $('.grid-stack-0').data('gridstack').removeWidget($(this).closest('.grid-stack-item'));
    });
}

/**
 * add edit button element for context menu
 * @param element
 */
function addEditButton(element)
{
    // inject button markup into context menu
    $(element).find('.context-menu').append('<div class="shopbuilder-icon edit-icon fa fa-pencil"></div>');

    // open properties
    $(element).find('.edit-icon').click(function ()
    {
        // dummy data
        var propertiesObject = {
            widgetWidth: {
                controlType:"inputNumber",
                options:{
                    label:"Breite",
                    required:false
                }
            },
            widgetHeadline: {
                controlType:"inputText",
                options:{
                    label:"Header",
                    required:false
                }
            }
        };

        // trigger properties event
        var customEvent = new CustomEvent('CustomEvent');
        customEvent.initCustomEvent('shopbuilder_open_properties', true, true, propertiesObject);
        window.parent.window.dispatchEvent(customEvent);
        $('body').trigger('shopbuilder_open_properties', propertiesObject);
    });
}

function addBackendEventListeners()
{
    // drop element into iframe
    $('body').on('shopbuilder_drop', function(element)
    {
        addContentWidget(element.originalEvent.detail.identifier);
    });

    // reset iframe
    $('body').on('shopbuilder_reset', function()
    {
        $('body').html('');
        $('body').addClass('loading');

        window.location.reload(true);
    });

    // zoom iframe
    $('body').on('shopbuilder_zoom', function(event)
    {
        var value = event.originalEvent.detail.value;
        $('body').css('zoom', value * 100 + '%')
    })

    // open properties
    $('body').on('shopbuilder_open_properties', function(event, object)
    {
        console.log(object);
    });

    // test
    // $('.brand-wrapper').append('<button id="testEventButton">trigger event</button>');
    // $('#testEventButton').on('click', function ()
    // {
    //     $('body').trigger('shopbuilder_zoom', 0.5);
    // });
}

/**
 * add new content element to iframe
 * @param element
 */
function addContentWidget(element)
{
    // get element markup by element identifier
    var object = widgetTemplates[element][0];
    var height = widgetTemplates[element][1];

    // wrap element with gridstack containers
    var gridStackItem = $(  '<div class="grid-stack-item"' +
        '     data-gs-height="' + Math.round(height / 40) + '"><div class="grid-stack-item-content">' + $(object).html() + '</div>' +
        '</div>');

    setDragCursorToChildElements(gridStackItem);
    addContextMenu(gridStackItem);

    $('.grid-stack-0').data('gridstack').addWidget(gridStackItem);
}

/**
 * set drag cursor on all element layers
 * @param element
 */
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
            // prevent default click action
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
        $(this).find('> *').each(function(j)
        {
            // create gridstack item markup
            var gridStackItem = $(  '<div class="grid-stack-item"' +
                '     data-gs-height="' + Math.round($(this).height() / 40) + '"><div class="grid-stack-item-content"></div>' +
                '</div>');

            // overwrite cursor for all contained elements
            setDragCursorToChildElements($(this));

            // add hover menu to container
            addContextMenu(gridStackItem);

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
 * init function for gridstack
 * @param identifier
 */
function initGridstack(identifier)
{
    var options = {
        width:1,
        cellHeight: 40,
        verticalMargin: 0,
        acceptWidgets: '.grid-stack-item'
    };

    var selector = '.grid-stack-' + identifier;
    $(selector).gridstack(options);
}
