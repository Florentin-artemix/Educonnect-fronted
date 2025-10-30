# Script PowerShell pour démarrer l'application EduConnect Frontend
Write-Host "=== EduConnect Frontend Setup ===" -ForegroundColor Green

# Vérifier si Node.js est installé
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "ERREUR: Node.js n'est pas installé!" -ForegroundColor Red
    exit 1
}

# Naviguer vers le dossier
Set-Location -Path "C:\Users\NERIA FLORENTIN\Desktop\educonnect-front"

# Vérifier si package.json existe
if (!(Test-Path "package.json")) {
    Write-Host "ERREUR: package.json non trouvé!" -ForegroundColor Red
    exit 1
}

Write-Host "Installation des dépendances..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "Dépendances installées avec succès!" -ForegroundColor Green
} catch {
    Write-Host "ERREUR lors de l'installation des dépendances!" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Démarrage de l'application ===" -ForegroundColor Green
Write-Host "L'application sera disponible sur: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host "`nDémarrage en cours..." -ForegroundColor Yellow

# Démarrer le serveur de développement
npm run dev
