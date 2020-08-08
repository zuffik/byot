import {login, LoginCommand} from '../flow/Login';
import {getByTestId, GetByTestIdCommand} from '../selectors/GetByTestId';
import {findByTestId, FindByTestIdCommand} from '../selectors/FindByTestId';
import {CmdPack} from '../../Types';
import {createTrainingSet, CreateTrainingSetCommand} from '../flow/CreateTrainingSet';
import {graphQLRequest, GraphQLRequestCommand} from '../mock/GraphQLRequest';
import {createTraining, CreateTrainingCommand} from '../flow/CreateTraining';
import {clickOnEdit, ClickOnEditCommand} from '../actions/ClickOnEdit';
import {createMedia, CreateMediaCommand} from '../flow/CreateMedia';

export interface AddCommands {
  getByTestId: GetByTestIdCommand;
  findByTestId: FindByTestIdCommand;
  clickOnEdit: ClickOnEditCommand;

  login: LoginCommand;
  createMedia: CreateMediaCommand;
  createTraining: CreateTrainingCommand;
  createTrainingSet: CreateTrainingSetCommand;

  graphQLRequest: GraphQLRequestCommand;
}

export const addCommands: CmdPack<AddCommands> = {
  findByTestId: {fn: findByTestId, opts: {prevSubject: true}},
  getByTestId: {fn: getByTestId},
  clickOnEdit: {fn: clickOnEdit},

  createMedia: {fn: createMedia},
  login: {fn: login},
  createTrainingSet: {fn: createTrainingSet},
  createTraining: {fn: createTraining},

  graphQLRequest: {fn: graphQLRequest},
};
