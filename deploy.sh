#!/bin/bash

# 🚀 Portfolio Auto-Deploy Script (Bash)

# 1. Load .env
if [ -f .env ]; then
  export $(echo $(grep -v '^#' .env | xargs) | envsubst)
else
  echo "Error: .env file not found!"
  exit 1
fi

PROJECT_ID="portofolio-487515"
REGION="us-central1"
REPO="new-porto-repo"
SERVICE="new-porto-service"
IMAGE_TAG="$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/app:latest"

echo "--- 🏗️ Building Docker Image ---"
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  -t $IMAGE_TAG .

echo "--- 🚚 Pushing Image to Artifact Registry ---"
docker push $IMAGE_TAG

echo "--- 🚀 Deploying to Cloud Run ---"
gcloud run deploy $SERVICE \
  --image $IMAGE_TAG \
  --region $REGION \
  --platform managed

echo "--- 🎉 Deployment Selesai! ---"
echo "🌐 Live at: https://ariawaludin.my.id"
