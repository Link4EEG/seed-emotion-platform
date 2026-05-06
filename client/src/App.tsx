import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LangProvider } from "./contexts/LangContext";
import Intro from "./pages/Intro";
import Usage from "./pages/Usage";

// 🌐 Vite가 주입하는 BASE_URL을 wouter base prop으로 전달해
// GitHub Pages 같은 서브경로 호스팅에서도 라우팅이 정상 동작하도록 함.
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function AppRoutes() {
  return (
    <Switch>
      <Route path="/"      component={Intro} />
      <Route path="/usage" component={Usage} />
      <Route path="/404"   component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LangProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base={BASE_PATH}>
              <AppRoutes />
            </WouterRouter>
          </TooltipProvider>
        </LangProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
