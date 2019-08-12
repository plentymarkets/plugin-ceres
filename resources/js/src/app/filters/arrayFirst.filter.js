/**
 * @deprecated since version 4.2.0
 * Will be deleted in version 4.3.0
 */
Vue.filter("arrayFirst", function(array)
{
    console.warn("arrayFirst is a depricated vue filter!");
    return array[0];
});
