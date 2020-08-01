import * as React from 'react';
import {render} from '@testing-library/react';
import {AuthorizedRouterLayout} from './AuthorizedRouterLayout';

jest.mock('../pages/TrainingSetListPage', () => ({
  __esModule: true,
  TrainingSetListPage: () => <div />,
}));
jest.mock('../pages/LogoutPage', () => ({
  __esModule: true,
  LogoutPage: () => <div />,
}));

jest.mock('react-redux', () => ({
  __esModule: true,
  useSelector: jest.fn(() => []),
}));

describe('<AuthorizedRouterLayout/>', () => {
  it('should render', () => {
    const {container} = render(<AuthorizedRouterLayout />);
    expect(container).toMatchSnapshot();
  });
});
