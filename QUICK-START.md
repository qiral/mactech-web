# VPS Deployment - Quick Start

## Step 1: Prepare VPS (One-time setup)

```bash
# Connect to VPS
ssh root@YOUR_VPS_IP

# Download and run setup script
curl -O https://raw.githubusercontent.com/Hikmettpk/MacTech/main/scripts/vps-setup.sh
nano vps-setup.sh  # Edit variables (DOMAIN, GIT_REPO, etc.)
chmod +x vps-setup.sh
./vps-setup.sh

# Create SSH key (for GitHub Actions)
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions  # Copy this output
```

## Step 2: Add GitHub Secrets

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Value | Example |
|--------|-------|---------|
| VPS_HOST | VPS IP | `123.45.67.89` |
| VPS_USERNAME | SSH user | `root` |
| VPS_SSH_KEY | Private key | Output from `ssh-keygen` |
| VPS_PORT | SSH port | `22` |
| VPS_APP_PATH | App directory | `/var/www/mactech` |

## Step 3: Deploy

```bash
git add .
git commit -m "feat: deployment setup"
git push origin main
```

GitHub Actions will run automatically!

## Monitoring

```bash
# Application status
pm2 status

# Logs
pm2 logs mactech

# System status
pm2 monit
```

## Add SSL (Optional)

```bash
sudo certbot --nginx -d yourdomain.com
```

## Troubleshooting

```bash
# Check logs
pm2 logs mactech --lines 50
sudo tail -f /var/log/nginx/error.log

# Manual restart
cd /var/www/mactech
pm2 restart mactech
```

## Emergency Commands

```bash
# Application crashed
pm2 restart mactech

# Port 3000 in use
sudo lsof -i :3000
sudo kill -9 <PID>

# Nginx restart
sudo systemctl restart nginx

# Full reset (careful!)
pm2 delete mactech
cd /var/www/mactech
pnpm build
pm2 start npm --name "mactech" -- start
```

---

**Detailed documentation:** [DEPLOYMENT.md](./DEPLOYMENT.md)
