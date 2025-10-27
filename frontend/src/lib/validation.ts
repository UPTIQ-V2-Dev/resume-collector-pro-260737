import { z } from 'zod';

// File validation constants
export const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// File validation schema
export const fileSchema = z.custom<File>(
    file => {
        if (!(file instanceof File)) return false;
        if (!ALLOWED_FILE_TYPES.includes(file.type)) return false;
        if (file.size > MAX_FILE_SIZE) return false;
        return true;
    },
    {
        message: 'File must be PDF or Word document under 10MB'
    }
);

// Application form validation schema
export const applicationFormSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phoneNumber: z.string().optional().or(z.literal('')),
    linkedinProfile: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    portfolioWebsite: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    jobPosition: z.string().min(1, 'Please select a job position'),
    resume: fileSchema.nullable().refine(file => file !== null, {
        message: 'Please upload your resume'
    }),
    additionalNotes: z.string().optional().or(z.literal(''))
});

// Admin login validation schema
export const adminLoginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

// Update application status schema
export const updateStatusSchema = z.object({
    status: z.enum(['new', 'reviewed', 'shortlisted', 'rejected']),
    adminNotes: z.string().optional()
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
export type UpdateStatusData = z.infer<typeof updateStatusSchema>;
