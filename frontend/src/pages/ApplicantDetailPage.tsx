import { AuthGuard } from '@/components/AuthGuard';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoonApplicantDetail = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
            {/* Header */}
            <div className='bg-white dark:bg-gray-800 shadow-sm border-b'>
                <div className='container mx-auto px-4 py-4'>
                    <div className='flex items-center gap-4'>
                        <Button
                            variant='outline'
                            asChild
                            size='sm'
                        >
                            <Link to='/admin/dashboard'>
                                <ArrowLeft className='h-4 w-4 mr-2' />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <div className='flex items-center gap-2'>
                            <User className='h-5 w-5 text-blue-600' />
                            <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Applicant Details</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='container mx-auto px-4 py-8'>
                <div className='text-center mb-8'>
                    <div className='text-6xl mb-4'>🚧</div>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                        Applicant Detail View Coming Soon
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400 text-lg'>
                        Individual applicant details page is currently under development.
                    </p>
                    {id && <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>Applicant ID: {id}</p>}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <User className='h-5 w-5 text-blue-600' />
                                Applicant Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                                <p>• Full contact details</p>
                                <p>• LinkedIn and portfolio links</p>
                                <p>• Job position applied for</p>
                                <p>• Application submission date</p>
                                <p>• Current application status</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <FileText className='h-5 w-5 text-green-600' />
                                Resume & Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                                <p>• Resume file download</p>
                                <p>• Status update controls</p>
                                <p>• Admin notes section</p>
                                <p>• Email communication tools</p>
                                <p>• Application history timeline</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className='mt-6'>
                    <CardHeader>
                        <CardTitle>Planned Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='space-y-2'>
                                <h4 className='font-semibold text-gray-900 dark:text-gray-100'>Profile View</h4>
                                <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                    <li>• Complete applicant profile</li>
                                    <li>• Professional links</li>
                                    <li>• Application timestamp</li>
                                </ul>
                            </div>
                            <div className='space-y-2'>
                                <h4 className='font-semibold text-gray-900 dark:text-gray-100'>Document Management</h4>
                                <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                    <li>• Secure resume download</li>
                                    <li>• File preview capability</li>
                                    <li>• Document metadata</li>
                                </ul>
                            </div>
                            <div className='space-y-2'>
                                <h4 className='font-semibold text-gray-900 dark:text-gray-100'>Status Management</h4>
                                <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                                    <li>• Status update workflow</li>
                                    <li>• Admin notes and comments</li>
                                    <li>• Email notifications</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export const ApplicantDetailPage = () => {
    return (
        <AuthGuard requireAdmin={true}>
            <ComingSoonApplicantDetail />
        </AuthGuard>
    );
};
