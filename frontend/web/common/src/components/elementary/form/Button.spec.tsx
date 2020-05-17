import * as React from 'react';
import {Button} from './Button';
import {Button as MuiButton, createMuiTheme, Theme} from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {Shallow} from '../../../test/CreateShallow';
import {createShallow} from '@material-ui/core/test-utils';

describe('<Button/>', () => {
  let shallow: Shallow;
  let theme: Theme;

  beforeEach(() => {
    theme = createMuiTheme();
    shallow = createShallow({});
  });

  it('should display button with text', () => {
    const wrapper = shallow(<Button>Text</Button>);
    const span = wrapper.find('[data-testid="common-elementary-button-children"]');
    expect(span.length).toEqual(1);
    expect(span.children().text()).toEqual('Text');
    const loader = wrapper.find('[data-testid="common-elementary-button-loader"]');
    expect(loader.length).toEqual(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display button with loader', () => {
    const wrapper = shallow(<Button loading>Text</Button>);
    const span = wrapper.find('[data-testid="common-elementary-button-children"]');
    expect(span.length).toEqual(1);
    expect(span.children().text()).toEqual('Text');
    const loader = wrapper.find('[data-testid="common-elementary-button-loader"]');
    expect(loader.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display primary button with contrast loader', () => {
    const color = 'primary';
    const wrapper = shallow(
      <Button loading color={color}>
        Text
      </Button>
    );
    const span = wrapper.find('[data-testid="common-elementary-button-children"]');
    expect(span.length).toEqual(1);
    expect(span.children().text()).toEqual('Text');
    const loader = wrapper.find('[data-testid="common-elementary-button-loader"]');
    expect(loader.length).toEqual(1);
    const muiButton = wrapper.find(MuiButton);
    expect(muiButton.prop('color')).toEqual(color);
    const scaleLoader = wrapper.find(ScaleLoader);
    expect(scaleLoader.prop('color')).toEqual(theme.palette.primary.contrastText);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display primary button with primary loader', () => {
    const color = 'primary';
    const wrapper = shallow(
      <Button loading variant="outlined" color={color}>
        Text
      </Button>
    );
    const span = wrapper.find('[data-testid="common-elementary-button-children"]');
    expect(span.length).toEqual(1);
    expect(span.children().text()).toEqual('Text');
    const loader = wrapper.find('[data-testid="common-elementary-button-loader"]');
    expect(loader.length).toEqual(1);
    const muiButton = wrapper.find(MuiButton);
    expect(muiButton.prop('color')).toEqual(color);
    const scaleLoader = wrapper.find(ScaleLoader);
    expect(scaleLoader.prop('color')).toEqual(theme.palette[color].main);
    expect(wrapper).toMatchSnapshot();
  });
});
