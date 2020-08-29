import {createFramework} from '../framework';
import {Commands, createCommands} from './Commands';

export const fw = createFramework<Commands>({
  deeplinkPrefix: 'byot://',
});

createCommands(fw);
