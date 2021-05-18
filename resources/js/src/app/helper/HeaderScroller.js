export default class HeaderScroller
{
    constructor(headerParent = null, appName = "vue-app")
    {
        this._headerParent = headerParent;
        this.appName = appName;

        this.headerLoaded = false;
        this.allHeaderChildrenHeights = [];
        this.headerHeight = 0;
        this.timeout = null;

        this.checkForHeaderImages();
    }

    get headerParent()
    {
        if (this._headerParent)
        {
            return this._headerParent;
        }

        this._headerParent = this._headerParent.offsetParent ? this._headerParent : document.querySelector("[data-header-offset]");
        return this._headerParent;
    }

    checkForHeaderImages()
    {
        const headerImages = this.headerParent.querySelectorAll("img");

        Promise.all(
            Array.prototype.slice.call(headerImages).map(headerImage =>
            {
                return new Promise((resolve) =>
                {
                    if (headerImage.complete)
                    {
                        resolve();
                    }
                    else
                    {
                        headerImage.onload = () => resolve();
                        headerImage.onerror = () => resolve();
                    }
                });
            })
        ).then(() =>
        {
            // Initialize
            this.headerLoaded = true;
            this.getHeaderHeights();
            this.calculateBodyOffset();
            this.scrollHeaderElements();
        });
    }

    // Collect heights of header elements for later use
    getHeaderHeights()
    {
        this.allHeaderChildrenHeights = [];
        this.headerHeight = 0;

        for (let i = 0; i < this.headerParent.children.length; i++)
        {
            const elementHeight = this.headerParent.children[i].getBoundingClientRect().height;

            this.allHeaderChildrenHeights.push(elementHeight);
            this.headerHeight += elementHeight;
        }
    }

    // Calculate top offset for vue-app node because header is not part of document flow
    calculateBodyOffset()
    {
        if (this.headerLoaded && this.headerParent)
        {
            const app = document.getElementById(this.appName);

            app.style.marginTop = this.headerHeight + "px";
            app.style.minHeight = "calc(100vh - " + this.headerHeight + "px)";
        }
    }

    // Set descending z-index for all header elements and create list of elements with unfixed class for later use
    prepareHeaderElements()
    {
        if (this.headerLoaded && !App.isShopBuilder)
        {
            let zIndex = 100;

            for (let i = 0; i < this.headerParent.children.length; i++)
            {
                const elem = this.headerParent.children[i];

                elem.style.zIndex = zIndex;
                zIndex--;
            }
        }
    }

    // Scroll header elements depending on if they are unfixed or not
    scrollHeaderElements()
    {
        if (this.headerLoaded && !App.isShopBuilder)
        {
            let absolutePos = 0;

            let fixedElementsHeight = 0;

            let offset = 0;

            const scrollTop = window.pageYOffset;

            for (let i = 0; i < this.headerParent.children.length; i++)
            {
                const elem = this.headerParent.children[i];
                const elemHeight = this.allHeaderChildrenHeights[i];

                offset = absolutePos - scrollTop;
                elem.style.position = "absolute";

                // Element is unfixed and should scroll indefinetly
                if (elem.classList.contains("unfixed"))
                {
                    elem.style.top = offset + "px";
                }
                // Element is fixed and should scroll until it hits top of header or next fixed element
                else
                {
                    if (offset < 0)
                    {
                        elem.style.top = 0;
                    }
                    else
                    {
                        elem.style.top = offset + "px";
                    }

                    if (fixedElementsHeight > 0 && offset < fixedElementsHeight)
                    {
                        elem.style.top = fixedElementsHeight + "px";
                    }

                    fixedElementsHeight = fixedElementsHeight + elemHeight;
                }
                absolutePos = absolutePos + elemHeight;
            }
        }
    }

    scrollWithAnimationFrame()
    {
        if (this.timeout)
        {
            window.cancelAnimationFrame(this.timeout);
        }

        this.timeout = window.requestAnimationFrame(
            this.scrollHeaderElements.bind(this)
        );
    }

    move(getHeaderHeights, scrollHeaderElements, prepareHeaderElements)
    {
        this.calculateBodyOffset();

        if (getHeaderHeights)
        {
            this.getHeaderHeights();
        }

        if (prepareHeaderElements)
        {
            this.prepareHeaderElements();
        }

        if (scrollHeaderElements)
        {
            this.scrollHeaderElements();
        }
    }
}
