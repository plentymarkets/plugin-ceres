import Vue from "vue";

Vue.filter("decodeHtmlEntities", function(str)
{
    return str.replace(/&#([0-9]{1,4});/g, function(match, numString) {
        return String.fromCharCode(numString);
    });
});