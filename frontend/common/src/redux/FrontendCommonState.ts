import {Resource} from '../redux-system/data-structures/resources/Resource';
import {EntityResource} from '../redux-system/data-structures/resources/EntityResource';
import {SnackbarContent} from '../types/app/snackbar/SnackbarContent';
import {IAuth} from '../types/interfaces/IAuth';
import {ITrainingSet} from '../types/interfaces/ITrainingSet';
import {BindProcessActionCreator} from '../redux-system/process/BindProcessActionCreator';
import {IterableResource} from '../redux-system/data-structures/resources/IterableResource';
import {FetchTrainingSets} from './process/training-set/FetchTrainingSets';
import {Filter} from '../types/app/filter/Filter';
import {TrainingSetBaseFetch} from './process/training-set/TrainingSetBaseFetch';
import {TrainingBaseFetch} from './process/training/TrainingBaseFetch';
import {ITraining} from '../types/interfaces/ITraining';
import {FetchTrainings} from './process/training/FetchTrainings';
import {IMedia} from '../types/interfaces/IMedia';

export class FrontendCommonState {
  auth: Resource<IAuth> = new EntityResource();
  snackbar?: SnackbarContent;
  is = {
    requestingPasswordReset: false,
    resettingPassword: false,

    processingTrainingSet: false,
    processingTraining: false,
  };
  /**
   * Training sets
   */
  trainingSetListFilter: Filter<{idUser?: string}> = {};
  @BindProcessActionCreator(TrainingSetBaseFetch)
  trainingSetDetail: EntityResource<ITrainingSet> = new EntityResource<ITrainingSet>();
  @BindProcessActionCreator(FetchTrainingSets)
  trainingSetListItems: IterableResource<ITrainingSet> = new IterableResource<ITrainingSet>();
  /**
   * Trainings
   */
  trainingListFilter: Filter = {};
  @BindProcessActionCreator(TrainingBaseFetch)
  trainingDetail: EntityResource<ITraining> = new EntityResource<ITraining>();
  @BindProcessActionCreator(FetchTrainings)
  trainingListItems: IterableResource<ITraining> = new IterableResource<ITraining>();
  /**
   * Player
   */
  currentMedia?: IMedia;
  autoplay: boolean = false;
}
