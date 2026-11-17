import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Incubator from "./pages/Incubator";
import Academy from "./pages/Academy";
import Courses from "./pages/Courses";
import CourseSyllabus from "./pages/CourseSyllabus";
import Admin from "./pages/Admin";
import Placement from "./pages/Placement";
import Contact from "./pages/Contact";
import AiGuide from "./pages/AiGuide";
import AiGuideAdvanced from "./pages/AiGuideAdvanced";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import { LANDING_PAGES } from "./data/landingPages";

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

/**
 * A new page opens at its top. Without this the browser keeps the scroll position
 * of the page the visitor came from, so a link clicked halfway down a long page
 * lands halfway down the next one. Links to an anchor (#...) are left alone.
 */
function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PublicRoutes() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/consulting" component={Incubator} />
        <Route path="/incubator"><Redirect to="/consulting" replace /></Route>
        <Route path="/academy" component={Academy} />
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:slug" component={CourseSyllabus} />
        <Route path="/placement" component={Placement} />
        <Route path="/contact" component={Contact} />
        <Route path="/ai-guide/advanced" component={AiGuideAdvanced} />
        <Route path="/ai-guide" component={AiGuide} />
        <Route path="/accessibility" component={AccessibilityStatement} />
        {LANDING_PAGES.map(page => (
          <Route key={page.path} path={page.path}><Landing page={page} /></Route>
        ))}
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
