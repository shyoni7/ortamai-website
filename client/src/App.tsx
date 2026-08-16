import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { RoomTransitionProvider } from "./contexts/RoomTransitionContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import IncubatorRoom from "./pages/IncubatorRoom";
import AcademyRoom from "./pages/AcademyRoom";
import CyberRoom from "./pages/CyberRoom";
import AutomationsRoom from "./pages/AutomationsRoom";
import Courses from "./pages/Courses";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      {/* Admin lives outside the public Layout (no nav/footer/widgets). */}
      <Route path="/admin" component={Admin} />
      <Route>
        <PublicRoutes />
      </Route>
    </Switch>
  );
}

function PublicRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/incubator" component={IncubatorRoom} />
        <Route path="/academy" component={AcademyRoom} />
        <Route path="/cyber" component={CyberRoom} />
        <Route path="/automations" component={AutomationsRoom} />
        <Route path="/courses" component={Courses} />
        <Route path="/contact" component={Contact} />
        <Route path="/accessibility" component={AccessibilityStatement} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <RoomTransitionProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </RoomTransitionProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
