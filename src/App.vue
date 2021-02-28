<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>value: {{ amount }}</h1>
  <SwipeSelect
      v-model="amount"
      :previousValue="45"
      :slides="slides"
      name="amountPerMonth"
      labelAfter="€/Month"
  />
</template>

<script>
import SwipeSelect from './components/SwipeSelect.vue'

const toOption = (value) => ({
  value,
  label: `${value}`,
});

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

$active-color: #005e51;
$black: #474747;

#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #474747;
  margin-top: 60px;
}
</style>
