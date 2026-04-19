# JobFinder - Website Tìm Kiếm Việc Làm

Website tìm kiếm việc làm hoàn chỉnh được xây dựng với ReactJS, Node.js, Express, MongoDB và JWT Authentication.

## 📋 Mục Lục

- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Cài Đặt](#cài-đặt)
- [Chạy Dự Án](#chạy-dự-án)
- [API Endpoints](#api-endpoints)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)

---

## 🎯 Tính Năng

### Cho Ứng Viên (Candidates)
✅ Đăng ký / Đăng nhập  
✅ Cập nhật hồ sơ cá nhân (CV, kỹ năng, kinh nghiệm)  
✅ Tìm kiếm việc làm theo: Tên, Địa điểm, Mức lương  
✅ Lọc công việc theo: Loại công việc (full-time, part-time, remote)  
✅ Xem chi tiết công việc  
✅ Ứng tuyển công việc  
✅ Xem lịch sử ứng tuyển  

### Cho Nhà Tuyển Dụng (Employers)
✅ Đăng ký / Đăng nhập  
✅ Tạo bài đăng tuyển dụng  
✅ Chỉnh sửa / Xóa bài đăng  
✅ Xem danh sách ứng viên đã apply  
✅ Cập nhật trạng thái ứng viên (pending, reviewed, accepted, rejected, interview)  

### Tính Năng Động
✅ Tìm kiếm real-time  
✅ Pagination  
✅ Responsive UI (Mobile, Tablet, Desktop)  
✅ Role-based Access Control (RBAC)  

---

## 🛠 Công Nghệ Sử Dụng

### Backend
- **Node.js** - Runtime JavaScript phía server
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **JWT** - Authentication
- **bcryptjs** - Mã hóa password
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **Lucide React** - Icons

---

## 📁 Cấu Trúc Dự Án

```
TimJob/
├── backend/                    # Folder Backend
│   ├── src/
│   │   ├── models/            # MongoDB Models
│   │   │   ├── User.js
│   │   │   ├── Job.js
│   │   │   └── Application.js
│   │   ├── controllers/       # Controllers (xử lý logic)
│   │   │   ├── authController.js
│   │   │   ├── jobController.js
│   │   │   └── applicationController.js
│   │   ├── routes/            # API Routes
│   │   │   ├── authRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── applicationRoutes.js
│   │   ├── middleware/        # Middlewares
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── config/            # Cấu hình
│   │   │   └── database.js
│   │   ├── utils/             # Utility functions
│   │   │   └── jwt.js
│   │   └── server.js          # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                   # Folder Frontend
│   ├── src/
│   │   ├── components/        # React Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── ...
│   │   ├── pages/             # Pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── JobDetailPage.jsx
│   │   │   └── ...
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/             # Custom Hooks
│   │   │   └── useJobs.js
│   │   ├── services/          # API Services
│   │   │   └── ...
│   │   ├── styles/            # CSS/Tailwind
│   │   │   └── globals.css
│   │   ├── utils/             # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx            # Main App Component
│   │   └── main.jsx           # Entry Point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md                   # File này
```

---

## 🚀 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js v16+ 
- MongoDB (Local hoặc MongoDB Atlas)
- npm hoặc yarn

### Bước 1: Clone Repository (hoặc tạo project)

```bash
cd d:\TimJob
```

### Bước 2: Cài Đặt Backend

```bash
cd backend
npm install
```

**Tạo file `.env` từ `.env.example`:**

```bash
copy .env.example .env
```

**Chỉnh sửa file `.env`:**

```conf
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/job-search
# Nếu sử dụng MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-search

JWT_SECRET=your_very_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

> **Lưu ý ảnh profile / logo:**
> - `avatar` và `companyLogo` lưu giá trị dưới dạng URL.
> - Bạn có thể tải ảnh lên dịch vụ host ảnh cloud như Cloudinary, Imgbb, Firebase Storage, Amazon S3, hoặc dịch vụ CDN khác.
> - Sau khi upload, copy URL trả về và sử dụng trong dữ liệu mẫu hoặc API.

### Bước 3: Cài Đặt Frontend

```bash
cd ../frontend
npm install
```

**Tạo file `.env` (nếu cần):**

```bash
copy .env.example .env
```

---

## 🎬 Chạy Dự Án

### Chạy MongoDB

**Nếu dùng MongoDB Local:**

```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**Hoặc sử dụng MongoDB Atlas:**
- Tạo tài khoản tại [mongodb.com](https://mongodb.com)
- Tạo cluster và lấy connection string
- Thay vào `MONGODB_URI` trong `.env`

### Chạy Backend

```bash
cd backend
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`

Console sẽ hiển thị:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Chạy Frontend (Terminal mới)

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication API

```
POST   /api/auth/register       - Đăng ký user mới
POST   /api/auth/login          - Đăng nhập user
GET    /api/auth/me             - Lấy thông tin user (Protected)
PUT    /api/auth/update-profile - Cập nhật profile (Protected)
```

### Job API

```
GET    /api/jobs                - Lấy danh sách công việc (có filter)
GET    /api/jobs/:id            - Lấy chi tiết công việc
POST   /api/jobs                - Tạo công việc (Employer only)
PUT    /api/jobs/:id            - Cập nhật công việc (Employer only)
DELETE /api/jobs/:id            - Xóa công việc (Employer only)
GET    /api/jobs/employer/:id   - Lấy công việc của nhà tuyển dụng
```

### Application API

```
POST   /api/applications        - Ứng tuyển công việc (Candidate only)
GET    /api/applications        - Lấy danh sách đơn ứng tuyển
GET    /api/applications/:id    - Lấy chi tiết đơn ứng tuyển
PUT    /api/applications/:id    - Cập nhật trạng thái đơn
DELETE /api/applications/:id    - Xóa đơn ứng tuyển
GET    /api/applications/candidate/:id - Lấy đơn của ứng viên
```

---

## 📖 Hướng Dẫn Sử Dụng

### 1. Đăng Ký Tài Khoản

**Ứng Viên:**
1. Nhấn "Đăng ký" → Chọn "Ứng viên tìm việc"
2. Nhập: Họ tên, Email, Mật khẩu
3. Nhấn "Đăng ký"

**Nhà Tuyển Dụng:**
1. Nhấn "Đăng ký" → Chọn "Nhà tuyển dụng"
2. Nhập: Tên công ty, Email, Mật khẩu
3. Nhấn "Đăng ký"

### 2. Tìm Kiếm Công Việc (Ứng Viên)

1. Vào trang "Tìm Việc"
2. Nhập: Tên công việc, Địa điểm, Mức lương
3. Filter theo loại công việc
4. Nhấn "Tìm" hoặc chọn công việc

### 3. Ứng Tuyển

1. Vào chi tiết công việc
2. Viết thư xin việc (nếu cần)
3. Nhấn "Ứng tuyển ngay"

### 4. Đăng Công Việc (Nhà Tuyển Dụng)

1. Vào "Công việc của tôi"
2. Nhấn "Tạo công việc mới"
3. Nhập: Tiêu đề, Mô tả, Mức lương, Địa điểm, Yêu cầu...
4. Nhấn "Đăng bài"

### 5. Quản Lý Ứng Viên

1. Vào "Ứng viên"
2. Xem danh sách ứng viên đã ứng tuyển
3. Nhấn để xem chi tiết
4. Cập nhật trạng thái: Pending → Reviewed → Interview → Accepted/Rejected

---

## 🔐 Bảo Mật

### Password Hashing
- Passwords được mã hóa bằng bcryptjs trước khi lưu vào database

### JWT Authentication
- Token JWT được tạo khi đăng nhập
- Token lưu trong localStorage của trình duyệt
- Mỗi request đến API sẽ gửi token trong header: `Authorization: Bearer <token>`

### Role-Based Access Control
- **candidate**: Chỉ có thể ứng tuyển, xem công việc
- **employer**: Chỉ có thể tạo/sửa/xóa công việc của mình
- **admin**: Admin access to everything

---

## 🐛 Troubleshooting

### Lỗi: MongoDB connection failed

**Giải pháp:**
- Kiểm tra MongoDB đã được chạy
- Kiểm tra `MONGODB_URI` trong `.env`
- Nếu dùng MongoDB Atlas, lấy connection string đúng

### Lỗi: CORS error

**Giải pháp:**
- Kiểm tra `FRONTEND_URL` trong backend `.env`
- Mặc định là `http://localhost:5173`

### Lỗi: Token expired

**Giải pháp:**
- Xóa token khỏi localStorage: `localStorage.removeItem('token')`
- Đăng nhập lại

---

## 📝 Ghi Chú Phát Triển

### Để thêm tính năng mới:

1. **Backend:**
   - Tạo model trong `src/models/`
   - Tạo controller trong `src/controllers/`
   - Tạo routes trong `src/routes/`
   - Import routes vào `server.js`

2. **Frontend:**
   - Tạo component trong `src/components/`
   - Tạo page trong `src/pages/`
   - Tạo hook (nếu cần) trong `src/hooks/`
   - Thêm route trong `App.jsx`

### Code Standards:
- Sử dụng comment tiếng Việt
- Tên function: camelCase
- Tên class/component: PascalCase
- Tên constants: UPPER_SNAKE_CASE

---

## 📚 Tài Liệu Tham Khảo

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)

---

## 📄 License

MIT License

---

## 👨‍💻 Hỗ Trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Tất cả dependencies đã install: `npm install`
2. MongoDB đã chạy
3. Ports 5000 (backend) và 5173 (frontend) không bị chiếm dụng
4. File `.env` đã được tạo và cấu hình đúng

---

**Chúc mừng! 🎉 WebSite tìm kiếm việc làm của bạn đã sẵn sàng!**
