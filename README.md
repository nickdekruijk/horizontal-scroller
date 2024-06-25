# Horizontal Scroller

Make a horizontal scrolling html element better by making it draggable and adding left/right buttons.

## Usage

First make an element that is already nativly scrolling horizontaly, for left/right buttons to position properly you might need to wrap it in a relative positioned element for example:

```html
<div class="relative">
    <div class="horizontal-scroller">
        <ul class="items">
            <li class="item">Item A</li>
            <li class="item">Item B</li>
            <li class="item">Item C</li>
            <li class="item">Item D</li>
            <li class="item">Item E</li>
            <li class="item">Item F</li>
            <li class="item">Item G</li>
            <li class="item">Item H</li>
            <li class="item">Item I</li>
            <li class="item">Item J</li>
        </ul>
    </div>
</div>
```

css:

```css
.relative {
    position: relative;
}
.horizontal-scroller {
    overflow-x: auto;
    overflow-y: hidden;
}
.items {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 40px;
}
.item {
    flex: 0 0 200px;
    padding: 5%;
    background-color: #ddd;
}
```

Then make it better by adding this javascript (these options are the default so you could just skip them all if needed):

```javascript
<script src="horizontal-scroller.js"></script>
<script>
    new HorizontalScroller({
        selector: ".horizontal-scroller",
        buttonRight: true,
        buttonLeft: true,
        draggable: true,
    });
</script>
```

This will add two buttons that you can style yourself, for example:

```css
.horizontal-scroller-button {
    position: absolute;
    display: block;
    height: 50px;
    width: 50px;
    top: 50%;
    transform: translateY(-50%);
}
.horizontal-scroller-button-left {
    left: 0:
}
.horizontal-scroller-button-right {
    right: 0:
}
```
See `demo.html` for a full working demo.
