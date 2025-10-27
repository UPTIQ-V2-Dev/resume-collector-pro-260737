import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '@/lib/api';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
    const location = useLocation();

    // Check authentication status
    const isAuth = isAuthenticated();
    const hasAdminRole = isAdmin();

    // Show loading while checking auth (in a real app, this would be from a context)
    // For this demo, we'll assume it's synchronous

    if (!isAuth) {
        // Redirect to login with current location
        return (
            <Navigate
                to='/admin/login'
                state={{ from: location }}
                replace
            />
        );
    }

    if (requireAdmin && !hasAdminRole) {
        // User is authenticated but doesn't have admin role
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
                <div className='text-center'>
                    <div className='text-red-500 text-6xl mb-4'>🔒</div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>Access Denied</h1>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                        You don't have permission to access this area.
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Administrator privileges are required.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

// Loading component for when auth status is being determined
export const AuthLoadingGuard = ({ children }: { children: React.ReactNode }) => {
    // In a real app, you'd have an auth loading state from context
    // For now, we'll just render children directly
    return <>{children}</>;
};
