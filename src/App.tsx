import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Router } from './Router';
import { GlobalBackground } from './components/GlobalBackground';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CookieConsent } from './components/CookieConsent';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { OfflineIndicator } from './components/OfflineIndicator';
import { FloatingActionButton } from './components/FloatingActionButton';
import { KonamiEasterEgg } from './components/KonamiEasterEgg';
import { FeedbackWidget } from './components/FeedbackWidget';

function App() {
  useEffect(() => {
    const setThemeByTime = () => {
      const hour = new Date().getHours();
      const isGreenTheme = hour >= 13;
      const backgroundColor = isGreenTheme ? '#0c1910' : '#0b1224';

      document.body.style.setProperty('--background-color', backgroundColor);
    };

    setThemeByTime();
    const interval = setInterval(setThemeByTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <GlobalBackground />
        <ScrollProgress />
        <OfflineIndicator />
        <KeyboardShortcuts />
        <KonamiEasterEgg />
        <Router />
        <BackToTop />
        <FloatingActionButton />
        <MobileBottomNav />
        <FeedbackWidget />
        <CookieConsent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
