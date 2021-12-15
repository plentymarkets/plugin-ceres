/**
 * Return a getter function to read json formatted data from a slot of the component.
 * This can be used to create a dynamic property for a vue component returning the parsed
 * json data from the given slot.
 * Once the data have been parsed, the result is stored on the vm options to avoid parsing the slot again.
 *
 * @param string slotKey The identifier of the slot to parse json data from
 */
export function getSlotData(slotKey)
{
    return (vm) =>
    {
        vm.$options.slotData = vm.$options.slotData || {};
        if (!vm.$options.slotData.hasOwnProperty(slotKey) && vm.$slots.hasOwnProperty(slotKey))
        {
            const slotNode = vm.$slots[slotKey][0];

            if (slotNode.elm)
            {
                vm.$options.slotData[slotKey] = JSON.parse(slotNode.elm.textContent);
            }
            else
            {
                vm.$options.slotData[slotKey] = JSON.parse(slotNode.text);
            }
        }

        return vm.$options.slotData[slotKey];
    };
}
