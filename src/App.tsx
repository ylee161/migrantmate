import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { ChatbotPage } from './pages/ChatbotPage';
import { DiscountsPage } from './pages/DiscountsPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { SocialActivitiesPage } from './pages/SocialActivitiesPage';
import { CommunityEventsPage } from './pages/CommunityEventsPage';
import { GroupChatPage } from './pages/GroupChatPage';
import { HelpPage } from './pages/HelpPage';
import { CharitiesAuthoritiesPage } from './pages/CharitiesAuthoritiesPage';
import { FinancialCalculatorPage } from './pages/FinancialCalculatorPage';
import { RemittanceAssistancePage } from './pages/RemittanceAssistancePage';
import { CommunityFoodSharePage } from './pages/CommunityFoodSharePage';
import { FoodSafetyReportPage } from './pages/FoodSafetyReportPage';
import { EmergencyShelterPage } from './pages/EmergencyShelterPage';
import { LearnMyRightsPage } from './pages/LearnMyRightsPage';
import { BudgetBrotherPage } from './pages/BudgetBrotherPage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { BudgetAdvicePage } from './pages/BudgetAdvicePage';
import { Header } from './components/Header';
import { FloatingChatBubble } from './components/FloatingChatBubble';
import { ChatModal } from './components/ChatModal';
import { TutorialModal } from './components/TutorialModal';
import { TutorialPrompt } from './components/TutorialPrompt';
import { LanguageCode } from './translations';

function ConditionalChatBubble({ onOpenChat }: { onOpenChat: () => void }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  if (isAuthPage) {
    return null;
  }
  
  return <FloatingChatBubble onClick={onOpenChat} />;
}

function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [showTutorialPrompt, setShowTutorialPrompt] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as LanguageCode;
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  // Check if tutorial should be shown after authentication
  useEffect(() => {
    if (isAuthenticated) {
      const tutorialCompleted = localStorage.getItem('tutorialCompleted');
      if (!tutorialCompleted) {
        setIsFirstTime(true);
        // Show tutorial prompt after 2.5 second delay
        const timer = setTimeout(() => {
          setShowTutorialPrompt(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const handleAcceptTutorial = () => {
    setShowTutorialPrompt(false);
    setShowTutorial(true);
  };

  const handleDeclineTutorial = () => {
    setShowTutorialPrompt(false);
    localStorage.setItem('tutorialCompleted', 'true');
    setIsFirstTime(false);
  };

  const handleReplayTutorial = () => {
    setIsFirstTime(false);
    setShowTutorial(true);
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    if (isFirstTime) {
      setIsFirstTime(false);
    }
  };

  const handleOpenChat = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <LoginPage 
                currentLang={currentLang} 
                onLanguageChange={handleLanguageChange} 
              />
            } />
            <Route path="/signup" element={
              <SignupPage 
                currentLang={currentLang} 
                onLanguageChange={handleLanguageChange} 
              />
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <LandingPage 
                    currentLang={currentLang} 
                    onReplayTutorial={handleReplayTutorial}
                  />
                </>
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <HomePage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/chatbot" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <ChatbotPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/discounts" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <DiscountsPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/activities" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <ActivitiesPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/activities/social" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <SocialActivitiesPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/community-events" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <CommunityEventsPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/group-chat/:activityId" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <GroupChatPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <HelpPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/charities" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <CharitiesAuthoritiesPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/financial-calculator" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <FinancialCalculatorPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/remittance-assistance" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <RemittanceAssistancePage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/community-food-share" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <CommunityFoodSharePage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/food-safety-report" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <FoodSafetyReportPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/emergency-shelter" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <EmergencyShelterPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/learn-my-rights" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <LearnMyRightsPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/budget-brother" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <BudgetBrotherPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/transaction-history" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <TransactionHistoryPage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/budget-advice" element={
              <ProtectedRoute onAuthSuccess={() => setIsAuthenticated(true)}>
                <>
                  <Header currentLanguage={currentLang} onLanguageChange={handleLanguageChange} />
                  <BudgetAdvicePage currentLang={currentLang} />
                </>
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">404 - Page Not Found</h1>
                  <p className="text-slate-600 mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>

          {/* Conditional Floating Chat Bubble - Only shows on authenticated pages, not on login/signup */}
          <ConditionalChatBubble onOpenChat={handleOpenChat} />

          {/* Chat Modal */}
          <ChatModal
            isOpen={isChatModalOpen}
            onClose={handleCloseChat}
            currentLang={currentLang}
          />

          {/* Tutorial Prompt - Only for first-time users */}
          <TutorialPrompt
            isOpen={showTutorialPrompt}
            onAccept={handleAcceptTutorial}
            onDecline={handleDeclineTutorial}
            currentLang={currentLang}
          />

          {/* Tutorial Modal */}
          <TutorialModal
            isOpen={showTutorial}
            onClose={handleCloseTutorial}
            currentLang={currentLang}
            isFirstTime={isFirstTime}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
