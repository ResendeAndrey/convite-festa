import { AuthProvider } from "@/contexts/authContext";
import { EventDetailsProvider } from "@/contexts/eventDetailsContext";
import { FamilyProvider } from "@/contexts/familyContext";
import ProtectedRoute from "@/hooks/protectedRoute";
import { ConfirmPage } from "@/pages/confirmationpage";
import FamilyListPage from "@/pages/familyListPage";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/notFound";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GuestListPage from "../pages/GuestListPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <EventDetailsProvider>
            <FamilyProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/guests"
                  element={
                    <ProtectedRoute>
                      <GuestListPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/families"
                  element={
                    <ProtectedRoute>
                      <FamilyListPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/families/:id/confirmation" element={<ConfirmPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </FamilyProvider>
          </EventDetailsProvider>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
