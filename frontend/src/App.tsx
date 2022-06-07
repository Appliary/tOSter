import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Home from './pages/Home';
import AppsMenu from './pages/AppsMenu';
import AlarmMenu from './pages/AlarmMenu';
import SettingsMenu from './pages/settings/SettingsMenu';
import SettingsLang from './pages/settings/SettingsLang';
import NotFound from './pages/NotFound';
import FacesEdit from './pages/faces/FacesEdit';
import FacesList from './pages/faces/FacesList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Layout />}>
            <Route index element={<SettingsMenu />} />
            <Route path="lang" element={<SettingsLang />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="apps" element={<AppsMenu />} />
          <Route path="alarms" element={<AlarmMenu />} />
          <Route path="*" element={<NotFound />} />

          <Route path="faces" element={<Layout />}>
            <Route index element={<FacesList />} />
            <Route path="*" element={<FacesEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
