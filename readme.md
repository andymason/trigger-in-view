# Trigger in View

Utility helper to trigger callback when HTML elements are in view.

## Install

Via npm...

```bash
npm install @andrew-mason/trigger-in-view --save
```

...or download the JavaScript file from the `dist` folder.

## Usage

```JavaScript
import TriggerInView from "@andrew-mason/trigger-in-view";

const triggerInView = new TriggerInView({
  // Root DOM element (required)
  rootElement: containerEl,

  // Target elements to trigger on when in view (required)
  targetElements: childElements,

  // Callback function to trigger when target is in view (required)
  intersectionCallback: myCallback,

  // Option to trigger each target element only once (optional)
  triggerOncePerItem: true,

  // Delay between trigger events. Default = 200 (optional)
  delay: 400
 });

 // Manually trigger check of current in-view target elements
 triggerInView.check();

 // Remove all event listeners and intersection observers
 trigger.destroy();
```

## Example

"Lazy load" images when they scroll into view by using image path stored in the
element's `data` attribute;

```HTML
<div id="my-container">
  <img src="" data-src="image-1.jpg" class="item" />
  <img src="" data-src="image-2.jpg" class="item" />
  <img src="" data-src="image-3.jpg" class="item" />
</div>

```

```JavaScript
import TriggerInView from "@andrew-mason/trigger-in-view";

const containerElement = document.querySelector("#my-container");
const childElements = containerElement.querySelectorAll(".item");
const myInViewFunction = (entry) => {
  const { target } = entry;
  target.setAttribute("src", target.dataset["src"]);
}

const triggerInView = new TriggerInView({
  rootEl: containerElement,
  targetElements: childElements,
  intersectionCallback: myInViewFunction,
});

triggerInView.check();
```

## License

MIT
