import {AsynchronousAction, AsynchronousActionResponse, ProcessAction} from './ProcessActions';
import {Action, ActionCreator, isType} from 'typescript-fsa';
import {Actions} from '../store/Actions';
import * as _ from 'lodash';
import {DataResponse} from '../data-structures/responses/DataResponse';

export interface ProcessActionExtractorDispatchOptions {
  group?: string;
}

export interface ProcessActionExtractorResponseOptions {
  group?: string;
}

export class ProcessActionExtractor {
  public static dispatch<S, QP, RP>(
    Target: {new (...args: any[]): ProcessAction<S, QP, RP>},
    payload?: QP,
    {group = 'default'}: ProcessActionExtractorDispatchOptions = {}
  ): Action<QP> {
    const creator: ActionCreator<QP> =
      Actions.reduxPack[group]?.[Target.prototype.__uniqueIdentifier]?.entryAction;
    if (!creator) {
      throw new Error(
        `Action creator '${Target.prototype.__uniqueIdentifier}' in group '${group}' does not exists.`
      );
    }
    return creator(payload!);
  }

  public static response<S, QP, RP>(
    action: Action<QP>,
    payload?: DataResponse<RP>,
    {group = 'default'}: ProcessActionExtractorResponseOptions = {}
  ): Action<AsynchronousActionResponse<QP, DataResponse<RP>>> {
    const pack = _.find(_.values(Actions.reduxPack[group] || {}), v => isType(action, v.entryAction));
    if (!pack || !pack.secondaryAction) {
      throw new Error(`Action ${action.type} has no response in pack`);
    }
    return pack.secondaryAction({
      request: action.payload,
      response: payload!,
    });
  }

  public static reducer<S, QP, RP>(
    action: Action<QP>,
    {group = 'default'}: ProcessActionExtractorResponseOptions = {}
  ): AsynchronousAction<S, QP, RP> {
    const pack = _.find(_.values(Actions.reduxPack[group] || {}), v => isType(action, v.entryAction));
    if (!pack || !pack.secondaryAction) {
      throw new Error(`Action ${action.type} has no reducer in pack`);
    }
    return pack.reducer as AsynchronousAction<S, QP, RP>;
  }
}
