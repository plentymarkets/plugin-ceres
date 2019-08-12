/**
 * @deprecated since version 4.2.0
 *
 * Will be deleted in version 4.3.0
 */
Vue.filter("attachText", function(item, text)
{
    console.warn("attachText is a depricated vue filter!");
    return text + item;
});
