#!/usr/bin/env bash
# Run on the Ubuntu droplet as root (sudo bash setup-droplet.sh).
# Repo must be public, or configure a deploy key before cloning.

set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/SanliData/loneagro.git}"
BRANCH="${BRANCH:-main}"
WEB_ROOT="${WEB_ROOT:-/var/www/lonestar-agro}"

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx git

if [[ -d "$WEB_ROOT/.git" ]]; then
  git -C "$WEB_ROOT" fetch origin "$BRANCH"
  git -C "$WEB_ROOT" reset --hard "origin/$BRANCH"
else
  rm -rf "$WEB_ROOT"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$WEB_ROOT"
fi

chown -R www-data:www-data "$WEB_ROOT"

NGX_AVAIL="/etc/nginx/sites-available/lonestar-agro"
NGX_EN="/etc/nginx/sites-enabled/lonestar-agro"
cp -f "$WEB_ROOT/deploy/nginx-site.conf" "$NGX_AVAIL"
ln -sf "$NGX_AVAIL" "$NGX_EN"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl reload nginx

echo "Done. Open http://$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')/ — ensure firewall allows 80/tcp (ufw allow 80)."
