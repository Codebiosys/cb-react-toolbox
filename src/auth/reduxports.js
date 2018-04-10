import * as actions from './actions';
import * as constants from './constants';
import * as sagas from './sagas';
import reducers from './reducers';

const reduxExports = {
  actions,
  constants,
  sagas,
  reducers,
};

export default reduxExports;
