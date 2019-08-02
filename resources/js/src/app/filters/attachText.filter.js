import Vue from "vue";

Vue.filter("attachText", function(item, text)
{
    return text + item;
});
