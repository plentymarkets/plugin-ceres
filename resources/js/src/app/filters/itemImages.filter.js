Vue.filter("itemImages", function(images, accessor)
{
    var imageUrls = [];
    var imagesAccessor = "all";

    if (images.variation.length)
    {
        imagesAccessor = "variation";
    }

    for (var i in images[imagesAccessor])
    {
        var imageUrl = images[imagesAccessor][i][accessor];

        imageUrls.push(imageUrl);
    }

    return imageUrls;
});
