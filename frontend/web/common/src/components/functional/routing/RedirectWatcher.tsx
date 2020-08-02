import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {WebState} from '../../../redux/WebState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {RedirectClean} from '../../../redux/process/routing/RedirectClean';

interface Props {}

export const RedirectWatcher: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const redirect = useSelector((state: WebState) => state.redirect);
  const history = useHistory();
  React.useEffect(() => {
    if (redirect) {
      history.push(redirect);
      dispatch(ProcessActionExtractor.dispatch(RedirectClean, {}));
    }
  }, [redirect]);
  return null;
};
