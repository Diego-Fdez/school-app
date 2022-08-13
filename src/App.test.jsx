import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthScreen from './components/Auth/AuthScreen.jsx';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const navigate = test('App is working', () => {
  const wrapper = render(
    <Provider store={store}>
      <AuthScreen />
    </Provider>
  );
});
