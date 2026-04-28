# GlobalUtils - Privacy-First Multi-Language Utility Toolbox

A professional, privacy-focused collection of developer tools built with Next.js 15, featuring multi-language support and zero data storage.

## 🌟 Features

### Core Tools
- **JSON Formatter**: Format, validate, and beautify JSON data with syntax highlighting
- **Unit Converter**: Convert between different units of measurement (length, weight, temperature, area, volume)
- **Random Number Generator**: Generate random numbers with statistics and batch processing

### Key Features
- **Privacy-First**: All calculations happen client-side, no server storage
- **Multi-Language**: Support for English, Traditional Chinese (zh-TW), and Japanese
- **Auto Language Detection**: Automatically detects user's browser language
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **SEO Optimized**: Automatic sitemap generation and multi-language metadata
- **AdSense Ready**: Pre-configured ad banner areas for monetization

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4.2
- **Components**: Shadcn/ui (Radix UI)
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Fonts**: Geist & Geist Mono
- **Analytics**: Vercel Analytics

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Internationalization

The site automatically detects the user's browser language and redirects them to the appropriate locale:
- English: `/en`
- Traditional Chinese: `/zh-TW`
- Japanese: `/ja`

Users can manually switch languages using the language dropdown in the header.

## 🔧 Available Tools

### JSON Formatter
- Format JSON with custom indentation (2 spaces, 4 spaces, or tabs)
- Minify JSON for production
- Syntax error detection with helpful error messages
- Copy to clipboard functionality
- Download formatted JSON

### Unit Converter
- Length: meters, kilometers, miles, feet, inches, etc.
- Weight: kilograms, grams, pounds, ounces, etc.
- Temperature: Celsius, Fahrenheit, Kelvin
- Area: square meters, square feet, acres, hectares, etc.
- Volume: liters, gallons, quarts, cups, etc.

### Random Number Generator
- Generate single or multiple random numbers
- Customizable range and count
- Real-time statistics (sum, average, min, max)
- Copy results to clipboard
- Batch processing up to 100 numbers

## 🔒 Privacy & Security

- **Zero Storage**: No database, no localStorage usage
- **Client-Side Processing**: All computations happen in the browser
- **No User Tracking**: No analytics or tracking beyond basic Vercel Analytics
- **HTTPS Ready**: Secure connection support
- **CSRF Protection**: Built-in Next.js security features

## 📈 SEO

- Automatic sitemap generation at `/sitemap.xml`
- Multi-language metadata and OpenGraph tags
- Structured data markup
- Mobile-friendly responsive design
- Fast page load times with Next.js optimization

## 🎨 Customization

### Adding New Languages

1. Add the locale code to `i18n.ts`:
   ```typescript
   export const locales = ['en', 'zh-TW', 'ja', 'de'] as const
   ```

2. Create a new translation file in `messages/`:
   ```json
   // messages/de.json
   {
     "common": {
       "appName": "GlobalUtils",
       "tagline": "..."
     }
   }
   ```

### Adding New Tools

1. Create a new component in `components/`
2. Create a new page in `app/[locale]/tools/[tool-name]/page.tsx`
3. Add the tool to the sidebar in `components/app-sidebar.tsx`
4. Add translations to all `messages/*.json` files

## 🚢 Deployment

The site is ready for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Cloudflare Pages**

### Environment Variables
No environment variables are required for basic functionality.

Optional:
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- `NEXT_PUBLIC_ADSENSE_ID`: Google AdSense ID

## 📝 License

This project is open source and available for commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ using Next.js and modern web technologies.
