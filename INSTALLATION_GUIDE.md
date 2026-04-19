# INSTALLATION & SETUP GUIDE

## 🚀 Hướng Dẫn Cài Đặt Toàn Dự Án

Tài liệu này sẽ hướng dẫn bạn từng bước để thiết lập và chạy dự án JobFinder.

---

## 📋 Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy chắc chắn rằng bạn đã cài đặt:

- **Node.js** v16+ ([Download](https://nodejs.org))
- **npm** hoặc **yarn** (đi kèm với Node.js)
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community)) HOẶC tài khoản MongoDB Atlas

### Kiểm tra cài đặt:

```bash
node --version  # v16.x.x hoặc cao hơn
npm --version   # 7.x.x hoặc cao hơn
```

---

## 📁 Project Structure

```
TimJob/
├── backend/          # Express + MongoDB
├── frontend/         # React + Vite
├── README.md         # Hướng dẫn chính
├── DATABASE_SCHEMA.md
└── API_DOCUMENTATION.md
```

---

## 🔧 Phần 1: Cài Đặt Backend (Express + MongoDB)

### Step 1.1: Vào thư mục backend

```bash
cd backend
```

### Step 1.2: Cài đặt dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả packages được liệt kê trong `package.json`:
- express
- mongoose
- cors
- bcryptjs
- jsonwebtoken
- dotenv
- multer
- express-validator

### Step 1.3: Tạo file `.env`

Sao chép file `.env.example` và đặt tên là `.env`:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

### Step 1.4: Cấu hình Database

**Option A: MongoDB Local**

1. Tải và cài MongoDB Community từ https://www.mongodb.com/try/download/community
2. Sau khi cài, MongoDB sẽ chạy tại `mongodb://localhost:27017`
3. Trong file `.env`, giữ nguyên:
   ```
   MONGODB_URI=mongodb://localhost:27017/job-search
   ```

**Option B: MongoDB Atlas (Cloud) - KHUYÊN DÙNG**

MongoDB Atlas là cloud database - không cần cài MongoDB local.

**Hướng dẫn chi tiết:** Xem **[MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)** 📖

Tóm tắt:
1. Tạo tài khoản tại https://www.mongodb.com/cloud/atlas/register
2. Tạo cluster (Shared tier - miễn phí)
3. Tạo database user (username & password)
4. Whitelist IP address của bạn
5. Lấy connection string: `mongodb+srv://username:password@cluster.mongodb.net/job-search`
6. Thay vào file `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-search
   ```

### Step 1.4.1: Upload ảnh lên cloud
- `avatar` và `companyLogo` lưu dưới dạng URL ảnh.
- Bạn có thể dùng dịch vụ host ảnh cloud như Cloudinary, Imgbb, Firebase Storage, hoặc Amazon S3.
- Tải ảnh lên dịch vụ đó, copy URL trả về, sau đó dùng URL này khi tạo hoặc cập nhật dữ liệu user.
- Ví dụ:
  - `https://res.cloudinary.com/demo/image/upload/v123456/avatar.png`
  - `https://i.ibb.co/xxxxx/company-logo.png`

### Step 1.5: Cấu hình JWT Secret

Trong file `.env`, thay đổi:

```env
JWT_SECRET=your_very_secret_key_here_change_this_in_production
```

Ví dụ:
```env
JWT_SECRET=my_super_secret_jwt_key_12345
```

### Step 1.6: Kiểm tra cấu hình

File `.env` cuối cùng sẽ trông như thế này:

```env
MONGODB_URI=mongodb://localhost:27017/job-search
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🔧 Phần 2: Cài Đặt Frontend (React + Vite)

### Step 2.1: Vào thư mục frontend

```bash
# Từ thư mục root
cd frontend

# Hoặc từ backend
cd ../frontend
```

### Step 2.2: Cài đặt dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả packages:
- react
- react-dom
- react-router-dom
- axios
- lucide-react
- vite
- tailwindcss

### Step 2.3: Tạo file `.env` (Optional)

```bash
copy .env.example .env
```

### Step 2.4: Cấu hình API URL

Trong file `.env`, đảm bảo:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Phần 3: Chạy Ứng Dụng

### Bước 3.1: Khởi động MongoDB

Nếu sử dụng **MongoDB Local**:

**Windows:**
```bash
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

