import {NavigateOptions} from './NavigateOptions';
import {Screens} from '../../Screens';
import {NavigationScreenIdentifier} from './NavigationScreenIdentifier';

export class NavigateTo implements NavigateOptions {
  public readonly key: string;
  public readonly name: string;
  constructor(name: NavigationScreenIdentifier, public readonly params: Record<string, any>) {
    const screen: {Name: string} = typeof name == 'string' ? Screens[name] : name;
    this.key = this.name = screen.Name;
  }
}
