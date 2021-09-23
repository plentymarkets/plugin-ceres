import Vue from "vue";

Vue.filter("variationOrderPropertyFilePath", property =>
{
    let path = property?.fileUrl?.match(/orderPropertyFiles\/\d*\/\d*\//)[0];

    path = path.replace("orderPropertyFiles/", "");

    return `/order-property-file/confirmation/${path}?filename=${property.value}`;
});
