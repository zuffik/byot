import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {number, select, text} from '@storybook/addon-knobs';
import {Button} from '@byot-frontend/native-app/src/components/elements/button/Button';
import {TextField} from '@byot-frontend/native-app/src/components/elements/text-field/TextField';
import {Logo} from '@byot-frontend/native-app/src/components/elements/logo/Logo';

storiesOf('Elements', module)
  .add('Button', () => (
    <Button
      color={select(
        'Color',
        {
          'Basic': 'basic',
          'Primary': 'primary',
          'Success': 'success',
          'Info': 'info',
          'Warning': 'warning',
          'Danger': 'danger',
          'Control': 'control',
          'Gradient': 'gradient',
        },
        'basic'
      )}>
      {text('Text', 'Button')}
    </Button>
  ))
  .add('TextField', () => (
    <>
      <TextField placeholder={text('Placeholder', 'Placeholder')} />
      <TextField placeholder={text('Placeholder', 'Placeholder')} withHelperText />
      <TextField
        placeholder={text('Placeholder', 'Placeholder')}
        color="secondary"
        withHelperText={select(
          'Helper text color',
          {
            'Default': undefined,
            'Error': 'danger',
            'Success': 'success',
            'Info': 'info',
          },
          undefined
        )}
        helperText={text('Helper text', 'Helper text')}
      />
      <TextField placeholder={text('Placeholder', 'Placeholder')} color="secondary" />
    </>
  ))
  .add('Logo', () => <Logo size={number('Size', 100, {min: 1, max: 400, range: true})} />);
