$(document).ready(function()
{
    initGridstack();
});


function initGridstack()
{
    var options = {
        cellHeight: 80,
        verticalMargin: 10
    };
    $('.grid-stack').gridstack(options);
}