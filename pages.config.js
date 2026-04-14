/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import Academy from './pages/Academy';
import AccessibilityStatement from './pages/AccessibilityStatement';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import ContentManager from './pages/ContentManager';
import CourseAI from './pages/CourseAI';
import CyberGoAI from './pages/CyberGoAI';
import Home from './pages/Home';
import Incubator from './pages/Incubator';
import InitialConsultation from './pages/InitialConsultation';
import MediaManager from './pages/MediaManager';
import Placement from './pages/Placement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SandboxHome from './pages/SandboxHome';
import SiteMap from './pages/SiteMap';
import SubmissionsManager from './pages/SubmissionsManager';
import SubmitJob from './pages/SubmitJob';
import TrainingDevelopers from './pages/TrainingDevelopers';
import TrainingExecutives from './pages/TrainingExecutives';
import TrainingFinance from './pages/TrainingFinance';
import TrainingHR from './pages/TrainingHR';
import TrainingInvestment from './pages/TrainingInvestment';
import TrainingManagers from './pages/TrainingManagers';
import TrainingMarketing from './pages/TrainingMarketing';
import TrainingProductManagers from './pages/TrainingProductManagers';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Academy": Academy,
    "AccessibilityStatement": AccessibilityStatement,
    "AdminDashboard": AdminDashboard,
    "Contact": Contact,
    "ContentManager": ContentManager,
    "CourseAI": CourseAI,
    "CyberGoAI": CyberGoAI,
    "Home": Home,
    "Incubator": Incubator,
    "InitialConsultation": InitialConsultation,
    "MediaManager": MediaManager,
    "Placement": Placement,
    "PrivacyPolicy": PrivacyPolicy,
    "SandboxHome": SandboxHome,
    "SiteMap": SiteMap,
    "SubmissionsManager": SubmissionsManager,
    "SubmitJob": SubmitJob,
    "TrainingDevelopers": TrainingDevelopers,
    "TrainingExecutives": TrainingExecutives,
    "TrainingFinance": TrainingFinance,
    "TrainingHR": TrainingHR,
    "TrainingInvestment": TrainingInvestment,
    "TrainingManagers": TrainingManagers,
    "TrainingMarketing": TrainingMarketing,
    "TrainingProductManagers": TrainingProductManagers,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};