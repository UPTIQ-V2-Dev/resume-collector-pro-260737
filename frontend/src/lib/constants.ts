export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data'
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const JOB_POSITIONS = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
    'Quality Assurance Engineer',
    'Mobile Developer',
    'Marketing Specialist',
    'Business Analyst',
    'Customer Support Representative'
] as const;
