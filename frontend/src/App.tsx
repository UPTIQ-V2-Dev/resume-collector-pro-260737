import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { ApplicationFormPage } from './pages/ApplicationFormPage';
import { SuccessPage } from './pages/SuccessPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ApplicantDetailPage } from './pages/ApplicantDetailPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});

export const App = () => {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div className='min-h-screen bg-background text-foreground'>
                        <Routes>
                            <Route
                                path='/'
                                element={<ApplicationFormPage />}
                            />
                            <Route
                                path='/success'
                                element={<SuccessPage />}
                            />
                            <Route
                                path='/admin/login'
                                element={<AdminLoginPage />}
                            />
                            <Route
                                path='/admin/dashboard'
                                element={<AdminDashboardPage />}
                            />
                            <Route
                                path='/admin/applicants/:id'
                                element={<ApplicantDetailPage />}
                            />
                        </Routes>
                        <Toaster />
                    </div>
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
