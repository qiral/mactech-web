# MacTech Summit Website

Official website for MacTech Computer Science Summit.

## Requirements

- Node.js 20+
- pnpm 9+

## Installation

```bash
# Clone the repository
git clone https://github.com/Hikmettpk/MacTech.git
cd MacTech

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Create production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint check
```

## Configuration

### Event Information
Edit the `EVENT_CONFIG`, `SPEAKERS`, `SPONSORS`, `SCHEDULE` variables in `app/page.tsx`.

### Luma.com Integration
Replace the `REGISTER_URL` value in `app/register/page.tsx` with your own Luma event ID.

## Deployment

### Automated VPS Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

**Quick start:**

1. Prepare your VPS:
```bash
# Connect to VPS
ssh root@YOUR_VPS_IP

# Run setup script
curl -O https://raw.githubusercontent.com/Hikmettpk/MacTech/main/scripts/vps-setup.sh
chmod +x vps-setup.sh
./vps-setup.sh
```

2. Add GitHub Secrets:
   - `VPS_HOST`: VPS IP address
   - `VPS_USERNAME`: SSH username
   - `VPS_SSH_KEY`: Private SSH key
   - `VPS_APP_PATH`: `/var/www/mactech`

3. Push to main branch - Automatic deployment will trigger!


## Project Structure

```
mactech/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page
│   ├── register/          # Registration page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   └── ui/               # UI components (Radix)
├── public/               # Static files
│   ├── speakers/         # Speaker photos
│   └── sponsors/         # Sponsor logos
├── scripts/              # Deployment scripts
│   └── vps-setup.sh     # VPS setup script
└── .github/              # GitHub Actions workflows
    └── workflows/
        └── deploy.yml    # Automated deployment
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
