<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>Amount: {{ amount }}</h1>
  <SwipeSelect
      class="amount-swipe"
      v-model="amount"
      :previousValue="45"
      :slides="slides"
      name="amountPerMonth"
      labelAfter="€/Month"
  />
</template>

<script>
import SwipeSelect from './components/SwipeSelect.vue';
import { toOption } from './utils';

export default {
  name: 'App',
  components: {
    SwipeSelect
  },
  data() {
    return {
      amount: 45,
      slides: [36, 40, 45, 50, 55, 60, 70, 75, 80, 434].map(toOption),
    };
  },
}
</script>

<style lang="scss">
@import url("http://fonts.googleapis.com/css?family=Montserrat:700");

$font-family: Montserrat, Helvetica, Arial, sans-serif;
$font-size: 16px;
$active: #005e51;
$active-dark: #00817a;
$black: #474747;
$white: #fff;

#app {
  font-family: $font-family;
  color: $black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.amount-swipe {
  --swipe-select-active: #{$active};
  --swipe-select-active-dark: #{$active-dark};
  --swipe-select-black: #{$black};
  --swipe-select-white: #{$white};
  --swipe-select-font-family: #{$font-family};
  --swipe-select-font-size: #{$font-size};
}
</style>
