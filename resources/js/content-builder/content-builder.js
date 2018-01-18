$(document).ready(function()
{
    initCeresForGridstack();
    initGridstack();
});

function initCeresForGridstack()
{
    
}


function initGridstack()
{
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };
    $('.grid-stack').gridstack(options);
}