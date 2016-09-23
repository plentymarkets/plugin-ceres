Vue.filter( 'itemURL', function( item ) {

    var urlContent = item.itemDescription.urlContent.split("/");
    var i          = urlContent.length - 1;

    return "/" + urlContent[i] + "/" + item.itemBase.id + "/" + item.variationBase.id;

});