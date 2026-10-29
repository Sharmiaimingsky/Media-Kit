import React from 'react';
import { AppProvider } from './context/AppContext';
import { MediaKitApp } from './components/MediaKitApp';

export default function App() {
  return (
    <AppProvider>
      <MediaKitApp />
    </AppProvider>
  );
}
