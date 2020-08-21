import {NavigateTo} from './NavigateTo';
import {NavigationScreenIdentifier} from './NavigationScreenIdentifier';

export class NavigateNoParams extends NavigateTo {
  constructor(screen: NavigationScreenIdentifier) {
    super(screen, {});
  }
}
