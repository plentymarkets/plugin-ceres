Vue.filter("itemName", function(item, selectedName)
{
    if (selectedName == 0 && item.name1 !== "")
    {
        return item.name1;
    }
    else if (selectedName == 1 && item.name2 !== "")
    {
        return item.name2;
    }
    else if (selectedName == 2 && item.name3 !== "")
    {
        return item.name3;
    }

    return item.name1;
});
