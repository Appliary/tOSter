import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import AppsMenu from './pages/AppsMenu';
import AlarmMenu from './pages/apps/Alarm';
import SettingsMenu from './pages/SettingsMenu';
import SettingsLang from './pages/settings/Lang';
import SettingsUpdate from './pages/settings/Update';
import SettingsShutdown from './pages/settings/Shutdown';
import NotFound from './pages/NotFound';
import FacesEdit from './pages/faces/FacesEdit';
import FacesList from './pages/faces/FacesList';
import LedsList from './pages/leds/LedsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="settings" element={<Layout />}>
            <Route index element={<SettingsMenu />} />
            <Route path="lang" element={<SettingsLang />} />
            <Route path="update" element={<SettingsUpdate />} />
            <Route path="shutdown" element={<SettingsShutdown />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="apps" element={<Layout />}>
            <Route index element={<AppsMenu />} />
            <Route path="alarms" element={<AlarmMenu />} />
          </Route>

          <Route path="faces" element={<Layout />}>
            <Route index element={<FacesList />} />
            <Route path="*" element={<FacesEdit />} />
          </Route>

          <Route path="leds" element={<Layout />}>
            <Route index element={<LedsList />} />
            <Route path="add" element={<FacesEdit />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
