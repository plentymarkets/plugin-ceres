import ModalService from "services/ModalService";

export function autoFocus()
{
    for (const modal of document.getElementsByClassName("modal"))
    {
        if (typeof modal === "object")
        {
            const currentModal = ModalService.findModal(modal);

            if (currentModal)
            {
                currentModal.on("shown.bs.modal", () =>
                {
                    triggerAutoFocus(currentModal);
                });
            }
        }
    }

    triggerAutoFocus();
}

export function triggerAutoFocus(modal)
{
    let focusElements;

    if (modal)
    {
        focusElements = modal.getModalContainer()[0].querySelectorAll("[data-autofocus]");
    }
    else
    {
        focusElements = document.querySelectorAll("[data-autofocus]");
    }

    setTimeout(() =>
    {
        if (focusElements[0]) focusElements[0].focus();
    }, 0);
}

export default { autoFocus, triggerAutoFocus };
