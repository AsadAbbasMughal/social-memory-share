# Social Memory Share

**A photo-sharing app with user authentication, memory uploads, gallery view, and responsive design using Supabase.**

## Key Points in the Structure:

### 1. Project Overview
Social Memory Share is a simple photo-sharing platform where users can upload photos, add titles and descriptions, and view memories in a gallery. The app is designed to allow easy sign-ups, logins, and photo uploads. It also offers a clean, responsive interface with the ability to delete one's own photos.

### 2. Core Features
- **User authentication**: Signup and login using email.
- **Memory uploads**: Users can upload photos along with a title and description.
- **Gallery view**: View a gallery of all shared memories in a grid layout.
- **Delete functionality**: Users can delete their own photos from the gallery.
  
### 3. Styling & Design
The platform uses a **light theme** with minimalist design principles. The design focuses on simplicity and clarity with intuitive navigation and responsive layouts.

- **Primary color**: `#4F46E5` (Indigo) for key actions and highlights.
- **Background color**: `#F9FAFB` (Light theme background) to provide a soft visual experience.
- **Text color**: `#111827` (Dark text color) for high readability.
- **Accent color**: `#818CF8` (Light indigo) for hover effects and accents.

To maintain consistency, we use **CSS variables** which are organized under the `.color-theme` class, making it easy to update the entire platform’s color scheme.

### 4. Pages and UI

- **Login/Signup Page**:
   - A simple, centered form with fields for email and password.
   - Clear validation messages for user-friendly feedback.
   - Smooth transitions and animations to enhance user experience.

- **Gallery Page**:
   - A grid layout displays photos with a hover effect for better interaction.
   - Includes an upload button located in the header for easy access.
   - Fully responsive design to accommodate different screen sizes.

- **Upload Modal**:
   - An image preview shows what’s about to be uploaded.
   - Input fields for adding a title and description.
   - Provides feedback (success or error messages) after the upload action.

### 5. Installation and Setup
To get started with the project on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AsadAbbasMughal/social-memory-share.git
