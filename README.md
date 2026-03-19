# Women's Catalog Website

## About This Project

Welcome to our Women's Catalog Website! This is a modern, responsive e-commerce platform dedicated to showcasing a curated collection of women's fashion items including cardigans, sweaters, jackets, and more. Browse through our exclusive selection of stylish and high-quality apparel designed for every season and occasion.

## Features

- **Product Catalog**: Browse an extensive collection of women's cardigans, sweaters, and fashion items
- **Best Sellers**: Check out our most popular items and customer favorites
- **Product Details**: Detailed product information including descriptions, pricing, and availability
- **Search Functionality**: Easily find products using our search feature
- **Product Categories**: Organized categories to help you navigate and discover items
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS for a sleek user experience

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd Catalog-Website

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` with hot module reloading enabled.

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Package Manager**: npm / Bun

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BestSellers.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroCarousel.tsx
│   └── ui/             # UI component library
├── pages/              # Page components
│   ├── Index.tsx
│   ├── Products.tsx
│   ├── ProductCategory.tsx
│   ├── ProductDetails.tsx
│   ├── SearchResults.tsx
│   ├── AboutUs.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Images and static files
```

## Development

To run the development server with hot reloading:

```sh
npm run dev
```

To build for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0923c0b9-8e4f-4734-92c1-662efb1761c4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
