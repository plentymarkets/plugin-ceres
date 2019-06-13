/* !
 * A polyfill for object-fit
 *
 * @author: Toni Pinel
 *
 */

const copyComputedStyle = (from, to) =>
{
    let computedStyleObject = false;

    // trying to figure out which style object we need to use depense on the browser support
    // so we try until we have one
    computedStyleObject = from.currentStyle || document.defaultView.getComputedStyle(from, null);

    // if the browser dose not support both methods we will return null
    if (!computedStyleObject)
    {
        return;
    }

    const stylePropertyValid = value =>
    {
        // checking that the value is not a undefined
        return typeof value !== "undefined" &&
               typeof value !== "object" &&
               typeof value !== "function" &&
               value.length > 0 &&
               value !== parseInt(value);
    };

    // we iterating the computed style object and compy the style props and the values
    for (const property in computedStyleObject)
    {
        // checking if the property and value we get are valid sinse browser have different implementations
        if (stylePropertyValid(computedStyleObject[property]))
        {
            // applying the style property to the target element
            to.style[property] = computedStyleObject[property];
        }
    }
};

const createDiv = (el, binding) =>
{
    const replacementDiv = document.createElement("div");

    copyComputedStyle(el, replacementDiv);

    replacementDiv.style.display = "block";
    replacementDiv.style.backgroundImage = `url( ${el.src} )`;
    replacementDiv.style.backgroundPosition = "center center";
    replacementDiv.style.className = el.className;
    replacementDiv.style.backgroundRepeat = "no-repeat";

    switch (binding.value)
    {
    case "cover":
        replacementDiv.style.backgroundSize = "cover";
        break;
    case "contain":
        replacementDiv.style.backgroundSize = "contain";
        break;
    case "fill":
        replacementDiv.style.backgroundSize = "100% 100%";
        break;
    case "none":
        replacementDiv.style.backgroundSize = "auto";
        break;
    default:
        console.log("no object-fit");
    }
    el.parentNode.replaceChild(replacementDiv, el);
};

Vue.directive("ie-objectfit-polyfill", {
    inserted(el, binding)
    {
        if (document.documentElement.classList.contains("ie"))
        {
            if (document.readyState === "complete" || document.readyState === "loaded")
            {
                createDiv(el, binding);
            }
            else
            {
                document.addEventListener("DOMContentLoaded", () =>
                {
                    createDiv(el, binding);
                });
            }
        }
    }
});
