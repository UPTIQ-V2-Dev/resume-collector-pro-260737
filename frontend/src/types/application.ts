export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected';

export interface ApplicationFormData {
    fullName: string;
    email: string;
    phoneNumber?: string;
    linkedinProfile?: string;
    portfolioWebsite?: string;
    jobPosition: string;
    resume: File | null;
    additionalNotes?: string;
}

export interface CreateApplicationRequest {
    fullName: string;
    email: string;
    phoneNumber?: string;
    linkedinProfile?: string;
    portfolioWebsite?: string;
    jobPosition: string;
    additionalNotes?: string;
}

export interface Application {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    linkedinProfile?: string;
    portfolioWebsite?: string;
    jobPosition: string;
    resumeUrl: string;
    resumeFileName: string;
    status: ApplicationStatus;
    additionalNotes?: string;
    adminNotes?: string;
    submittedAt: string;
    updatedAt: string;
}

export interface ApplicationsResponse {
    applications: Application[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetApplicationsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: ApplicationStatus;
    jobPosition?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface UpdateApplicationStatusRequest {
    status: ApplicationStatus;
    adminNotes?: string;
}

export interface FileUploadResponse {
    url: string;
    fileName: string;
}

export interface ApplicationSubmissionResponse {
    id: string;
    message: string;
    referenceNumber?: string;
}

export interface ExportApplicationsParams {
    status?: ApplicationStatus;
    jobPosition?: string;
    startDate?: string;
    endDate?: string;
}
