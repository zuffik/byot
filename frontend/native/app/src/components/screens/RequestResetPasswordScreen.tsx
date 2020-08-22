import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RequestResetPasswordForm} from '../user/auth/RequestResetPasswordForm';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {PlainLayoutBackButton} from '../navigation/PlainLayoutBackButton';
import {PlainLayoutBackButtonPortalOut} from '../navigation/PlainLayoutBackButtonPortal';
import {RequestResetPassword} from '../../redux/process/auth/RequestResetPassword';
import {NativeAppState} from '../../redux/NativeAppState';

interface Props {}

export const RequestResetPasswordScreen: React.FC<Props> = (props: Props) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const onBackButtonPress = () => nav.goBack();
  const onSubmit = (email: string) =>
    dispatch(ProcessActionExtractor.dispatch(RequestResetPassword, {email}));
  const loading = useSelector((state: NativeAppState) => state.is.requestingPasswordReset);
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
      <RequestResetPasswordForm loading={loading} onSubmit={onSubmit} />
    </PlainLayoutInner>
  );
};
