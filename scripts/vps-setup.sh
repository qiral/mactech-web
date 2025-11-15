#!/bin/bash
set -e

echo "MacTech VPS Setup starting..."

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

APP_NAME="mactech"
APP_PATH="/var/www/mactech"
APP_PORT="3000"
DOMAIN="mactech.macsec.club" 
GIT_REPO="git@github.com:metharda/mactech.git"
CERTBOT_EMAIL="info@macsec.club"

echo -e "${GREEN}1. Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${GREEN}2. Installing Node.js and pnpm...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install -g pnpm

echo -e "${GREEN}3. Installing PM2 (process manager)...${NC}"
sudo npm install -g pm2

echo -e "${GREEN}4. Installing Nginx...${NC}"
sudo apt install -y nginx

echo -e "${GREEN}5. Creating project directory...${NC}"
sudo mkdir -p $APP_PATH
sudo chown -R $USER:$USER $APP_PATH

echo -e "${GREEN}6. Cloning repository...${NC}"
cd $APP_PATH
git clone $GIT_REPO .

echo -e "${GREEN}7. Installing dependencies...${NC}"
pnpm install --frozen-lockfile

echo -e "${GREEN}8. Building application...${NC}"
pnpm build

echo -e "${GREEN}9. Starting application with PM2...${NC}"
pm2 start npm --name "$APP_NAME" -- start
pm2 startup
pm2 save

echo -e "${GREEN}10. Creating Nginx configuration...${NC}"
sudo tee /etc/nginx/sites-available/$APP_NAME > /dev/null <<EOF
# IP üzerinden doğrudan HTTP erişimini engelle (default server)
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    return 444;  # Bağlantıyı kapat
}

# Domain için HTTP server (Certbot HTTPS ekleyecek)
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;
    
    # Geçici olarak uygulamaya proxy et (Certbot için ACME challenge gerekli)
    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files
    location /_next/static {
        proxy_pass http://localhost:$APP_PORT/_next/static;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF

sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl restart nginx

echo -e "${GREEN}11. Configuring firewall...${NC}"
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo -e "${GREEN}12. Installing Certbot for SSL...${NC}"
sudo apt install -y certbot python3-certbot-nginx

echo -e "${GREEN}13. Obtaining SSL certificate automatically...${NC}"
sudo certbot --nginx \
    --non-interactive \
    --agree-tos \
    --email "$CERTBOT_EMAIL" \
    --domains "$DOMAIN" \
    --redirect

echo -e "${GREEN}14. Setting up SSL certificate auto-renewal...${NC}"
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo -e "${GREEN}15. Blocking IP-based HTTPS access...${NC}"
# Certbot sertifika aldıktan sonra IP üzerinden HTTPS erişimini engellemek için
# default SSL server bloğunu ekle
sudo tee -a /etc/nginx/sites-available/$APP_NAME > /dev/null <<EOF

# IP üzerinden doğrudan HTTPS erişimini engelle (default SSL server)
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name _;
    
    # Certbot'un oluşturduğu sertifikayı kullan
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    return 444;  # Bağlantıyı kapat
}
EOF

echo -e "${GREEN}16. Adding security headers to HTTPS server...${NC}"
# Certbot'un oluşturduğu HTTPS bloğuna güvenlik başlıkları ekle
sudo sed -i "/server_name $DOMAIN;/a\\
    # Güvenlik başlıkları\\
    add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\\
    add_header X-Frame-Options \"SAMEORIGIN\" always;\\
    add_header X-Content-Type-Options \"nosniff\" always;\\
    add_header X-XSS-Protection \"1; mode=block\" always;" /etc/nginx/sites-available/$APP_NAME

# Nginx'i yeniden test et ve restart et
sudo nginx -t
sudo systemctl restart nginx

echo ""
echo -e "${GREEN}VPS setup completed successfully!${NC}"
echo -e "${GREEN}SSL certificate obtained and HTTPS is active!${NC}"
echo ""
