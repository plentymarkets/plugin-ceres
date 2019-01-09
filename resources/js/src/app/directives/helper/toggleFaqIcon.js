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
                    const elm = singleParent.querySelectorAll(".fa")[0];

                    elm.classList.add(oldIcon);
                    elm.classList.remove(newIcon);
                });

                // set clicked icon
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
