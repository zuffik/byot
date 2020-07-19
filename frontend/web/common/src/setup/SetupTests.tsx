import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import MutationObserver from '@sheerun/mutationobserver-shim';
import * as React from 'react';

window.MutationObserver = MutationObserver;

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Route: (props: any) => (
    <div data-testid="react-router-dom-route" data-path={props.path}>
      {!props.exact && props.children}
    </div>
  ),
  Redirect: (props: any) => <div data-testid="react-router-dom-redirect" />,
  Switch: (props: any) => <div data-testid="react-router-dom-switch">{props.children}</div>,
}));

jest.mock('@byot-frontend/web-common/src/components/router/UnauthorizedRouteBase', () => ({
  __esModule: true,
  UnauthorizedRouteBase: () => <div data-testid="unauthorized-route-base" />,
}));
jest.mock('@byot-frontend/web-common/src/components/router/AuthRouteBase', () => ({
  __esModule: true,
  AuthRouteBase: () => <div data-testid="auth-route-base" />,
}));
global.document.createRange = () =>
  ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    } as any,
  } as any);
