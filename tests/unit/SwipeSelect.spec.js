import { shallowMount } from '@vue/test-utils'
import SwipeSelect from '@/components/SwipeSelect.vue'
import { toOption } from '@/utils/mappers';

describe('SwipeSelect.vue', () => {
  it('Renders the default snapshot', () => {
    const wrapper = shallowMount(SwipeSelect, {
      props: {
        modelValue: 'amount',
        previousValue: '45',
        slides: [36, 40, 45].map(toOption),
        name: 'amountPerMonth',
        labelAfter: '€/Month',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  })
})
