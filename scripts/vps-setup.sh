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
GIT_REPO="https://github.com/Hikmettpk/MacTech.git"

echo -e "${GREEN}1. Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

echo -e "${GREEN}2. Installing Node.js and pnpm...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

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
server {
    listen 80;
    server_name $DOMAIN;

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

echo ""
echo -e "${GREEN}VPS setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Obtain SSL certificate: sudo certbot --nginx -d $DOMAIN"
echo "2. View PM2 logs: pm2 logs $APP_NAME"
echo "3. Check application status: pm2 status"
echo "4. Check Nginx status: sudo systemctl status nginx"
echo ""
echo -e "${YELLOW}Values to add to GitHub Secrets:${NC}"
echo "VPS_HOST: $(curl -s ifconfig.me)"
echo "VPS_USERNAME: $USER"
echo "VPS_PORT: 22"
echo "VPS_APP_PATH: $APP_PATH"
echo "VPS_SSH_KEY: Copy contents of ~/.ssh/id_rsa"
echo ""
echo -e "${GREEN}To create SSH Key:${NC}"
echo "ssh-keygen -t rsa -b 4096 -C 'github-actions'"
echo "cat ~/.ssh/id_rsa"
