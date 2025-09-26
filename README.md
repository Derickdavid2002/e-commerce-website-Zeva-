# Zeva - E-commerce Clothing Store

A modern, responsive e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Customer Features
- **Product Catalog**: Browse products with filtering and search
- **Shopping Cart**: Add/remove items, quantity management
- **Multi-Step Checkout**: Delivery details, payment info, proof upload
- **Responsive Design**: Mobile-first approach with purple theme

### Admin Features
- **Dashboard**: Overview of orders, products, and analytics
- **Product Management**: Add, edit, and manage product catalog
- **Order Management**: View orders, confirm payments, manage delivery
- **Authentication**: Secure admin login system

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Authentication**: Firebase Auth (placeholder)
- **Database**: Firebase Firestore (placeholder)
- **Storage**: Firebase Storage (placeholder)
- **Email**: EmailJS (placeholder)

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd zeva
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Firebase Setup (Required for Production)

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication, Firestore, and Storage

### 2. Configure Firebase
1. Replace placeholders in `lib/firebase.ts` with your Firebase config
2. Replace placeholders in `lib/firebase-admin.ts` with admin SDK config
3. Set up environment variables:
   \`\`\`env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   \`\`\`

### 3. Set up Firestore Collections
Create these collections in Firestore:
- `products` - Product catalog
- `orders` - Customer orders
- `users` - User accounts (optional)

### 4. Set up Firebase Storage
Create folders for:
- `product-images/` - Product photos
- `payment-proofs/` - Payment screenshots

## EmailJS Setup (Required for Email Notifications)

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Set up email service and template
3. Replace placeholders in `lib/emailjs.ts` with your keys

## Admin Access

**Demo Credentials:**
- Email: admin@zeva.com
- Password: admin123

**Production:** Replace with Firebase Authentication

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── checkout/          # Checkout flow
│   ├── products/          # Product pages
│   └── cart/              # Shopping cart
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configurations
│   ├── firebase.ts       # Firebase config (placeholder)
│   ├── emailjs.ts        # EmailJS config (placeholder)
│   └── types.ts          # TypeScript types
└── public/               # Static assets
\`\`\`

## Key Features Implementation

### Shopping Cart
- Context-based state management
- Persistent across page navigation
- Real-time price calculations

### Multi-Step Checkout
1. **Delivery Details**: Customer information collection
2. **Payment Info**: Bank transfer details display
3. **Proof Upload**: Payment screenshot upload

### Admin Dashboard
- Order management with payment confirmation
- Product catalog management
- Customer information viewing
- Delivery type assignment

## Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy to Vercel**
   \`\`\`bash
   npx vercel
   \`\`\`

3. **Set environment variables** in Vercel dashboard

## TODO: Manual Setup Required

- [ ] Configure Firebase project and replace placeholders
- [ ] Set up EmailJS account and replace placeholders
- [ ] Add actual product images
- [ ] Set up payment processing (if needed)
- [ ] Configure domain and SSL
- [ ] Set up analytics (optional)

## Support

For questions or issues, contact: support@zeva.com

## License

MIT License - see LICENSE file for details
