import * as React from 'react';
import {BaseRouterLayout} from './BaseRouterLayout';
import {render, RenderResult} from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Route: (props: any) => (
    <div data-testid="test-landing-route" data-path={props.path}>
      {!props.exact && props.children}
    </div>
  ),
  Redirect: (props: any) => <div data-testid="test-landing-redirect" />,
  Switch: (props: any) => <div data-testid="test-landing-switch">{props.children}</div>,
}));

describe('BaseRouterLayout', function () {
  let component: RenderResult;

  beforeEach(() => (component = render(<BaseRouterLayout />)));

  it('should contain <Switch/> and <Route/> component', () => {
    const landingRoutes = [];
    landingRoutes.forEach(path => {
      expect(
        component.queryAllByTestId('test-landing-route').filter(e => e.dataset.path === path)
      ).toHaveLength(1);
    });
  });

  it('should match snapshot', () => expect(component.container).toMatchSnapshot());
});
