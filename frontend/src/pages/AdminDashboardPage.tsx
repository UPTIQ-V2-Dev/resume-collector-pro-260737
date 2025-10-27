import { AuthGuard } from '@/components/AuthGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Users, FileText, LogOut } from 'lucide-react';
import { authService } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ComingSoonDashboard = () => {
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            toast.success('Logged out successfully');
            navigate('/admin/login', { replace: true });
        },
        onError: () => {
            // Even if logout fails, clear local data and redirect
            navigate('/admin/login', { replace: true });
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
            {/* Header */}
            <div className='bg-white dark:bg-gray-800 shadow-sm border-b'>
                <div className='container mx-auto px-4 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <FileText className='h-6 w-6 text-blue-600' />
                            <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
                                Resume Collector Admin
                            </h1>
                        </div>
                        <Button
                            variant='outline'
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                        >
                            <LogOut className='h-4 w-4 mr-2' />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='container mx-auto px-4 py-8'>
                <div className='text-center mb-8'>
                    <div className='text-6xl mb-4'>🚧</div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>Dashboard Coming Soon</h2>
                    <p className='text-gray-600 dark:text-gray-400 text-lg'>
                        The admin dashboard is currently under development.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <Card className='text-center'>
                        <CardHeader>
                            <CardTitle className='flex items-center justify-center gap-2'>
                                <Users className='h-5 w-5 text-blue-600' />
                                Applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>--</div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Total applications received</p>
                        </CardContent>
                    </Card>

                    <Card className='text-center'>
                        <CardHeader>
                            <CardTitle className='flex items-center justify-center gap-2'>
                                <FileText className='h-5 w-5 text-green-600' />
                                New Today
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>--</div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Applications submitted today</p>
                        </CardContent>
                    </Card>

                    <Card className='text-center'>
                        <CardHeader>
                            <CardTitle className='flex items-center justify-center gap-2'>
                                <Settings className='h-5 w-5 text-purple-600' />
                                Positions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>--</div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Active job positions</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Planned Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                                    Application Management
                                </h4>
                                <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                    <li>• View all applications in a sortable table</li>
                                    <li>• Filter by status, position, and date</li>
                                    <li>• Search applicants by name or email</li>
                                    <li>• Update application status</li>
                                </ul>
                            </div>
                            <div className='space-y-2'>
                                <h4 className='font-semibold text-gray-900 dark:text-gray-100'>File Management</h4>
                                <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                    <li>• Download individual resumes</li>
                                    <li>• Bulk resume downloads</li>
                                    <li>• Export application data to CSV</li>
                                    <li>• Secure file access controls</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export const AdminDashboardPage = () => {
    return (
        <AuthGuard requireAdmin={true}>
            <ComingSoonDashboard />
        </AuthGuard>
    );
};
