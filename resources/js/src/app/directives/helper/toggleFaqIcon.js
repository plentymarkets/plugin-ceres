Vue.directive("toggle-faq-icon",
    {
        bind(el, binding)
        {
            const oldIcon = binding.value.oldIcon;
            const newIcon = binding.value.newIcon;

            el.addEventListener("click", event =>
            {
                const parent = el.parentNode;
                const parentElements = parent.parentElement.querySelectorAll(".card");
                const iconElement = el.querySelector(".fa");

                // Return while animating
                if (parent.querySelector("div").classList.contains("collapsing"))
                {
                    return;
                }

                // reset all icons
                parentElements.forEach(singleParent =>
                {
                    const childElement = singleParent.querySelector(".fa");

                    childElement.classList.add(oldIcon);
                    childElement.classList.remove(newIcon);
                });

                // set icon on clicked element
                if (el.getAttribute("aria-expanded") === "true")
                {
                    iconElement.classList.add(oldIcon);
                    iconElement.classList.remove(newIcon);
                }
                else
                {
                    iconElement.classList.remove(oldIcon);
                    iconElement.classList.add(newIcon);
                }
            });
        }
    });
