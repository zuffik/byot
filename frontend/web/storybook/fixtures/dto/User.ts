import {IUser} from '@byot-frontend/common/src/types/interfaces/IUser';
import {User} from '@byot-frontend/common/src/types/dto/User';
import {mocker} from '../../helpers/Mocker';
import {dateTime} from './DateTime';
import {Role} from '../../../../../common/graphql/ts/types';

export const user = (): IUser => {
  const firstName = mocker.first();
  const lastName = mocker.last();
  return new User({
    id: mocker.guid(),
    createdAt: dateTime(),
    updatedAt: dateTime(),
    email: mocker.email(),
    emailValidated: mocker.bool({likelihood: 90}),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    lastLogin: mocker.bool({likelihood: 90}) && dateTime(),
    role: mocker.bool({likelihood: 90}) ? Role.USER : Role.ADMIN,
    userName: mocker.twitter().slice(1),
  });
};
