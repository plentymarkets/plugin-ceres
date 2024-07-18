import Vue from "vue";

Vue.filter("itemName", ({ texts:{ name1, name2, name3 }, variation:{ name, bundleType } }, selectedName = App.config.item.itemName, itemDisplayName = App.config.item.displayName) =>
{
    let itemName = "";

    if (selectedName === 1 && name2 !== "")
    {
        itemName = name2;
    }
    else if (selectedName === 2 && name3 !== "")
    {
        itemName = name3;
    }
    else
    {
        itemName = name1;
    }

    if (name && name.length)
    {
        let filterStrings = ['strecke', 'auslauf', 'colli', 'bestell', '\\[', '\\]'];
        let regex = new RegExp(filterStrings.join("|"), "i");

        if (regex.test(name))
            return itemName;

        itemName = `${itemName} ${name}`;
    }

    return itemName;
});
