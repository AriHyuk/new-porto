# 🚀 Portfolio Auto-Deploy Script (Windows PowerShell)

# 1. Load Environment Variables from .env
if (Test-Path .env) {
    Get-Content .env | Where-Object { $_ -match '=' -and $_ -notmatch '^#' } | ForEach-Object {
        $name, $value = $_.Split('=', 2)
        Set-Item -Path "Env:$($name.Trim())" -Value $value.Trim()
    }
} else {
    Write-Error "File .env tidak ditemukan! Pastikan sudah ada file .env di root."
    exit
}

$PROJECT_ID = "portofolio-487515"
$REGION = "us-central1"
$REPO = "new-porto-repo"
$SERVICE = "new-porto-service"
$IMAGE_TAG = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/app:latest"

Write-Host "--- 🏗️ Building Docker Image ---" -ForegroundColor Cyan
docker build `
  --build-arg NEXT_PUBLIC_SUPABASE_URL=$env:NEXT_PUBLIC_SUPABASE_URL `
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=$env:NEXT_PUBLIC_SUPABASE_ANON_KEY `
  -t $IMAGE_TAG .

if ($LASTEXITCODE -ne 0) { Write-Error "Build gagal!"; exit }

Write-Host "--- 🚚 Pushing Image to Artifact Registry ---" -ForegroundColor Cyan
docker push $IMAGE_TAG

if ($LASTEXITCODE -ne 0) { Write-Error "Push gagal!"; exit }

Write-Host "--- 🚀 Deploying to Cloud Run ---" -ForegroundColor Cyan
gcloud run deploy $SERVICE `
  --image $IMAGE_TAG `
  --region $REGION `
  --platform managed

Write-Host "--- 🎉 Deployment Selesai! ---" -ForegroundColor Green
Write-Host "🌐 Live at: https://ariawaludin.my.id" -ForegroundColor Blue
