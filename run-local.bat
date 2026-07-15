@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Nie znaleziono Node.js. Zainstaluj Node.js 22 LTS i uruchom plik ponownie.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalowanie zaleznosci...
  call npm ci
  if errorlevel 1 goto :error
)
echo.
echo Uruchamianie aplikacji. Otworz adres wyswietlony jako Local.
call npm run dev -- --host
exit /b 0
:error
echo Wystapil blad. Sprawdz komunikat powyzej.
pause
exit /b 1
