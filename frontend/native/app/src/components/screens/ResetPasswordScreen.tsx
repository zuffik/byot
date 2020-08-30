import * as React from 'react';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {PlainLayoutInner} from '../plain-layout/PlainLayoutInner';
import {useDispatch, useSelector} from 'react-redux';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {NativeAppState} from '../../redux/NativeAppState';
import {ResetPasswordForm} from '../user/auth/ResetPasswordForm';
import {SubmitResetPassword} from '../../redux/process/auth/SubmitResetPassword';
import {IResetPassword} from '@byot-frontend/common/src/types/interfaces/IResetPassword';
import {Screens} from '../../navigation/Screens';

interface Props {}

export const ResetPasswordScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const params: typeof Screens.PasswordReset.Params = useNavigationState(
    s => s.routes[s.index].params
  ) as typeof Screens.PasswordReset.Params;
  React.useEffect(() => {
    if (typeof params.token == 'undefined') {
      nav.reset({
        index: 0,
        routes: [
          {
            name: Screens.Login.Name,
          },
        ],
      });
    }
  }, []);
  const loading = useSelector((state: NativeAppState) => state.is.resettingPassword);
  const onSubmit = (values: IResetPassword) =>
    dispatch(ProcessActionExtractor.dispatch(SubmitResetPassword, values));
  return (
    <PlainLayoutInner>
      <ResetPasswordForm loading={loading} onSubmit={onSubmit} token={params?.token as string} />
    </PlainLayoutInner>
  );
};
