# VPS Deployment Guide

This project automatically deploys to your VPS using GitHub Actions.

## Requirements

- Ubuntu 20.04+ VPS
- Root or sudo access
- Domain name (optional, works with IP)
- GitHub account

## VPS Initial Setup

### 1. Connect to your VPS via SSH
```bash
ssh root@YOUR_VPS_IP
```

### 2. Run the setup script
```bash
# Download the script
curl -O https://raw.githubusercontent.com/Hikmettpk/MacTech/main/scripts/vps-setup.sh

# Edit it (add your own values)
nano vps-setup.sh

# Make it executable
chmod +x vps-setup.sh

# Run it
./vps-setup.sh
```

### 3. Create SSH Key (for GitHub Actions)
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions  # Copy this private key to GitHub Secrets
```

## GitHub Secrets Setup

Go to your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

Add the following secrets:

| Secret Name | Description | Example |
|------------|----------|-------|
| `VPS_HOST` | VPS IP address | `123.45.67.89` |
| `VPS_USERNAME` | SSH username | `root` or `ubuntu` |
| `VPS_SSH_KEY` | Private SSH key | Key generated with `ssh-keygen` |
| `VPS_PORT` | SSH port (optional) | `22` (default) |
| `VPS_APP_PATH` | Application directory | `/var/www/mactech` |

### Steps to add secrets:
1. In GitHub repo go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** button
3. Enter name and value for each secret
4. Click **Add secret** to save

## Deployment Workflow

### Automatic Deployment
Every push to main branch:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

GitHub Actions will automatically:
1. Test the code
2. Build the project
3. Deploy to VPS
4. Restart with PM2

### Manual Deployment (on VPS)
```bash
cd /var/www/mactech
git pull origin main
pnpm install
pnpm build
pm2 restart mactech
```

## Monitoring and Maintenance

### PM2 Commands
```bash
# Application status
pm2 status

# View logs
pm2 logs mactech

# Restart
pm2 restart mactech

# Stop
pm2 stop mactech

# Start
pm2 start mactech
```

### Nginx Commands
```bash
# Nginx status
sudo systemctl status nginx

# Restart
sudo systemctl restart nginx

# Configuration test
sudo nginx -t

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### System Logs
```bash
# Application logs
pm2 logs mactech --lines 100

# System usage
pm2 monit

# Disk usage
df -h

# Memory usage
free -h
```

## SSL Certificate (HTTPS)

### Free SSL with Let's Encrypt
```bash
# Install Certbot (done in setup script)
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d mactech.example.com

# Test automatic renewal
sudo certbot renew --dry-run
```

## Troubleshooting

### Deployment fails
1. Check GitHub Actions logs: **Actions** tab
2. Test SSH connection on VPS: `ssh -i ~/.ssh/github_actions user@host`
3. Check disk space on VPS: `df -h`

### Application not running
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs mactech --lines 50

# Start manually
cd /var/www/mactech
pnpm start
```

### Nginx error
```bash
# Configuration test
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Port 3000 in use
```bash
# Find process using port
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

## Configuration

### Environment Variables
Create `.env.local` file on VPS:
```bash
cd /var/www/mactech
nano .env.local
```

```env
NODE_ENV=production
PORT=3000
```

### PM2 Ecosystem (Advanced)
```bash
cd /var/www/mactech
pm2 ecosystem
```

Edit `ecosystem.config.js` file:
```javascript
module.exports = {
  apps: [{
    name: 'mactech',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/mactech',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Start:
```bash
pm2 start ecosystem.config.js
```

## Performance Optimization

### Nginx Caching
Add cache to `/etc/nginx/sites-available/mactech` file (included in setup script).

### PM2 Cluster Mode
```bash
pm2 start npm --name "mactech" -i max -- start
```

### Gzip Compression
Active in Nginx configuration (included in setup script).

## Updates and Maintenance

### Update Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update && sudo apt upgrade nodejs
```

### Update pnpm
```bash
npm install -g pnpm@latest
```

### System updates
```bash
sudo apt update && sudo apt upgrade -y
sudo reboot  # If needed
```

## Help

If you experience issues:
1. Open GitHub Issues
2. Check PM2 and Nginx logs
3. Check VPS system resources (`htop`, `df -h`, `free -h`)

## Notes

- **Port 3000**: Next.js application runs on this port
- **Nginx**: Forwards requests from port 80/443 to 3000
- **PM2**: Automatically restarts application if it crashes
- **GitHub Actions**: Automatic deployment when pushing to main branch

## Production Checklist

- [ ] VPS setup completed
- [ ] SSH key created
- [ ] GitHub Secrets added
- [ ] Nginx installed and configured
- [ ] SSL certificate obtained
- [ ] PM2 startup script running
- [ ] Firewall configured
- [ ] Domain DNS records configured
- [ ] First deployment successful
- [ ] Monitoring active
