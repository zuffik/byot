import {Screens} from '../../navigation/Screens';

export type NavigationScreenIdentifier = keyof typeof Screens | {Name: string};
