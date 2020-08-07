import {login, LoginCommand} from '../flow/Login';
import {getByTestId, GetByTestIdCommand} from '../selectors/GetByTestId';
import {findByTestId, FindByTestIdCommand} from '../selectors/FindByTestId';
import {CmdPack} from '../../Types';
import {createTrainingSet, CreateTrainingSetCommand} from '../flow/CreateTrainingSet';
import {graphQLRequest, GraphQLRequestCommand} from '../mock/GraphQLRequest';

export interface AddCommands {
  login: LoginCommand;
  getByTestId: GetByTestIdCommand;
  findByTestId: FindByTestIdCommand;
  createTrainingSet: CreateTrainingSetCommand;
  graphQLRequest: GraphQLRequestCommand;
}

export const addCommands: CmdPack<AddCommands> = {
  findByTestId: {fn: findByTestId, opts: {prevSubject: true}},
  getByTestId: {fn: getByTestId},
  login: {fn: login},
  createTrainingSet: {fn: createTrainingSet},
  graphQLRequest: {fn: graphQLRequest},
};
