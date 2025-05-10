import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  RegistrationPage,
  Makecompete,
  HomePage,
  Championship,
  SignIn,
  Header,
  Schedule,
  NotFound,
} from "./components";
import "./normalize.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reg" element={<RegistrationPage />} />
          <Route path="/makecompete" element={<Makecompete />} />
          <Route path="/championship" element={<Championship />} />
          <Route path="/sign" element={<SignIn />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
