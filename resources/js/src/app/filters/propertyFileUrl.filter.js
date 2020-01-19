import Vue from "vue";

Vue.filter("propertyFileUrl", function(value)
{
    return App.propertyFileUrl + value;
});
