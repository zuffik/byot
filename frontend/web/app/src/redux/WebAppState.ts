import {WebState} from '@byot-frontend/web-common/src/redux/WebState';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';
import {MenuIcons, menuIcons} from '../components/menu/Icons';
import {Router} from '../router/Router';
import {Filter} from '@byot-frontend/common/src/types/app/filter/Filter';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {BindProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/BindProcessActionCreator';
import {FetchTrainingSets} from './process/training-set/FetchTrainingSets';

export class WebAppState extends WebState {
  /**
   * Training sets
   */
  trainingSetListFilter: Filter<{idUser?: string}> = {};
  @BindProcessActionCreator(FetchTrainingSets)
  trainingSetListItems: IterableResource<ITrainingSet> = new IterableResource<ITrainingSet>();

  menuItems: LinkMenuItem<MenuIcons>[];

  constructor() {
    super();
    this.menuItems = [
      {
        icon: menuIcons.Home,
        label: 'Home',
        id: 'Home',
        link: Router.URI(),
      },
      {
        icon: menuIcons.CreateTrainingSet,
        label: 'Create training set',
        id: 'CreateTrainingSet',
        link: Router.training.trainingSet.create.URI(),
      },
      {
        icon: menuIcons.Profile,
        label: 'My profile',
        id: 'Profile',
        link: Router.user.URI(),
      },
    ];
  }
}
