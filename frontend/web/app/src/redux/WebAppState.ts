import {WebState} from '@byot-frontend/web-common/src/redux/WebState';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';
import {MenuIcons, menuIcons} from '../components/menu/Icons';
import {Router} from '../router/Router';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {BindProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/BindProcessActionCreator';
import {MediaSearch} from './process/media/MediaSearch';

export class WebAppState extends WebState {
  menuItems: LinkMenuItem<MenuIcons>[];
  @BindProcessActionCreator(MediaSearch)
  mediaProvided: IterableResource<IMedia> = new IterableResource<IMedia>([], {appendNewData: false});

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
        link: Router.trainingSet.create.URI(),
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
