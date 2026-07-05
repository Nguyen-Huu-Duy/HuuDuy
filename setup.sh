#!/bin/bash
echo "🚀 Đang tạo cấu trúc thư mục HuuDuy..."

# ====== FRONTEND: src/ ======
mkdir -p src/screens/Splash
mkdir -p src/screens/Onboarding
mkdir -p src/screens/Auth/Login
mkdir -p src/screens/Auth/Register
mkdir -p src/screens/Home
mkdir -p src/screens/Services/ServiceDetail
mkdir -p src/screens/Booking/BookingForm
mkdir -p src/screens/Booking/BookingList
mkdir -p src/screens/Booking/BookingDetail
mkdir -p src/screens/Profile
mkdir -p src/screens/Notifications
mkdir -p src/screens/Chat

mkdir -p src/components/Header
mkdir -p src/components/Button
mkdir -p src/components/Card
mkdir -p src/components/ServiceCard
mkdir -p src/components/Loading

mkdir -p src/navigation
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/context
mkdir -p src/utils
mkdir -p src/assets/images
mkdir -p src/assets/fonts

# ====== BACKEND ======
mkdir -p backend/routes
mkdir -p backend/controllers
mkdir -p backend/models
mkdir -p backend/middleware
mkdir -p backend/config

# ====== TẠO FILE PLACEHOLDER ======
touch src/navigation/AppNavigator.tsx
touch src/services/api.ts
touch src/context/AuthContext.tsx
touch src/utils/constants.ts
touch src/utils/helpers.ts
touch backend/server.js
touch backend/config/db.js
touch backend/.env

echo "✅ Xong! Cấu trúc thư mục đã sẵn sàng."