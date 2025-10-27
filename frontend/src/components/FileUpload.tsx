import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize, validateFile, type FileValidationError } from '@/lib/fileUtils';
import { ALLOWED_FILE_TYPES } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    selectedFile: File | null;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export const FileUpload = ({ onFileSelect, selectedFile, error, disabled, className }: FileUploadProps) => {
    const [validationError, setValidationError] = useState<FileValidationError | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            setIsDragActive(false);

            if (rejectedFiles.length > 0) {
                setValidationError({
                    type: 'format',
                    message: 'Please upload a PDF or Word document (.pdf, .doc, .docx)'
                });
                return;
            }

            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const validation = validateFile(file);

                if (validation) {
                    setValidationError(validation);
                    onFileSelect(null);
                } else {
                    setValidationError(null);
                    onFileSelect(file);
                }
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        multiple: false,
        disabled,
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false)
    });

    const removeFile = () => {
        setValidationError(null);
        onFileSelect(null);
    };

    const displayError = error || validationError?.message;

    return (
        <div className={cn('space-y-2', className)}>
            {!selectedFile ? (
                <div
                    {...getRootProps()}
                    className={cn(
                        'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                        {
                            'border-primary bg-primary/5': isDragAccept,
                            'border-destructive bg-destructive/5': isDragReject || displayError,
                            'border-muted-foreground/25 hover:border-muted-foreground/50':
                                !isDragActive && !displayError,
                            'opacity-50 cursor-not-allowed': disabled
                        }
                    )}
                >
                    <input {...getInputProps()} />
                    <div className='flex flex-col items-center gap-2'>
                        <Upload className='h-10 w-10 text-muted-foreground' />
                        <div className='text-sm'>
                            <span className='font-medium'>Click to upload</span> or drag and drop
                        </div>
                        <div className='text-xs text-muted-foreground'>PDF or Word documents (max 10MB)</div>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-between p-3 bg-muted rounded-lg'>
                    <div className='flex items-center gap-2 min-w-0 flex-1'>
                        <File className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                        <div className='min-w-0 flex-1'>
                            <p className='text-sm font-medium truncate'>{selectedFile.name}</p>
                            <p className='text-xs text-muted-foreground'>{formatFileSize(selectedFile.size)}</p>
                        </div>
                    </div>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={removeFile}
                        disabled={disabled}
                        className='flex-shrink-0'
                    >
                        <X className='h-4 w-4' />
                    </Button>
                </div>
            )}

            {displayError && (
                <div className='flex items-center gap-2 text-sm text-destructive'>
                    <AlertCircle className='h-4 w-4 flex-shrink-0' />
                    <span>{displayError}</span>
                </div>
            )}

            <div className='text-xs text-muted-foreground'>
                Supported formats:{' '}
                {ALLOWED_FILE_TYPES.map(type => {
                    if (type === 'application/pdf') return 'PDF';
                    if (type === 'application/msword') return 'DOC';
                    if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
                        return 'DOCX';
                    return '';
                })
                    .filter(Boolean)
                    .join(', ')}
            </div>
        </div>
    );
};
