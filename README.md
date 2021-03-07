# SwipeSelect demo

This is a Vue 3 app to demo SwipeSelect component. It uses [Swiper](https://swiperjs.com) internally.

## Project setup
```
npm install
```

### Run locally
```
npm run serve
```

### Run unit tests
```
npm run test:unit
```

## SwipeSelect API

This is a form field and it implements v-model. Use it to pass a value to SwipeSelect and retrieve the user input as well.

The component is aware of the previous value, which can be passed in via `previousValue` prop.

It accepts options similarly to a select input. Pass them via `slides` prop as an array of numbers or strings. The value and the label of the option are both derived from the same element.

The `name` prop will be passed as an attribute to HTML5 select, which remains visually hidden while being rendered in the DOM.

Labels can be displayed using `previousValueLabel` and `labelAfter` props.

Colors and font can be customized using CSS variables:

```
--swipe-select-active
--swipe-select-active-dark
--swipe-select-black
--swipe-select-white
--swipe-select-font-family
--swipe-select-font-size
```
