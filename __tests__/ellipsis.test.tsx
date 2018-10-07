
import React from 'react';
import { mount } from 'enzyme';
import Ellipsis from '../lib';
import text from '../text';

describe('Ellipsis Render', () => {
  it('No props', () => {
    document.body.innerHTML = '<div id="mounter"></div>';

    const wrapper = mount(<Ellipsis>{text}</Ellipsis>, { attachTo: document.getElementById('mounter') });
    expect(wrapper.instance().ellipsis.ellipsisNode).toBe(null);})
})