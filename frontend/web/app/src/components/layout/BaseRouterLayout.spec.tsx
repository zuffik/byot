import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { BaseRouterLayout } from './BaseRouterLayout';
import { Switch, Route } from 'react-router-dom';
import toJson from 'enzyme-to-json';

describe('BaseRouterLayout', function () {
  let component: ShallowWrapper;

  beforeEach(() => (component = shallow(<BaseRouterLayout />)));

  it('should contain <Switch/> and <Route/> component', () => {
    expect(component.find(Switch)).toHaveLength(1);
    expect(component.find(Switch).find(Route)).toHaveLength(0);
  });

  it('should match snapshot', () =>
    expect(toJson(component)).toMatchSnapshot());
});
