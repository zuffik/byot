import {NavigateToOptions} from './NavigateOptions';
import {Screens} from '../../navigation/Screens';
import {NavigationScreenIdentifier} from './NavigationScreenIdentifier';

export class NavigateTo implements NavigateToOptions {
  public readonly key: string;
  public readonly name: string;

  constructor(name: NavigationScreenIdentifier, public readonly params: Record<string, any>) {
    const screen: {Name: string} = typeof name == 'string' ? Screens[name] : name;
    this.key = this.name = screen.Name;
  }
}
