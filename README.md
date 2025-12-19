# Vue.js SaaS Starter Template

A modern starter template built with Vue 3, Clerk, and shadcn-vue components. This template provides everything you need to quickly bootstrap a web application with secure authentication, beautiful UI components, and best practices built-in.

## Overview

This starter template solves common authentication challenges and provides a solid foundation for building web applications. It includes:

- Complete authentication flows (Sign In, Sign Up, Password Reset) using custom Clerk auth components
- Email verification system
- Protected and public routes with navigation guards
- Responsive and accessible UI components
- Multiple demo pages ready to customize for your specific needs
- Dark/Light mode theming
- TypeScript support
- Modern development tools with Vite

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite 6
- **Authentication**: Clerk Vue SDK
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-vue + Radix Vue primitives
- **Icons**: Lucide Vue Next & Iconify
- **Form Validation**: Vee-Validate + Zod
- **Internationalization**: Vue I18n
- **Utilities**: VueUse, Class Variance Authority
- **Development**: TypeScript, Vue TSC

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables:
   Create a `.env` file with your Clerk credentials:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

## Available Scripts

- `pnpm run dev` - Starts development server with Vite
- `pnpm run build` - Creates production build (runs TypeScript checks and builds)
- `pnpm run preview` - Preview production build locally

## Features

### Authentication
- Email/Password authentication
- Email verification flow
- Password reset functionality
- Protected routes with navigation guards
- Authentication state management with Clerk Vue SDK
- Automatic redirect for authenticated/unauthenticated users

### UI/UX
- Responsive design for all screen sizes
- Dark/Light mode support
- Loading states and animations
- Clean and modern UI components
- Accessible components using Radix Vue
- Collapsible sidebar navigation
- Beautiful pre-built pages (Dashboard, Settings, Billing)

### Development
- TypeScript for type safety
- Composition API for better code organization
- Modern development setup with Vite
- Hot Module Replacement (HMR)
- Organized project structure with layouts
- Ready-to-use UI components library
- Form validation with Vee-Validate and Zod schemas

## Project Structure

```
src/
├── components/          # Reusable components
│   └── ui/             # shadcn-vue UI components
├── layouts/            # Layout components (AppLayout, etc.)
├── router/             # Vue Router configuration
├── views/              # Page components
│   ├── settings/       # Settings pages (Profile, Appearance)
│   ├── SignIn.vue
│   ├── SignUp.vue
│   ├── ResetPassword.vue
│   ├── Dashboard.vue
│   └── ...
├── App.vue             # Root component
└── main.ts             # Application entry point
```

## Routes

### Public Routes
- `/` - Home page
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- `/reset-password` - Password reset page
- `/navlink1-4` - Demo navigation pages

### Protected Routes (requires authentication)
- `/app/dashboard` - Main dashboard
- `/app/page-one` - Demo protected page for a an element without subitem links
- `/app/settings/profile` - User profile settings
- `/app/settings/appearance` - Theme and appearance settings
- `/app/billing` - Billing page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT license.
