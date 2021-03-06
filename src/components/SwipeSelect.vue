<template>
  <div
      class="swipe-select"
      :class="{ 'swipe-select--disabled': !isEdited }"
      @click="onClick"
  >
    <label
        class="swipe-select__select"
        aria-hidden="true"
    >
      <select
          :name="name"
          autocomplete="off"
          :value="internalValue"
      >
        <option
            v-for="slide in slides"
            :key="slide.value"
            :value="slide.value"
            :selected="ifSelected(slide.value, true)"
            :data-selected-label="ifSelected(slide.value, previousValueLabel)"
        >
          {{ slide.label }}
        </option>
      </select>
      <span>{{ labelAfter }}</span>
    </label>
    <swiper
        class="swipe-select__swiper"
        role="listbox"
        aria-orientation="horizontal"
        :aria-disabled="!isEdited"

        :slides-per-view="5"
        :space-between="4"
        :breakpoints="{
          520: {
            slidesPerView: 7,
            spaceBetween: 10
          }
        }"
        freeMode
        freeModeSticky
        centeredSlides
        keyboard
        slideToClickedSlide
        grabCursor
        :initialSlide="initialSlideIndex"
        @slideChange="onSlideChange"
    >
      <div
          v-if="previousValue === modelValue && isEdited"
          class="swipe-select__label-before"
      >
        {{ previousValueLabel }}
      </div>
      <swiper-slide
          v-for="(slide, indexSlide) in slides"
          :key="slide.value"
          class="swipe-select__option"
          :data-index="indexSlide"
          :data-value="slide.value"
          :aria-selected="ifSelected(slide.value, true)"
          :aria-hidden="!isEdited && !ifSelected(slide.value, true)"
          role="option"
      >
        <transition name="fade">
          <div
              v-show="isEdited || ifSelected(slide.value, true)"
              class="swipe-select__option-value"
          >
            {{ slide.label }}
          </div>
        </transition>
      </swiper-slide>
      <div class="swipe-select__label-after">€/Month</div>
    </swiper>
    <button
        v-if="!isEdited"
        type="button"
        class="swipe-select__edit action-link"
    >
      Edit
    </button>
  </div>
</template>
<script>
import SwiperCore, {Keyboard} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/swiper.scss';

SwiperCore.use([Keyboard]);

export default {
  name: 'SwipeSelect',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    slides: {
      type: Array,
      default() {
        return [];
      },
    },
    name: String,
    labelAfter: String,
    modelValue: [String, Number],
    previousValue: [String, Number],
    previousValueLabel: {
      type: String,
      default: 'Current choice',
    }
  },
  emits: [
    'update:modelValue',
  ],
  data() {
    return {
      internalValue: this.modelValue,
      isEdited: true,
    };
  },
  mounted() {
    // Allows Swiper to be initialized before hiding it
    this.$nextTick(() => {
      this.isEdited = false;
    });
  },
  methods: {
    onClick() {
      this.isEdited = true;
    },
    onSlideChange(swiper) {
      const newValue = this.slides[swiper.activeIndex].value;

      this.internalValue = newValue;
      this.$emit('update:modelValue', newValue);
    },
    ifSelected(index, result) {
      return this.internalValue === index
          ? result
          : null;
    },
  },
  computed: {
    initialSlideIndex() {
      const defaultSlideIndex = 0;
      const slideIndex = this.slides
          .map(slide => slide.value)
          .indexOf(this.modelValue);

      return slideIndex > -1
          ? slideIndex
          : defaultSlideIndex;
    },
  },
  watch: {
    modelValue() {
      this.internalValue = this.modelValue;
    },
  },
};
</script>

<style scoped lang="scss">
.swipe-select {
  $ss-default-font: Montserrat, Helvetica, Arial, sans-serif;
  --ss-default-active: var(--swipe-select-active, #005e51);
  --ss-default-active-dark: var(--swipe-select-active-dark, #00817a);
  --ss-default-black: var(--swipe-select-black, #474747);
  --ss-default-white: var(--swipe-select-white, #fff);
  font-family: var(--swipe-select-font-family, #{$ss-default-font});
  font-size: var(--swipe-select-font-size, 16px);

  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--ss-default-black);

  &--disabled {
    cursor: pointer;
  }

  &:not(.swipe-select--disabled) {
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 25%;
      top: 0;
      bottom: 0;
      z-index: 3;
      pointer-events: none;
      max-width: 150px;
    }

    &::before {
      left: 0;
      background: linear-gradient(90deg, var(--ss-default-white), hsla(0, 0%, 100%, 0));
    }

    &::after {
      right: 0;
      background: linear-gradient(270deg, var(--ss-default-white), hsla(0, 0%, 100%, 0));
    }
  }

  &__select {
    display: none;
  }

  &__edit {
    font-size: .875em;
    text-transform: uppercase;
    position: absolute;
    bottom: 2px;
    right: 6px;
  }

  &__label-before,
  &__label-after {
    text-align: center;
  }

  &__label-before {
    color: var(--ss-default-active);
    position: absolute;
    top: 4px;
    font-size: .875em;
    width: 100%;
  }

  &__label-after {
    font-size: 1.2em;
    margin-top: calc(-45px + 1.2em);
    margin-bottom: 15px;

    .swipe-select--disabled & {
      text-align: left;
      margin: 0;
    }
  }

  &__swiper {
    .swipe-select--disabled & {
      pointer-events: none;
      box-shadow: 0 0 12px 0 #bbb;
      border-radius: 6px;
      border-left: 6px solid var(--ss-default-active-dark);
      padding: 6px 0 6px 12px;
    }

    .swiper-wrapper {
      .swipe-select--disabled:deep(&) {
        transform: none !important;
      }
    }
  }

  &__option {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75em;
    cursor: pointer;

    &.swiper-slide-prev,
    &.swiper-slide-next {
      font-size: 2em;
    }

    &[aria-selected=true] {
      font-size: 2.5em;
      color: var(--ss-default-active);
    }

    .swipe-select--disabled & {
      align-items: flex-start;
      justify-content: flex-start;
      height: auto;
      color: var(--ss-default-black);

      &:not([aria-selected=true]) {
        display: none;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.action-link {
  border: 0;
  border-radius: 0;
  background-color: transparent;
  padding: 4px 4px 4px 0;
  margin: 0;
  font-family: inherit;
  cursor: pointer;
  color: var(--ss-default-active-dark);
  outline-style: none;
}
</style>
