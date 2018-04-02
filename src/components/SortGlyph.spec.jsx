import React from 'react';
import { shallow } from 'enzyme';

import SortGlyph from './SortGlyph';

const changeSortOrder = jest.fn();
const reverseSortOrder = jest.fn();

const componentProps = {
  field: 'test',
  orderBy: 'notTest',
  type: 'alphabet',
  reverse: false,
  changeSortOrder,
  reverseSortOrder,
};


describe('The Sort Glyph', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SortGlyph {...componentProps} />,
    );
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('supports alternative sort glyphs', () => {
    const altProps = { ...componentProps, type: 'test' };
    const altWrapper = shallow(
      <SortGlyph {...altProps} />,
    );
    expect(altWrapper.prop('glyph')).toEqual(`sort-by-${altProps.type}`);
  });

  it('Highlights the glyph when the orderBy matches the field', () => {
    const matchingProps = { ...componentProps, orderBy: 'test' };
    const matchedwrapper = shallow(
      <SortGlyph {...matchingProps} />,
    );
    expect(matchedwrapper.prop('className')).toEqual('text-success');
  });

  it('Displays the alt glyph when the orderBy matches the field and reverse is true', () => {
    const reversedProps = { ...componentProps, orderBy: 'test', reverse: true };
    const reversedWrapper = shallow(
      <SortGlyph {...reversedProps} />,
    );
    expect(reversedWrapper.prop('glyph')).toEqual(`sort-by-${reversedProps.type}-alt`);
  });
  it('Orders the data when the sort button is pressed', () => {
    wrapper.simulate('click');
    expect(changeSortOrder).toHaveBeenCalledTimes(1);
    expect(reverseSortOrder).toHaveBeenCalledTimes(0);
  });

  it('Reverse orders the data when the sort button is pressed for the current sort', () => {
    const matchingProps = { ...componentProps, orderBy: 'test' };
    const matchedwrapper = shallow(
      <SortGlyph {...matchingProps} />,
    );
    matchedwrapper.simulate('click');
    expect(changeSortOrder).toHaveBeenCalledTimes(0);
    expect(reverseSortOrder).toHaveBeenCalledTimes(1);
  });
});
