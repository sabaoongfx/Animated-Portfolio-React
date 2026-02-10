# Animated Portfolio

An open-source, production-ready portfolio template featuring 3D animations, smooth page transitions, and a modern tech stack. Built with React 19, TypeScript, and Three.js.

Perfect for developers, designers, and creatives who want a stunning portfolio with minimal setup.

## Features

- Animated 3D backgrounds with Three.js
- Smooth page transitions with Framer Motion
- Dark/Light theme support
- Multi-language support (i18n)
- Contact form with database storage
- Admin panel for managing contacts
- Responsive design for all devices
- File upload capabilities
- Production-ready with Vercel deployment
- TypeScript for type safety
- Tailwind CSS for easy customization

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, React Router
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Backend**: Vercel Serverless Functions
- **Database**: Vercel Postgres
- **Storage**: Vercel Blob
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sabaoongfx/Animated-Portfolio-React.git
   cd Animated-Portfolio-React
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` and configure the following:

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Vercel Postgres connection URL |
| `POSTGRES_URL_NON_POOLING` | Vercel Postgres non-pooling URL |
| `ADMIN_EMAIL` | Admin panel login email |
| `ADMIN_SECRET` | Admin panel login password |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token (auto-configured on Vercel) |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
