import * as React from 'react';
import {BaseRouterLayout} from './BaseRouterLayout';
import {render, RenderResult} from '@testing-library/react';

jest.mock('./UnauthorizedRouterLayout', () => ({
  __esModule: true,
  UnauthorizedRouterLayout: () => <div />,
}));
jest.mock('./AuthorizedRouterLayout', () => ({
  __esModule: true,
  AuthorizedRouterLayout: () => <div />,
}));

describe('BaseRouterLayout', function () {
  let component: RenderResult;

  beforeEach(() => (component = render(<BaseRouterLayout />)));

  it('should render', () => expect(component.container).toMatchSnapshot());

  afterEach(() => jest.clearAllMocks());
});
