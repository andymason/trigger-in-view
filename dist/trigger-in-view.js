export class ScrollIntoViewTrigger {
    rootElement;
    targetElements;
    intersectionCallback;
    delay;
    scrollTimeout;
    intersectionObserver;
    triggerOncePerItem;
    constructor(props) {
        this.rootElement = props.rootEl;
        this.targetElements = props.targetElements;
        this.intersectionCallback = props.intersectionCallback;
        this.delay = props.delay ?? 200;
        this.triggerOncePerItem = props.triggerOncePerItem ?? true;
        this.rootElement.addEventListener("scroll", this.#onScroll);
    }
    #checkIfAllItemsViewed() {
        if (this.triggerOncePerItem && this.targetElements.length === 0) {
            this.destroy();
        }
    }
    #checkIfElementInView = (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                this.intersectionCallback(entry);
                // Remove item from list if triggering only once
                if (this.triggerOncePerItem) {
                    this.targetElements = this.targetElements.filter((element) => element !== entry.target);
                }
            }
        }
        this.intersectionObserver.disconnect();
        this.#checkIfAllItemsViewed();
    };
    #onScroll = () => {
        // Debounce previous scroll events
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        // set timeout for image loading
        this.scrollTimeout = setTimeout(this.check, this.delay);
    };
    check = () => {
        this.intersectionObserver = new IntersectionObserver(this.#checkIfElementInView, { root: this.rootElement });
        for (const item of this.targetElements) {
            this.intersectionObserver.observe(item);
        }
    };
    destroy = () => {
        clearTimeout(this.scrollTimeout);
        this.rootElement.removeEventListener("scroll", this.#onScroll);
    };
}
