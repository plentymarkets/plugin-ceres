const NotificationService = require("../../services/NotificationService");
const cloneDeep = require("lodash/cloneDeep");

export default function(store)
{
    let oldState = cloneDeep(store.state);

    store.subscribe((mutation, state) =>
    {
        const nextState = cloneDeep(state);
        const eventName = "on" + mutation.type.charAt(0).toUpperCase() + mutation.type.substr(1);
        const event = new CustomEvent(eventName, { detail: { payload: mutation.payload, newState: nextState, oldState } });

        document.dispatchEvent(event);
        document.dispatchEvent(
            new CustomEvent("storeChanged", { detail: { payload: mutation.payload, newState: nextState, oldState } })
        );

        NotificationService.log(eventName);
        oldState = nextState;
    });
}
