import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';

// not using testing library due to error
// TypeError: MutationObserver is not a constructor
// todo either resolve it or not use it at all

// @ts-ignore
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

configure({adapter: new Adapter()});
