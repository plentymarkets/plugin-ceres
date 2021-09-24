import Vue from "vue";

Vue.filter("variationOrderPropertyFilePath", (property, accessKey) =>
{
    const result = property?.fileUrl?.match(/orderPropertyFiles\/\d*\/\d*\//);

    if (result && result.length)
    {
        let path = result[0].replace("orderPropertyFiles/", "");

        path = path.split("/")
            .filter(str => str.length)
            .join("/");

        return `/order-property-file/confirmation/${path}/${property.value}/${accessKey}`;
    }

    return "";
});
