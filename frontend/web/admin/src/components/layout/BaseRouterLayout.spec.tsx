import * as React from 'react';
import {BaseRouterLayout} from './BaseRouterLayout';
import {render, RenderResult} from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Route: (props: any) => (
    <div data-testid="test-admin-route" data-path={props.path}>
      {!props.exact && props.children}
    </div>
  ),
  Redirect: (props: any) => <div data-testid="test-admin-redirect" />,
  Switch: (props: any) => <div data-testid="test-admin-switch">{props.children}</div>,
}));

describe('BaseRouterLayout', function () {
  let component: RenderResult;

  beforeEach(() => (component = render(<BaseRouterLayout />)));

  it('should contain <Switch/> and <Route/> component', () => {
    const adminRoutes = [];
    adminRoutes.forEach(path => {
      expect(
        component.queryAllByTestId('test-admin-route').filter(e => e.dataset.path === path)
      ).toHaveLength(1);
    });
  });

  it('should match snapshot', () => expect(component.container).toMatchSnapshot());
});
