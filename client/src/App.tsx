import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Incubator from "./pages/Incubator";
import Academy from "./pages/Academy";
import Placement from "./pages/Placement";
import Contact from "./pages/Contact";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/incubator" component={Incubator} />
        <Route path="/academy" component={Academy} />
        <Route path="/placement" component={Placement} />
        <Route path="/contact" component={Contact} />
        <Route path="/accessibility" component={AccessibilityStatement} />
        <Route path="/privacy" component={PrivacyPolicy} />
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
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
