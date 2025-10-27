import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { Application, ApplicationsResponse, ApplicationSubmissionResponse } from '@/types/application';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockApplications: Application[] = [
    {
        id: '1',
        fullName: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phoneNumber: '+1-555-0123',
        linkedinProfile: 'https://linkedin.com/in/alice-johnson',
        portfolioWebsite: 'https://alice-portfolio.com',
        jobPosition: 'Frontend Developer',
        resumeUrl: '/files/alice_johnson_resume.pdf',
        resumeFileName: 'alice_johnson_resume.pdf',
        status: 'new',
        additionalNotes: 'Passionate about React and modern web technologies.',
        submittedAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
    },
    {
        id: '2',
        fullName: 'Bob Smith',
        email: 'bob.smith@email.com',
        phoneNumber: '+1-555-0124',
        jobPosition: 'Backend Developer',
        resumeUrl: '/files/bob_smith_resume.pdf',
        resumeFileName: 'bob_smith_resume.pdf',
        status: 'reviewed',
        additionalNotes: '5 years of experience with Node.js and Python.',
        adminNotes: 'Strong technical background. Schedule for interview.',
        submittedAt: '2024-01-14T14:20:00.000Z',
        updatedAt: '2024-01-16T09:15:00.000Z'
    },
    {
        id: '3',
        fullName: 'Carol Davis',
        email: 'carol.davis@email.com',
        linkedinProfile: 'https://linkedin.com/in/carol-davis',
        jobPosition: 'UI/UX Designer',
        resumeUrl: '/files/carol_davis_resume.pdf',
        resumeFileName: 'carol_davis_resume.pdf',
        status: 'shortlisted',
        additionalNotes: 'Portfolio showcases excellent design skills.',
        adminNotes: 'Great portfolio. Moving to final interview round.',
        submittedAt: '2024-01-13T16:45:00.000Z',
        updatedAt: '2024-01-17T11:30:00.000Z'
    },
    {
        id: '4',
        fullName: 'David Wilson',
        email: 'david.wilson@email.com',
        phoneNumber: '+1-555-0125',
        jobPosition: 'Data Scientist',
        resumeUrl: '/files/david_wilson_resume.pdf',
        resumeFileName: 'david_wilson_resume.pdf',
        status: 'rejected',
        additionalNotes: 'PhD in Statistics with machine learning focus.',
        adminNotes: 'Overqualified for this position.',
        submittedAt: '2024-01-12T09:10:00.000Z',
        updatedAt: '2024-01-18T13:45:00.000Z'
    },
    {
        id: '5',
        fullName: 'Emma Brown',
        email: 'emma.brown@email.com',
        phoneNumber: '+1-555-0126',
        portfolioWebsite: 'https://emmabrown.dev',
        jobPosition: 'Full Stack Developer',
        resumeUrl: '/files/emma_brown_resume.pdf',
        resumeFileName: 'emma_brown_resume.pdf',
        status: 'new',
        additionalNotes: 'Full stack developer with React and Django experience.',
        submittedAt: '2024-01-16T08:20:00.000Z',
        updatedAt: '2024-01-16T08:20:00.000Z'
    }
];

export const mockApplicationsResponse: ApplicationsResponse = {
    applications: mockApplications,
    total: mockApplications.length,
    page: 1,
    limit: 10,
    totalPages: 1
};

export const mockApplicationSubmissionResponse: ApplicationSubmissionResponse = {
    id: '6',
    message: 'Application submitted successfully!',
    referenceNumber: 'REF-2024-001'
};
