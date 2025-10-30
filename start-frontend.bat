@echo off
echo ========================================
echo 🚀 Démarrage EduConnect Frontend
echo ========================================
echo.

cd /d "c:\Users\NERIA FLORENTIN\Desktop\educonnect-front"

echo ✅ Dossier : %cd%
echo.

echo 📦 Installation des dépendances...
call npm install

echo.
echo 🌐 Démarrage du serveur de développement...
echo 📍 URL: http://localhost:5173
echo 🔧 Page diagnostic: http://localhost:5173/status
echo.
echo ⏹️  Pour arrêter : Ctrl+C
echo.

call npm run dev

pause
