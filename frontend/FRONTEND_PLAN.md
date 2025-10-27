# Resume Collector App - Technical Implementation Plan

## Tech Stack

- React 19 + TypeScript
- Vite build tool
- shadcn/ui components
- Tailwind v4
- React Hook Form + Zod validation
- React Router DOM for navigation
- Axios for API calls
- React Query for state management

## Page-by-Page Implementation Plan

### 1. Application Form Page (`/`)

**Purpose**: Public form for applicants to submit resumes

**Components Needed**:

- `ResumeSubmissionForm.tsx` - Main form component
- `FileUpload.tsx` - Custom file upload with drag-and-drop
- `FormField.tsx` - Reusable form field wrapper

**Types**:

- `ApplicationFormData.ts` - Form data interface
- `FileUploadTypes.ts` - File upload validation types

**API Endpoints**:

- `POST /api/applications` - Submit application
- `POST /api/upload` - Upload resume file

**Utils**:

- `fileValidation.ts` - File type/size validation
- `formValidation.ts` - Zod schemas for form validation

**Features**:

- Form validation (required fields, email format, file type/size)
- File upload with progress indicator
- Form submission with loading states
- Success/error handling

### 2. Success Page (`/success`)

**Purpose**: Thank you page after successful submission

**Components Needed**:

- `SuccessMessage.tsx` - Success confirmation component
- `ContactInfo.tsx` - Optional contact information display

**Features**:

- Success message with application reference number
- Option to submit another application
- Contact information for follow-up

### 3. Admin Login Page (`/admin/login`)

**Purpose**: Secure login for administrators

**Components Needed**:

- `AdminLoginForm.tsx` - Login form component
- `AuthGuard.tsx` - Route protection component

**Types**:

- `AdminAuthTypes.ts` - Login credentials and responses

**API Endpoints**:

- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/refresh` - Token refresh

**Utils**:

- `authValidation.ts` - Login form validation
- `tokenManager.ts` - JWT token handling

**Features**:

- Email/password authentication
- Remember me functionality
- Error handling for invalid credentials
- Redirect to dashboard on success

### 4. Admin Dashboard Page (`/admin/dashboard`)

**Purpose**: Main admin interface for managing applications

**Components Needed**:

- `ApplicationsList.tsx` - Data table with applications
- `SearchFilter.tsx` - Search and filter controls
- `StatusBadge.tsx` - Application status indicator
- `ExportButton.tsx` - Export functionality
- `AdminSidebar.tsx` - Navigation sidebar
- `AdminLayout.tsx` - Wrapper layout for admin pages

**Types**:

- `ApplicationTypes.ts` - Application data interfaces
- `FilterTypes.ts` - Search/filter parameters

**API Endpoints**:

- `GET /api/admin/applications` - Fetch applications list
- `PATCH /api/admin/applications/:id/status` - Update application status
- `DELETE /api/admin/applications/:id` - Delete application
- `GET /api/admin/export` - Export applications data

**Utils**:

- `dataExport.ts` - CSV/Excel export functionality
- `dateUtils.ts` - Date formatting and filtering
- `statusUtils.ts` - Status management helpers

**Features**:

- Paginated applications table
- Search by name, email, position
- Filter by date range, status, position
- Sort by columns
- Bulk status updates
- Export to CSV/Excel
- Delete applications with confirmation

### 5. Applicant Detail Page (`/admin/applicants/:id`)

**Purpose**: Detailed view of single applicant

**Components Needed**:

- `ApplicantProfile.tsx` - Applicant information display
- `ResumeViewer.tsx` - Resume download/preview component
- `StatusUpdateForm.tsx` - Status change form
- `NotesSection.tsx` - Admin notes (optional feature)
- `EmailComposer.tsx` - Send email to applicant (optional)

**Types**:

- `ApplicantDetailTypes.ts` - Detailed applicant data

**API Endpoints**:

- `GET /api/admin/applications/:id` - Fetch applicant details
- `GET /api/admin/applications/:id/resume` - Download resume
- `POST /api/admin/applications/:id/notes` - Add notes
- `POST /api/admin/applications/:id/email` - Send email

**Utils**:

- `fileDownload.ts` - Resume download handling
- `emailTemplates.ts` - Pre-defined email templates

**Features**:

- Complete applicant information view
- Resume download with security checks
- Status update with reason
- Add/edit admin notes
- Email communication (optional)
- Application timeline/history

## Common Components & Utils

### Layout Components

- `AppLayout.tsx` - Main application layout
- `AdminLayout.tsx` - Admin section layout with sidebar
- `Header.tsx` - Application header
- `Footer.tsx` - Application footer (if needed)

### UI Components (using existing shadcn/ui)

- Forms: `form`, `input`, `textarea`, `select`, `button`
- Data Display: `table`, `card`, `badge`, `separator`
- Feedback: `alert`, `toast` (sonner), `dialog`, `sheet`
- Navigation: `sidebar`, `breadcrumb`

### Utils & Services

- `api.ts` - API client configuration
- `auth.ts` - Authentication service
- `constants.ts` - Application constants
- `helpers.ts` - Common utility functions
- `validators.ts` - Validation schemas

### Types

- `api.ts` - API response types
- `common.ts` - Shared type definitions
- `enums.ts` - Application enums (status, file types, etc.)

## Implementation Phases

### Phase 1: Core Setup

1. Set up routing with React Router
2. Create basic layout components
3. Set up API client and authentication
4. Create type definitions

### Phase 2: Public Application Form

1. Build form components with validation
2. Implement file upload functionality
3. Create success page
4. Add form submission logic

### Phase 3: Admin Authentication

1. Create login page and form
2. Implement authentication service
3. Set up route protection
4. Add token management

### Phase 4: Admin Dashboard

1. Build applications list with table
2. Add search and filter functionality
3. Implement status management
4. Create export functionality

### Phase 5: Admin Detail View

1. Build applicant detail page
2. Add resume download feature
3. Implement status updates
4. Add optional features (notes, email)

### Phase 6: Polish & Optional Features

1. Add loading states and error handling
2. Implement responsive design
3. Add optional features (analytics, dark mode)
4. Performance optimization
