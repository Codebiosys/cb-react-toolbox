import React from 'react';
import { shallow } from 'enzyme';
import FileUploadField from './FileUploadField';

const componentProps = {
};

describe('The File Upload Field', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FileUploadField {...componentProps} />,
    );
  });
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
