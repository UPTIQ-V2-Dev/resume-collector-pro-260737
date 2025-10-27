import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { authService } from '@/services/auth';
import { adminLoginSchema, type AdminLoginData } from '@/lib/validation';
import { isAuthenticated, isAdmin } from '@/lib/api';
import { toast } from 'sonner';

export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Redirect if already authenticated as admin
    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
            navigate(from, { replace: true });
        }
    }, [navigate, location.state]);

    const form = useForm<AdminLoginData>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const loginMutation = useMutation({
        mutationFn: (credentials: AdminLoginData) => authService.login(credentials),
        onSuccess: response => {
            const user = response.user;

            // Check if user has admin role
            if (!isAdmin(user)) {
                toast.error('Access denied. Administrator privileges required.');
                return;
            }

            toast.success(`Welcome back, ${user.name || user.email}!`);

            // Redirect to the originally requested page or dashboard
            const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
            navigate(from, { replace: true });
        },
        onError: (error: any) => {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'Invalid email or password';
            toast.error(message);
        }
    });

    const onSubmit = (data: AdminLoginData) => {
        loginMutation.mutate(data);
    };

    const isLoading = loginMutation.isPending;

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 py-8 px-4'>
            <div className='container max-w-md mx-auto'>
                <div className='text-center mb-8'>
                    <div className='flex justify-center mb-4'>
                        <div className='bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full'>
                            <Shield className='h-8 w-8 text-blue-600 dark:text-blue-400' />
                        </div>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>Admin Login</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Access the resume management dashboard</p>
                </div>

                <Card className='shadow-xl border-0'>
                    <CardHeader>
                        <CardTitle>Sign in to your account</CardTitle>
                        <CardDescription>Enter your administrator credentials to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-4'
                            >
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder='admin@company.com'
                                                    {...field}
                                                    disabled={isLoading}
                                                    autoComplete='email'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder='Enter your password'
                                                        {...field}
                                                        disabled={isLoading}
                                                        autoComplete='current-password'
                                                        className='pr-10'
                                                    />
                                                    <Button
                                                        type='button'
                                                        variant='ghost'
                                                        size='sm'
                                                        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        disabled={isLoading}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className='h-4 w-4 text-gray-400' />
                                                        ) : (
                                                            <Eye className='h-4 w-4 text-gray-400' />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex items-center space-x-2'>
                                    <Checkbox
                                        id='remember'
                                        checked={rememberMe}
                                        onCheckedChange={checked => setRememberMe(checked === true)}
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor='remember'
                                        className='text-sm text-gray-600 dark:text-gray-400 cursor-pointer'
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <Button
                                    type='submit'
                                    className='w-full'
                                    size='lg'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <Shield className='w-4 h-4 mr-2' />
                                            Sign in as Admin
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className='mt-6 text-center text-sm text-gray-500 dark:text-gray-400'>
                            <p>For demo purposes, use:</p>
                            <div className='mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs font-mono'>
                                Email: admin@example.com
                                <br />
                                Password: password123
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className='text-center mt-6'>
                    <Button
                        variant='ghost'
                        asChild
                        className='text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                    >
                        <a href='/'>← Back to Application Form</a>
                    </Button>
                </div>
            </div>
        </div>
    );
};
