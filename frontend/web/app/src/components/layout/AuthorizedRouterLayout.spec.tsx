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
jest.mock('../pages/TrainingSetCreatePage', () => ({
  __esModule: true,
  TrainingSetCreatePage: () => <div />,
}));
jest.mock('../pages/TrainingSetEditPage', () => ({
  __esModule: true,
  TrainingSetEditPage: () => <div />,
}));
jest.mock('../pages/TrainingSetDetailPage', () => ({
  __esModule: true,
  TrainingSetDetailPage: () => <div />,
}));
jest.mock('../pages/TrainingCreatePage', () => ({
  __esModule: true,
  TrainingCreatePage: () => <div />,
}));
jest.mock('../pages/TrainingEditPage', () => ({
  __esModule: true,
  TrainingEditPage: () => <div />,
}));
jest.mock('../pages/TrainingDetailPage', () => ({
  __esModule: true,
  TrainingDetailPage: () => <div />,
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
