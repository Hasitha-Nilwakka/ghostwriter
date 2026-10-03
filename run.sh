#!/usr/bin/env bash
set -e

echo "🚀 Building and launching Ghostwriter with Docker..."

if [ ! -f .env.local ] && [ ! -f .env ]; then
  echo "⚠️  Note: Neither .env.local nor .env found."
  echo "    If you have RunPod API keys, copy .env.example to .env.local and configure your keys."
fi

docker compose up --build
