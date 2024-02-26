import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import MeScene from './Components/MeScene';
import store from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MeScene />
  </Provider>
)
