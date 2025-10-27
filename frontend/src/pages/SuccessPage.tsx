import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, FileText, Mail, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SuccessPageState {
    referenceNumber?: string;
    applicantName?: string;
}

export const SuccessPage = () => {
    const location = useLocation();
    const state = location.state as SuccessPageState | null;

    const referenceNumber = state?.referenceNumber || 'REF-2024-001';
    const applicantName = state?.applicantName || '';

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4'>
            <div className='container max-w-2xl mx-auto'>
                <div className='text-center mb-8'>
                    <div className='flex justify-center mb-6'>
                        <div className='bg-green-100 dark:bg-green-900/20 p-4 rounded-full'>
                            <CheckCircle className='h-16 w-16 text-green-600 dark:text-green-400' />
                        </div>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                        Application Submitted Successfully!
                    </h1>
                    <p className='text-gray-600 dark:text-gray-400 text-lg'>
                        {applicantName ? `Thank you, ${applicantName}!` : 'Thank you!'} We've received your application.
                    </p>
                </div>

                <Card className='shadow-xl border-0 mb-8'>
                    <CardHeader className='text-center'>
                        <CardTitle className='text-xl text-green-700 dark:text-green-400'>
                            Your Application Details
                        </CardTitle>
                        <CardDescription>Please save this information for your records</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
                            <div className='flex items-center justify-center mb-2'>
                                <FileText className='h-5 w-5 text-green-600 dark:text-green-400 mr-2' />
                                <span className='font-semibold text-green-800 dark:text-green-300'>
                                    Reference Number
                                </span>
                            </div>
                            <p className='text-center text-2xl font-mono font-bold text-green-700 dark:text-green-400'>
                                {referenceNumber}
                            </p>
                        </div>

                        <div className='text-center text-sm text-gray-600 dark:text-gray-400'>
                            <p>
                                Submitted on{' '}
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className='shadow-xl border-0 mb-8'>
                    <CardHeader>
                        <CardTitle className='flex items-center'>
                            <Mail className='h-5 w-5 mr-2 text-blue-600' />
                            What Happens Next?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                    <span className='text-blue-600 dark:text-blue-400 text-sm font-semibold'>1</span>
                                </div>
                                <div>
                                    <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                                        Confirmation Email
                                    </h4>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                        You'll receive a confirmation email shortly with your application details.
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                    <span className='text-blue-600 dark:text-blue-400 text-sm font-semibold'>2</span>
                                </div>
                                <div>
                                    <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                                        Application Review
                                    </h4>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                        Our team will review your application within 3-5 business days.
                                    </p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                    <span className='text-blue-600 dark:text-blue-400 text-sm font-semibold'>3</span>
                                </div>
                                <div>
                                    <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                                        Interview Process
                                    </h4>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                        If you're a good fit, we'll contact you to schedule an interview.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='text-center space-y-4'>
                    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                        <Button
                            asChild
                            variant='outline'
                            size='lg'
                        >
                            <Link to='/'>
                                <ArrowLeft className='w-4 h-4 mr-2' />
                                Submit Another Application
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant='outline'
                            size='lg'
                        >
                            <a href='mailto:careers@company.com'>
                                <Mail className='w-4 h-4 mr-2' />
                                Contact HR Team
                            </a>
                        </Button>
                    </div>

                    <Separator className='my-8' />

                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                        <p className='mb-2'>Need help or have questions?</p>
                        <div className='flex justify-center items-center gap-4 flex-wrap'>
                            <a
                                href='mailto:careers@company.com'
                                className='flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                            >
                                <Mail className='w-4 h-4 mr-1' />
                                careers@company.com
                            </a>
                            <a
                                href='tel:+1-555-0100'
                                className='flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                            >
                                📞 +1-555-0100
                            </a>
                            <a
                                href='https://company.com/careers'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                            >
                                <ExternalLink className='w-4 h-4 mr-1' />
                                Visit Careers Page
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
