#!/usr/bin/env bash
set -e

echo "🚀 Building and launching Ghostwriter with Docker..."

if [ ! -f .env.local ] && [ ! -f .env ]; then
  if [ -f .env.example ]; then
    echo "📋 Auto-configuring environment: copying .env.example to .env.local..."
    cp .env.example .env.local
  fi
fi

docker compose up --build
