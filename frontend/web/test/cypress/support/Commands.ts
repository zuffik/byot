import {addCommands} from './cmds/packs/AddCommands';
import {CmdInPack} from './Types';

Object.keys(addCommands).forEach(key => {
  const cmd: CmdInPack<any, any> = addCommands[key];
  Cypress.Commands.add(key, cmd.opts || {prevSubject: false}, cmd.fn);
});
