import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './validation';

export interface FileValidationError {
    type: 'size' | 'format' | 'unknown';
    message: string;
}

export const validateFile = (file: File): FileValidationError | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return {
            type: 'format',
            message: 'Please upload a PDF or Word document (.pdf, .doc, .docx)'
        };
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            type: 'size',
            message: 'File size must be less than 10MB'
        };
    }

    return null;
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const isValidFileType = (file: File): boolean => {
    return ALLOWED_FILE_TYPES.includes(file.type);
};

export const createFileDownloadUrl = (blob: Blob, filename: string): string => {
    const url = window.URL.createObjectURL(blob);
    return url;
};

export const downloadFile = (url: string, filename: string): void => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
