# CostCraft - Construction Cost Estimator

CostCraft is an advanced web application designed to streamline the process of creating construction project quotes and estimates. Developed for Constructive Creativity, this tool leverages the New Rules of Measurement (NRM) to provide accurate, standardized project estimations.

## Features

- **Project Quote Requests**: Clients can submit detailed project information via a form, which is then sent to project managers via email. Project files are directly uploaded to Google Drive with client-specific access.
- **Supabase Authentication**: Clients and contractors can create accounts, allowing clients to access their quotes and contractors to input or update their pricing information.
- **Dynamic Quotation Form**: The application provides a highly interactive form that expands and adapts based on the specific needs of each project. Each form element comes with detailed hints and explanations, enhancing the user's ability to provide precise inputs.
- **Contractor Pricing**: Contractors can input custom prices or opt for default costs, which can be easily managed and updated throughout the platform.
- **Project Management Dashboard**: This feature allows for comprehensive viewing and management of all project aspects, including status updates, Google Drive links, and more.

## Tech Stack

The CostCraft application is built using the following technologies:

- **Frontend**: Next.js 14, React
- **Styling**: Tailwind CSS, Tailwind Merge, TailwindCSS Animate
- **Form Management**: React Hook Form, Zod (for validation), shadcn/ui with Radix UI (for UI components)
- **Authentication and Database**: Supabase (for auth and database)
- **Error Tracking**: Sentry
- **Icons and UI Enhancements**: Lucide React, CMDK
- **Additional Libraries**: Google APIs (for Google Drive integration)

This stack provides a robust, scalable platform for web application development with a focus on performance and user experience.

## Usage

- **Starting the App**: Run `npm start` to launch the app in production mode.
- **Building the App**: To build the app for production, use `npm run build`.
- **Linting**: Run `npm run lint` to check for linting errors within the codebase.

## Contributing

While CostCraft is publicly available as a part of my portfolio, it is designed for a specific client and is not open for direct public contribution. Should any issues arise, kindly submit them via GitHub issues. The project maintainers will evaluate and address them as needed.

## Copyright and License

&copy; 2024 Hubert Rogala-Haracz. All rights reserved. Unauthorized copying of this file, via any medium, is strictly prohibited. Proprietary and confidential.

## Acknowledgments

- Constructive Creativity for their invaluable domain expertise and feedback.
