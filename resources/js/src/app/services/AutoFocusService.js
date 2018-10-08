import ModalService from "services/ModalService";

export function autoFocus()
{
    const modals = document.getElementsByClassName("modal");

    for (const modal in modals)
	{
        const currentModal = ModalService.findModal(modals[modal]);

        if (currentModal)
		{
            currentModal.on("shown.bs.modal", () =>
			{
                triggerAutoFocus(currentModal);
            });
        }
    }

    triggerAutoFocus();
}

export function triggerAutoFocus(modal)
{
    modal = modal || null;

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
        focusElements[0].focus();
    }, 0);
}

export default {autoFocus, triggerAutoFocus};
