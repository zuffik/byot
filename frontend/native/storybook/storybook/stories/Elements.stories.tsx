import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {boolean, number, select, text} from '@storybook/addon-knobs';
import {TextField} from '@byot-frontend/native-app/src/components/elements/lib/TextField';
import {Logo} from '@byot-frontend/native-app/src/components/elements/logo/Logo';
import {Text, View} from 'react-native-ui-lib';
import {Button} from '@byot-frontend/native-app/src/components/elements/lib/Button';
import {action} from '@storybook/addon-actions';

storiesOf('Elements', module)
  .add('Text', () => <Text>{text('Text', 'Lorem ipsum dolor sit amet')}</Text>)
  .add('Button', () => (
    <Button
      label={text('Text', 'Button')}
      onPress={action('onPress')}
      loading={boolean('Loading', false)}
      variant={select(
        'Variant',
        {
          'Primary': 'primary',
          'Secondary': 'secondary',
        },
        'primary'
      )}
    />
  ))
  .add('TextField', () => (
    <>
      <View marginB-10>
        <TextField placeholder={text('Placeholder', 'Placeholder')} />
      </View>
      <View marginB-10>
        <TextField placeholder={text('Placeholder', 'Placeholder')} color="secondary" />
      </View>
      <View marginB-10>
        <TextField
          placeholder={text('Placeholder', 'Placeholder')}
          error={text('Error', 'Error text message')}
        />
      </View>
      <View marginB-10>
        <TextField
          placeholder={text('Placeholder', 'Placeholder')}
          success={text('Success', 'Success text message')}
        />
      </View>
      <TextField editable={false} placeholder={text('Placeholder', 'Placeholder')} />
    </>
  ))
  .add('Logo', () => <Logo size={number('Size', 100, {min: 1, max: 400, range: true})} />);
