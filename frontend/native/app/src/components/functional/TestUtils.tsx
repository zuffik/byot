import * as React from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import Storage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {Logout} from '../../redux/process/auth/Logout';

interface Props {}

export const testIDs = {
  clearStorage: 'testUtils-clearStorage',
};

export const TestUtils: React.FC<Props> = (props: Props) => {
  if (process.env.TESTING != 'true') {
    return null;
  }
  const dispatch = useDispatch();
  const clearStorage = () => dispatch(ProcessActionExtractor.dispatch(Logout, {}));
  return (
    <View style={{position: 'absolute', right: 0, top: 50, zIndex: 1000}}>
      <TouchableWithoutFeedback
        testID={testIDs.clearStorage}
        accessibilityLabel={testIDs.clearStorage}
        onPress={clearStorage}>
        <Text>clear storage</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
