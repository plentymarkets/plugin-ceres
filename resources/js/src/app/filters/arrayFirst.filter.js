import Vue from "vue";

Vue.filter("arrayFirst", function(array)
{
    return array[0];
});
