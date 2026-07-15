@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Nie znaleziono Node.js. Zainstaluj Node.js 22 LTS i uruchom plik ponownie.
  pause
  exit /b 1
)
call npm ci
if errorlevel 1 goto :error
call npm run validate:data
if errorlevel 1 goto :error
call npm test
if errorlevel 1 goto :error
call npm run build
if errorlevel 1 goto :error
echo.
echo Build zakonczony. Gotowe pliki sa w katalogu dist.
pause
exit /b 0
:error
echo Wystapil blad. Sprawdz komunikat powyzej.
pause
exit /b 1
