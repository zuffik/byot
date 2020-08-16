import * as React from 'react';
import {render} from '@testing-library/react-native';
import {PlainLayoutNavigation} from './PlainLayoutNavigation';
import {Text, View} from 'react-native';

describe('<PlainLayoutNavigation/>', () => {
  it('should render', () => {
    const {asJSON} = render(
      <PlainLayoutNavigation navigatorComponent={View as any}>
        <Text>Text</Text>
      </PlainLayoutNavigation>
    );
    expect(asJSON()).toMatchSnapshot();
  });
});
