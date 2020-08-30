import * as React from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {Logout} from '../../redux/process/auth/Logout';
import {LocalAuth} from '../../redux/process/auth/LocalAuth';
import user from '../../static/UserTest.json';
import {IUser} from '@byot-frontend/common/src/types/interfaces/IUser';

interface Props {}

export const testIDs = {
  clearStorage: 'testUtils-clearStorage',
  loginTestUser: 'testUtils-loginTestUser',
};

export const TestUtils: React.FC<Props> = (props: Props) => {
  if (process.env.TESTING != 'true') {
    return null;
  }
  const dispatch = useDispatch();
  const clearStorage = () => dispatch(ProcessActionExtractor.dispatch(Logout, {}));
  const login = () =>
    dispatch(
      ProcessActionExtractor.dispatch(LocalAuth, {
        auth: {
          token: process.env.TEST_BASIC_AUTH_HEADER as string,
          user: (user as unknown) as IUser,
        },
      })
    );
  return (
    <View style={{position: 'absolute', right: 0, top: 50, zIndex: 1000}}>
      <TouchableWithoutFeedback
        testID={testIDs.clearStorage}
        accessibilityLabel={testIDs.clearStorage}
        onPress={clearStorage}>
        <Text style={{fontSize: 2}}>clear storage</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        testID={testIDs.loginTestUser}
        accessibilityLabel={testIDs.loginTestUser}
        onPress={login}>
        <Text style={{fontSize: 2}}>login test user</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
