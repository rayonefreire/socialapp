import { StatusBar } from 'expo-status-bar';

import { Provider } from './src/context';
import { RoutesApp } from './src/routes';

export default function App() {
  return (
    <Provider>
      <RoutesApp />
      <StatusBar style="auto" />
    </Provider>
  );
}

