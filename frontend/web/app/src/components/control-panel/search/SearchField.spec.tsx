import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {SearchField} from './SearchField';

describe('<SearchField/>', () => {
  it('should render and trigger the event', () => {
    const onChange = jest.fn();
    const {container} = render(<SearchField onChange={onChange} value="" debounce={0} />);
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    fireEvent.change(input!, {target: {value: 'something'}});
    expect(onChange).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
