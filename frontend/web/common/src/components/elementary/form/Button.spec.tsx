import * as React from 'react';
import {Button} from './Button';
import {render} from '@testing-library/react';

describe('<Button/>', () => {
  it('should display button with text', () => {
    const wrapper = render(<Button>Text</Button>);
    const span = wrapper.queryByTestId('common-elementary-button-children');
    expect(span).toBeInTheDocument();
    expect(span).toBeVisible();
    expect(span?.innerHTML).toEqual('Text');
    const loader = wrapper.queryByTestId('common-elementary-button-loader');
    expect(loader).not.toBeVisible();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display button with loader', () => {
    const wrapper = render(<Button loading>Text</Button>);
    const span = wrapper.queryByTestId('common-elementary-button-children');
    expect(span).toBeInTheDocument();
    expect(span).not.toBeVisible();
    expect(span?.innerHTML).toEqual('Text');
    const loader = wrapper.queryByTestId('common-elementary-button-loader');
    expect(loader).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
});
