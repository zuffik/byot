import {WebState} from '@byot-frontend/web-common/src/redux/WebState';
import {LinkMenuItem} from '@byot-frontend/common/src/types/app/structurals/MenuItem';
import {MenuIcons, menuIcons} from '../components/menu/Icons';
import {Router} from '../router/Router';

export class WebAppState extends WebState {
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
