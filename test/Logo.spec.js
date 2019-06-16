import { mount } from '@vue/test-utils';
// eslint-disable-next-line
import Logo from '@/components/Logo.vue';

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
