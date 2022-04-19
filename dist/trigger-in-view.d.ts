interface Props {
    rootEl: HTMLElement;
    targetElements: HTMLElement[];
    intersectionCallback: (entry: IntersectionObserverEntry) => void;
    triggerOncePerItem?: boolean;
    delay?: number;
}
export declare class ScrollIntoViewTrigger {
    #private;
    rootElement: HTMLElement;
    targetElements: HTMLElement[];
    intersectionCallback: (entry: IntersectionObserverEntry) => void;
    delay: number;
    scrollTimeout: number | undefined;
    intersectionObserver: IntersectionObserver;
    triggerOncePerItem: boolean;
    constructor(props: Props);
    check: () => void;
    destroy: () => void;
}
export default ScrollIntoViewTrigger;
