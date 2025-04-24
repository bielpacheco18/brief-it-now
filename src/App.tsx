
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { BriefingProvider } from "@/context/BriefingContext";
import { RequireAuth } from "@/components/RequireAuth";

// Pages
import LandingPage from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateBriefing from "./pages/CreateBriefing";
import EditBriefing from "./pages/EditBriefing";
import ViewBriefing from "./pages/ViewBriefing";
import BriefingForm from "./pages/BriefingForm";
import BriefingResponse from "./pages/BriefingResponse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BriefingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/briefings/:id" element={<BriefingForm />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/create-briefing"
                element={
                  <RequireAuth>
                    <CreateBriefing />
                  </RequireAuth>
                }
              />
              <Route
                path="/edit-briefing/:id"
                element={
                  <RequireAuth>
                    <EditBriefing />
                  </RequireAuth>
                }
              />
              <Route
                path="/view-briefing/:id"
                element={
                  <RequireAuth>
                    <ViewBriefing />
                  </RequireAuth>
                }
              />
              <Route
                path="/response/:briefingId/:responseId"
                element={
                  <RequireAuth>
                    <BriefingResponse />
                  </RequireAuth>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BriefingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
