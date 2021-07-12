import Vue from "vue";

/**
 * https://stackoverflow.com/a/2117523
 * Math.random() is not optimal for uuid generation, but we cannot use crypto on the server.
 * This solution should suffice for our use case.
 */
function uuidv4()
{
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(char)
    {
        const random = Math.random() * 16 | 0;

        const value = char == "x" ? random : (random & 0x3 | 0x8);

        return value.toString(16);
    });
}

Vue.mixin({
    serverPrefetch()
    {
        this.uuid = uuidv4();
    },

    mounted()
    {
        this.uuid = this.uuid ? this.uuid : uuidv4();
    }
});
