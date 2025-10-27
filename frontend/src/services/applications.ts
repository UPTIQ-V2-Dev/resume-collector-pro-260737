import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockApplications, mockApplicationSubmissionResponse } from '@/data/mockData';
import type {
    Application,
    ApplicationsResponse,
    CreateApplicationRequest,
    GetApplicationsParams,
    UpdateApplicationStatusRequest,
    ApplicationSubmissionResponse,
    ExportApplicationsParams,
    FileUploadResponse
} from '@/types/application';

export const applicationsService = {
    // Submit new application
    submitApplication: async (applicationData: CreateApplicationRequest): Promise<ApplicationSubmissionResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: submitApplication ---', applicationData);
            await mockApiDelay();
            return mockApplicationSubmissionResponse;
        }

        const response = await api.post('/applications', applicationData);
        return response.data;
    },

    // Upload resume file
    uploadResume: async (file: File): Promise<FileUploadResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: uploadResume ---', { fileName: file.name, size: file.size });
            await mockApiDelay();
            return {
                url: `/files/${file.name}`,
                fileName: file.name
            };
        }

        const formData = new FormData();
        formData.append('resume', file);

        const response = await api.post('/applications/upload-resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Get applications list (admin only)
    getApplications: async (params: GetApplicationsParams = {}): Promise<ApplicationsResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplications ---', params);
            await mockApiDelay();

            // Simple filtering for mock data
            let filteredApplications = [...mockApplications];

            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredApplications = filteredApplications.filter(
                    app =>
                        app.fullName.toLowerCase().includes(searchLower) ||
                        app.email.toLowerCase().includes(searchLower) ||
                        app.jobPosition.toLowerCase().includes(searchLower)
                );
            }

            if (params.status) {
                filteredApplications = filteredApplications.filter(app => app.status === params.status);
            }

            if (params.jobPosition) {
                filteredApplications = filteredApplications.filter(app => app.jobPosition === params.jobPosition);
            }

            return {
                applications: filteredApplications,
                total: filteredApplications.length,
                page: params.page || 1,
                limit: params.limit || 10,
                totalPages: Math.ceil(filteredApplications.length / (params.limit || 10))
            };
        }

        const response = await api.get('/admin/applications', { params });
        return response.data;
    },

    // Get single application details (admin only)
    getApplication: async (id: string): Promise<Application> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplication ---', { id });
            await mockApiDelay();
            const application = mockApplications.find(app => app.id === id);
            if (!application) {
                throw new Error('Application not found');
            }
            return application;
        }

        const response = await api.get(`/admin/applications/${id}`);
        return response.data;
    },

    // Update application status (admin only)
    updateApplicationStatus: async (id: string, data: UpdateApplicationStatusRequest): Promise<Application> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: updateApplicationStatus ---', { id, data });
            await mockApiDelay();
            const application = mockApplications.find(app => app.id === id);
            if (!application) {
                throw new Error('Application not found');
            }
            return {
                ...application,
                status: data.status,
                adminNotes: data.adminNotes || application.adminNotes,
                updatedAt: new Date().toISOString()
            };
        }

        const response = await api.patch(`/admin/applications/${id}/status`, data);
        return response.data;
    },

    // Delete application (admin only)
    deleteApplication: async (id: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: deleteApplication ---', { id });
            await mockApiDelay();
            return;
        }

        await api.delete(`/admin/applications/${id}`);
    },

    // Download resume (admin only)
    downloadResume: async (id: string): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: downloadResume ---', { id });
            await mockApiDelay();
            // Return a mock PDF blob
            const pdfContent = 'Mock PDF content for resume';
            return new Blob([pdfContent], { type: 'application/pdf' });
        }

        const response = await api.get(`/admin/applications/${id}/resume`, {
            responseType: 'blob'
        });
        return response.data;
    },

    // Export applications data (admin only)
    exportApplications: async (params: ExportApplicationsParams = {}): Promise<Blob> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: exportApplications ---', params);
            await mockApiDelay();
            // Return a mock CSV blob
            const csvContent = `Full Name,Email,Job Position,Status,Submitted At
Alice Johnson,alice.johnson@email.com,Frontend Developer,new,2024-01-15T10:30:00.000Z
Bob Smith,bob.smith@email.com,Backend Developer,reviewed,2024-01-14T14:20:00.000Z`;
            return new Blob([csvContent], { type: 'text/csv' });
        }

        const response = await api.get('/admin/applications/export', {
            params,
            responseType: 'blob'
        });
        return response.data;
    }
};
