import Vue from "vue";

/**
 * @deprecated since version 4.2.0
 *
 * Will be deleted in version 5.0.0
 */
Vue.filter("attachText", function(item, text)
{
    console.warn("attachText is a deprecated vue filter!");
    return text + item;
});
