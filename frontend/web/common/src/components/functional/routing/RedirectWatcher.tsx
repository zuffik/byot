import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {WebState} from '../../../redux/WebState';

interface Props {}

export const RedirectWatcher: React.FC<Props> = (props: Props) => {
  const redirect = useSelector((state: WebState) => state.redirect);
  const history = useHistory();
  React.useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect]);
  return null;
};
