import { mount, flushPromises } from '@vue/test-utils'
import SwipeSelect from '@/components/SwipeSelect.vue'
import { Swiper } from 'swiper/vue';
import { toOption, last } from '@/utils';

describe('SwipeSelect.vue', () => {
  const props = {
    modelValue: 36,
    previousValue: 36,
    slides: [36, 40, 45].map(toOption),
    name: 'amountPerMonth',
    labelAfter: '€/Month',
    previousValueLabel: 'previous value label',
  };

  it('Renders the default snapshot', () => {
    const wrapper = mount(SwipeSelect, {
      props,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('In edit mode', () => {
    it('Renders the snapshot', async () => {
      const wrapper = mount(SwipeSelect, {
        props,
      });
      await flushPromises(); // initialize Swiper after mount
      await wrapper.trigger('click');

      expect(wrapper.element).toMatchSnapshot();
    });

    describe('Label before',  () => {
      it('Is rendered if previous value is selected', async () => {
        const wrapper = mount(SwipeSelect, {
          props,
        });
        await flushPromises(); // initialize Swiper after mount
        await wrapper.trigger('click');

        expect(wrapper.find('.swipe-select__label-before').text())
          .toBe(props.previousValueLabel);
      });

      it('Is not rendered if previous value is not selected', async () => {
        const wrapper = mount(SwipeSelect, {
          props: {
            ...props,
            previousValue: 40,
          },
        });
        await flushPromises(); // initialize Swiper after mount
        await wrapper.trigger('click');

        expect(wrapper.find('.swipe-select__label-before').exists()).toBe(false);
      });
    });

    describe('Slide change',() => {
      it('Emits update:modelValue event with payload', async () => {
        const wrapper = mount(SwipeSelect, {
          props,
        });
        const payload = {
          activeIndex: 2,
        };
        await flushPromises(); // initialize Swiper after mount
        await wrapper.findComponent(Swiper).vm.$emit('slideChange', payload);
        const emittedValue = wrapper.emitted()['update:modelValue'];

        expect(emittedValue).toBeTruthy();
        expect(last(emittedValue)[0]).toBe(45);
      });
    });
  });
})