Nếu sử dụng **MongoDB Atlas**, bỏ qua bước này.

### Bước 3.2: Chạy Backend

Mở **Terminal 1:**

```bash
cd backend
npm run dev
```

Bạn sẽ thấy:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Bước 3.3: Chạy Frontend

Mở **Terminal 2** (giữ Terminal 1 chạy):

```bash
cd frontend
npm run dev
```

Bạn sẽ thấy:
```
Local:   http://localhost:5173/
```

### Bước 3.4: Mở trình duyệt

Vào `http://localhost:5173` và bắt đầu sử dụng!

---

## ✅ Kiểm Tra Cài Đặt

### Kiểm tra Backend

1. Mở browser vào: `http://localhost:5000/api/health`
2. Bạn sẽ thấy:
   ```json
   {
     "success": true,
     "message": "Server is running"
   }
   ```

### Kiểm tra Frontend

1. Frontend sẽ tự động mở tại `http://localhost:5173`
2. Bạn sẽ thấy trang chủ JobFinder

---

## 🧪 Test Ứng Dụng

### Test 1: Đăng Ký & Đăng Nhập

1. Nhấn "Đăng ký"
2. Chọn role "Ứng viên tìm việc"
3. Nhập:
   - Họ tên: `Nguyễn Văn A`
   - Email: `test@example.com`
   - Mật khẩu: `password123`
4. Nhấn "Đăng ký"
5. Bạn sẽ được đưa đến trang Tìm Việc

### Test 2: Tìm Kiếm Công Việc

1. Vào trang "Tìm Việc"
2. Nhập tên công việc: `React`
3. Nhấn "Tìm"
4. Sẽ hiển thị danh sách công việc

### Test 3: Đăng Công Việc (Nbà Tuyển Dụng)

1. Đăng xuất
2. Đăng ký với role "Nhà tuyển dụng"
3. Vào "Công việc của tôi"
4. Nhấn "Tạo Công Việc Mới"
5. Nhập thông tin công việc
6. Nhấn "Đăng bài"

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module 'express'"

**Giải pháp:**
```bash
cd backend
npm install
```

### Lỗi: "MongoDB connection failed"

**Kiểm tra:**
1. MongoDB đã chạy chưa?
   - Windows: Run `mongod`
   - macOS: Run `brew services start mongodb-community`
2. MONGODB_URI có đúng không? (Check `.env`)
3. Nếu dùng Atlas, kiểm tra IP address được allow

### Lỗi: "Port 5000 is already in use"

**Giải pháp:**
```bash
# Tìm process đang dùng port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Lỗi: "CORS error"

**Giải pháp:**
1. Kiểm tra `FRONTEND_URL` trong backend `.env`
2. Mặc định là `http://localhost:5173`
3. Nếu frontend chạy ở port khác, cập nhật giá trị này

### Lỗi: "Token is invalid or expired"

**Giải pháp:**
1. Xóa token từ localStorage:
   ```javascript
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   ```
2. Refresh page: `Ctrl + F5`
3. Đăng nhập lại

---

## 📚 Tài Liệu Tham Khảo

Sau khi cài đặt thành công, tham khảo:

- **[README.md](./README.md)** - Hướng dẫn chính
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Schema cơ sở dữ liệu
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Tài liệu API chi tiết

---

## 🎯 Bước Tiếp Theo After Setup

1. **Khám Phá API**: Đọc `API_DOCUMENTATION.md`
2. **Hiểu Database**: Đọc `DATABASE_SCHEMA.md`
3. **Phát Triển Tính Năng**: Thêm comment để maintain code
4. **Deploy**: Chuẩn bị deploy lên production

---

## 🆘 Cần Giúp?

Nếu gặp vấn đề:

1. Kiểm tra logs trong terminal
2. Đọc error message kỹ
3. Xóa `node_modules` và cài lại:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. Restart MongoDB và application

---

**Chúc mừng! 🎉 Ứng dụng của bạn đã sẵn sàng để phát triển!**

Nếu mọi thứ hoạt động, bạn đã successfully setup toàn bộ dự án.

Happy Coding! 🚀
