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

### Nginx Komutları
```bash
# Nginx durumu
sudo systemctl status nginx

# Restart
sudo systemctl restart nginx

# Konfigürasyon testi
sudo nginx -t

# Logları görüntüle
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Sistem Logları
```bash
# Uygulama logları
pm2 logs mactech --lines 100

# Sistem kullanımı
pm2 monit

# Disk kullanımı
df -h

# Memory kullanımı
free -h
```

## 🔒 SSL Sertifikası (HTTPS)

### Let's Encrypt ile ücretsiz SSL
```bash
# Certbot kurulumu (setup script'te yapılır)
sudo apt install certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d mactech.example.com

# Otomatik yenileme testi
sudo certbot renew --dry-run
```

## 🚨 Sorun Giderme

### Deployment başarısız oluyor
1. GitHub Actions loglarını kontrol edin: **Actions** sekmesi
2. VPS'te SSH bağlantısını test edin: `ssh -i ~/.ssh/github_actions user@host`
3. VPS'te disk alanı kontrol edin: `df -h`

### Uygulama çalışmıyor
```bash
# PM2 durumunu kontrol et
pm2 status

# Logları incele
pm2 logs mactech --lines 50

# Manuel başlat
cd /var/www/mactech
pnpm start
```

### Nginx hatası
```bash
# Konfigürasyon testi
sudo nginx -t

# Error loglarını kontrol et
sudo tail -f /var/log/nginx/error.log

# Nginx restart
sudo systemctl restart nginx
```

### Port 3000 kullanımda
```bash
# Port kullanan process'i bul
sudo lsof -i :3000

# Process'i öldür
sudo kill -9 <PID>
```

## 🔧 Yapılandırma

### Environment Variables
VPS'te `.env.local` dosyası oluşturun:
```bash
cd /var/www/mactech
nano .env.local
```

```env
NODE_ENV=production
PORT=3000
```

### PM2 Ecosystem (Gelişmiş)
```bash
cd /var/www/mactech
pm2 ecosystem
```

`ecosystem.config.js` dosyasını düzenleyin:
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

Başlat:
```bash
pm2 start ecosystem.config.js
```

## 📈 Performans Optimizasyonu

### Nginx Caching
`/etc/nginx/sites-available/mactech` dosyasına cache ekleyin (setup script'te vardır).

### PM2 Cluster Mode
```bash
pm2 start npm --name "mactech" -i max -- start
```

### Gzip Compression
Nginx konfigürasyonunda aktif (setup script'te vardır).

## 🔄 Güncelleme ve Bakım

### Node.js güncelleme
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update && sudo apt upgrade nodejs
```

### pnpm güncelleme
```bash
npm install -g pnpm@latest
```

### Sistem güncellemeleri
```bash
sudo apt update && sudo apt upgrade -y
sudo reboot  # Gerekirse
```

## 📞 Yardım

Sorun yaşarsanız:
1. GitHub Issues açın
2. PM2 ve Nginx loglarını kontrol edin
3. VPS sistem kaynaklarını kontrol edin (`htop`, `df -h`, `free -h`)

## 📝 Notlar

- **Port 3000**: Next.js uygulaması bu portta çalışır
- **Nginx**: Port 80/443'ten gelen istekleri 3000'e yönlendirir
- **PM2**: Uygulama crash olursa otomatik restart eder
- **GitHub Actions**: Main branch'e push olduğunda otomatik deploy olur

## 🎯 Production Checklist

- [ ] VPS setup tamamlandı
- [ ] SSH key oluşturuldu
- [ ] GitHub Secrets eklendi
- [ ] Nginx kuruldu ve yapılandırıldı
- [ ] SSL sertifikası alındı
- [ ] PM2 başlatma scripti çalışıyor
- [ ] Firewall yapılandırıldı
- [ ] Domain DNS kayıtları yapılandırıldı
- [ ] İlk deployment başarılı
- [ ] Monitoring aktif
