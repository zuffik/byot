import {NavigateSpecialOptions} from './NavigateOptions';
import {NavigationScreenIdentifier} from './NavigationScreenIdentifier';
import {Screens} from '../../navigation/Screens';

export class NavigateReset implements NavigateSpecialOptions {
  public readonly special: 'reset' = 'reset';
  public readonly name: string;
  constructor(name: NavigationScreenIdentifier) {
    const screen: {Name: string} = typeof name == 'string' ? Screens[name] : name;
    this.name = screen.Name;
  }
}
