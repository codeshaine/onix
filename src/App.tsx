import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { AppProvider } from "./context/WalletDetails";
import { PrePage } from "./pages/PrePage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UnlockedRoute } from "./routes/UnlockedRoute";
import PasswordPage from "./pages/Password";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path=""
              element={
                <UnlockedRoute>
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                </UnlockedRoute>
              }
            />
            <Route path="/pre" element={<PrePage />} />
            <Route path="/password" element={<PasswordPage />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
