@echo off
rem Install dependencies for the frontend
cd devices-nextjs
start cmd /k npm install

rem Start the frontend
start cmd /k npm run dev
cd ..

rem Start the backend
cd DevicesAPI/DevicesAPI
start cmd /k dotnet run
cd ../..

rem Open the browser
start "" "http://localhost:3000"
