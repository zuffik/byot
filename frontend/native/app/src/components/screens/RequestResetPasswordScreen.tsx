import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RequestResetPasswordForm} from '../user/auth/RequestResetPasswordForm';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {RequestResetPassword} from '@byot-frontend/common/src/redux/process/auth/RequestResetPassword';
import {PlainLayoutBackButton} from '../navigation/PlainLayoutBackButton';
import {PlainLayoutBackButtonPortalOut} from '../navigation/PlainLayoutBackButtonPortal';

interface Props {}

export const RequestResetPasswordScreen: React.FC<Props> = (props: Props) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const onBackButtonPress = () => nav.goBack();
  const onSubmit = (email: string) =>
    dispatch(ProcessActionExtractor.dispatch(RequestResetPassword, {email}));
  React.useEffect(() => {
    return nav.addListener('blur', () => setFocus(false));
  }, []);
  React.useEffect(() => {
    return nav.addListener('focus', () => setFocus(true));
  }, []);
  return (
    <PlainLayoutInner>
      <PlainLayoutBackButtonPortalOut>
        <PlainLayoutBackButton visible={focus} onPress={onBackButtonPress} />
      </PlainLayoutBackButtonPortalOut>
      <RequestResetPasswordForm onSubmit={onSubmit} />
    </PlainLayoutInner>
  );
};
