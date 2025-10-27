import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/FileUpload';
import { applicationsService } from '@/services/applications';
import { applicationFormSchema, type ApplicationFormData } from '@/lib/validation';
import { JOB_POSITIONS } from '@/lib/constants';
import { toast } from 'sonner';

export const ApplicationFormPage = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            linkedinProfile: '',
            portfolioWebsite: '',
            jobPosition: '',
            resume: null,
            additionalNotes: ''
        }
    });

    const submitApplicationMutation = useMutation({
        mutationFn: async (data: ApplicationFormData) => {
            // First upload the resume if it exists
            if (!data.resume) {
                throw new Error('Resume is required');
            }

            await applicationsService.uploadResume(data.resume);

            // Then submit the application data
            const applicationData = {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber || undefined,
                linkedinProfile: data.linkedinProfile || undefined,
                portfolioWebsite: data.portfolioWebsite || undefined,
                jobPosition: data.jobPosition,
                additionalNotes: data.additionalNotes || undefined
            };

            return applicationsService.submitApplication(applicationData);
        },
        onSuccess: response => {
            toast.success('Application submitted successfully!');
            navigate('/success', {
                state: {
                    referenceNumber: response.referenceNumber,
                    applicantName: form.getValues('fullName')
                }
            });
        },
        onError: error => {
            console.error('Application submission error:', error);
            toast.error('Failed to submit application. Please try again.');
        }
    });

    const onSubmit = (data: ApplicationFormData) => {
        // Update the resume field with the selected file
        const formData = {
            ...data,
            resume: selectedFile
        };
        submitApplicationMutation.mutate(formData);
    };

    const isSubmitting = submitApplicationMutation.isPending;

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4'>
            <div className='container max-w-2xl mx-auto'>
                <div className='text-center mb-8'>
                    <div className='flex justify-center mb-4'>
                        <div className='bg-primary/10 p-3 rounded-full'>
                            <FileText className='h-8 w-8 text-primary' />
                        </div>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>Apply for a Position</h1>
                    <p className='text-gray-600 dark:text-gray-400 text-lg'>
                        Join our team! Fill out the form below to submit your application.
                    </p>
                </div>

                <Card className='shadow-xl border-0'>
                    <CardHeader>
                        <CardTitle>Job Application Form</CardTitle>
                        <CardDescription>
                            Please fill in all required fields. Your resume must be in PDF or Word format.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                {/* Personal Information Section */}
                                <div className='space-y-4'>
                                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2'>
                                        Personal Information
                                    </h3>

                                    <FormField
                                        control={form.control}
                                        name='fullName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter your full name'
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='email'
                                                            placeholder='your.email@example.com'
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='phoneNumber'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type='tel'
                                                            placeholder='+1-555-0123'
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='linkedinProfile'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>LinkedIn Profile</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='https://linkedin.com/in/yourprofile'
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='portfolioWebsite'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Portfolio/Website</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='https://yourportfolio.com'
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Position & Resume Section */}
                                <div className='space-y-4'>
                                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2'>
                                        Position & Resume
                                    </h3>

                                    <FormField
                                        control={form.control}
                                        name='jobPosition'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Position *</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    disabled={isSubmitting}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the position you're applying for" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {JOB_POSITIONS.map(position => (
                                                            <SelectItem
                                                                key={position}
                                                                value={position}
                                                            >
                                                                {position}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='resume'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Resume *</FormLabel>
                                                <FormControl>
                                                    <FileUpload
                                                        onFileSelect={file => {
                                                            setSelectedFile(file);
                                                            field.onChange(file);
                                                        }}
                                                        selectedFile={selectedFile}
                                                        disabled={isSubmitting}
                                                        error={form.formState.errors.resume?.message}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Additional Information Section */}
                                <div className='space-y-4'>
                                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2'>
                                        Additional Information
                                    </h3>

                                    <FormField
                                        control={form.control}
                                        name='additionalNotes'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Additional Notes</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us why you're interested in this position or any additional information you'd like to share..."
                                                        className='min-h-[100px] resize-none'
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='pt-4'>
                                    <Button
                                        type='submit'
                                        size='lg'
                                        className='w-full'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                                Submitting Application...
                                            </>
                                        ) : (
                                            <>
                                                <Send className='w-4 h-4 mr-2' />
                                                Submit Application
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <p className='text-sm text-gray-500 dark:text-gray-400 text-center'>
                                    By submitting this form, you agree to our terms and conditions. We'll contact you if
                                    your application matches our requirements.
                                </p>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
