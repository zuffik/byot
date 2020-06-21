import * as React from 'react';
import {BaseRouterLayout} from './BaseRouterLayout';
import {render, RenderResult} from '@testing-library/react';
import {Router} from '../../router/Router';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Route: (props: any) => (
    <div data-testid="test-app-route" data-path={props.path}>
      {!props.exact && props.children}
    </div>
  ),
  Redirect: (props: any) => <div data-testid="test-app-redirect" />,
  Switch: (props: any) => <div data-testid="test-app-switch">{props.children}</div>,
}));

describe('BaseRouterLayout', function () {
  let component: RenderResult;

  beforeEach(() => (component = render(<BaseRouterLayout />)));

  it('should contain <Switch/> and <Route/> component', () => {
    const appRoutes = [Router.login.URI(), Router.register.URI(), Router.resetPassword.URI()];
    appRoutes.forEach(path => {
      expect(component.queryAllByTestId('test-app-route').filter(e => e.dataset.path === path)).toHaveLength(
        1
      );
    });
  });

  it('should match snapshot', () => expect(component.container).toMatchSnapshot());
});
