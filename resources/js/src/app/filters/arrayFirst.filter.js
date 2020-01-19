import Vue from "vue";

/**
 * @deprecated since version 4.2.0
 * Will be deleted in version 5.0.0
 */
Vue.filter("arrayFirst", function(array)
{
    console.warn("arrayFirst is a deprecated vue filter!");
    return array[0];
});
