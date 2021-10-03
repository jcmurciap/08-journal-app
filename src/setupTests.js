import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// usado para la prueba de 'startUploading' should update entry URL
//const noScroll = () => {}
//Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true})