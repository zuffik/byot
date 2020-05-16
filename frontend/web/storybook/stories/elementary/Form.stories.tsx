import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {Input} from '@byot-frontend/web-common/src/components/elementary/form/Input';
import {Select} from '@byot-frontend/web-common/src/components/elementary/form/Select';
import {MenuItem} from '@material-ui/core';
import * as _ from 'lodash';
import {Checkbox} from '@byot-frontend/web-common/src/components/elementary/form/Checkbox';
import {colorVariants} from '../../helpers/ColorVariants';
import {Radio} from '@byot-frontend/web-common/src/components/elementary/form/Radio';
import {RadioGroup} from '@material-ui/core';
import {select as selectKnob} from '@storybook/addon-knobs';

export default {
  title: 'Elementary/Form',
};

export const input = () => <Input label="Label" onChange={action('onChange')} color={colorVariants()} />;

export const select = () => (
  <Select label="Label" onChange={action('onChange')} color={colorVariants()}>
    {_.times(10, i => (
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    ))}
  </Select>
);

export const checkbox = () => (
  <Checkbox label="Label" onChange={action('onChange')} color={colorVariants()} />
);

export const radio = () => (
  <RadioGroup
    name="whatever"
    onChange={action('onChange')}
    value={selectKnob(
      'Value',
      {
        'Label 1': 'radio1',
        'Label 2': 'radio2',
      },
      'radio1'
    )}
  >
    <Radio label="Label 1" value="radio1" color={colorVariants()} />
    <Radio label="Label 2" value="radio2" color={colorVariants()} />
  </RadioGroup>
);
