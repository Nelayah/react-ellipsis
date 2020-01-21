
import * as React from 'react';
import { mount } from 'enzyme';
import Ellipsis from '../lib';

const text =`The ellipsis is also called a suspension point, points of ellipsis, periods of ellipsis, or (colloquially) "dot-dot-dot".[2]

Depending on their context and placement in a sentence, ellipses can indicate an unfinished thought, a leading statement, a slight pause, an echoing voice, or a nervous or awkward silence. Aposiopesis is the use of an ellipsis to trail off into silence—for example: "But I thought he was …" When placed at the beginning or end of a sentence, the ellipsis can also inspire a feeling of melancholy or longing.

The most common form of an ellipsis is a row of three periods or full points (...) or a precomposed triple-dot glyph (…). The usage of the em dash (—) can overlap the usage of the ellipsis, especially in dialogue. Style guides often have their own rules governing the use of ellipses. For example, The Chicago Manual of Style (Chicago style) recommends that an ellipsis be formed by typing three periods, each with a space on both sides ( . . . ), while the Associated Press Stylebook (AP style) puts the dots together, but retains a space before and after the group.[3]

Whether an ellipsis at the end of a sentence needs a fourth dot to finish the sentence is a matter of debate; Chicago advises it,[4] as does the Publication Manual of the American Psychological Association (APA style),[5], while some other style guides do not;[citation needed] the Merriam-Webster Dictionary and related works treat this style as optional, saying that it "may" be used.[6] More commonly, a normal full stop (period) terminates the sentence, then a separate three-dot ellipsis is used to indicate one or more subsequent elided sentences before continuing a longer quotation. Business Insider magazine suggests this style,[7] and it is also used in many academic journals. Even the Associated Press Stylebook[8] – notably hostile to punctuation that journalists may consider optional and removable to save newsprint column width – favors this approach. It is consistent in intent if not exact form with the agreement among those in favor of a fused four-dot ellipsis that the first of them is a full stop terminating the sentence and the other three are the ellipsis.`;

describe('<Ellipsis />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Ellipsis exists', () => {
    const wrapper = mount(<Ellipsis text={text} lines={1} />);
    jest.runAllTimers();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe(text);
  });
})