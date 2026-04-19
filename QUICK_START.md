# ⚡ QUICK START - Chạy Project Trong 5 Phút

## 🎯 Mục tiêu: Bạn sẽ có ứng dụng chạy trên máy sau 5 phút

---

## 📋 Các Bước

### **Bước 1**: Mở Terminal & Vào Thư Mục Backend

```bash
cd d:\TimJob\backend
```

### **Bước 2**: Tạo File .env

```bash
copy .env.example .env
```

**Mở file `.env` và sửa (nếu cần):**

Nếu dùng **MongoDB Local** (đơn giản nhất):
```env
MONGODB_URI=mongodb://localhost:27017/job-search
JWT_SECRET=test_secret_key_123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Nếu dùng **MongoDB Atlas (Cloud)** - Khuyên dùng:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-search
JWT_SECRET=test_secret_key_123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**📖 Hướng dẫn chi tiết: [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)**

> **Ảnh cloud:**
> - `avatar` và `companyLogo` lưu giá trị là URL ảnh.
> - Upload ảnh lên dịch vụ host ảnh như Cloudinary, Imgbb, Firebase Storage hoặc Amazon S3.
> - Dùng URL trả về để lưu ảnh đại diện hoặc logo công ty.

### **Bước 3**: Cài Dependencies Backend

```bash
npm install
```
(Chờ ~1-2 phút)

### **Bước 4**: Khởi Động MongoDB

**Nếu dùng Local:**

**Windows:**
```bash
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Nếu dùng MongoDB Atlas**, bỏ qua bước này.

### **Bước 5**: Chạy Backend

```bash
npm run dev
```

Bạn sẽ thấy:
```
Server running on port 5000
MongoDB Connected: localhost
```

✅ **Backend chạy thành công!**

---

## 🖥️ Terminal Thứ 2 - Frontend

Mở Terminal mới và chạy:

```bash
cd d:\TimJob\frontend
npm install
```

### Chạy Frontend:

```bash
npm run dev
```

Bạn sẽ thấy:
```
Local:   http://localhost:5173/
```

Browser sẽ tự động mở hoặc vào: `http://localhost:5173`

✅ **Frontend chạy thành công!**

---

## 🧪 Test Ứng Dụng

### Test 1: Đăng Ký

1. Nhấn nút "Đăng ký"
2. Chọn: "Ứng viên tìm việc"
3. Nhập:
   - Họ tên: `Nguyễn Văn A`
   - Email: `test@example.com`
   - Mật khẩu: `password123`
4. Nhấn "Đăng ký"

✅ Bạn sẽ được log in tự động

### Test 2: Xem Công Việc

1. Vào "Tìm Việc"
2. Nhập bất kỳ cái gì vào search box
3. Nhấn "Tìm"

✅ Sẽ hiển thị công việc (pending)

### Test 3: Chi Tiết Công Việc

1. Click vào một công việc
2. Xem chi tiết
3. Nhấn "Ứng tuyển ngay"
4. Viết thư xin việc
5. Nhấn "Ứng tuyển"

✅ Ứng tuyển thành công!

---

## 📚 Tài Liệu Chi Tiết

- **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - Setup chi tiết (nếu có vấn đề)
- **[README.md](./README.md)** - Hướng dẫn chính
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Tài liệu API
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Cấu trúc database

---

## ⚠️ Nếu Gặp Lỗi

### Lỗi: "Cannot find module 'express'"

```bash
cd backend
npm install
```

### Lỗi: "MongoDB connection failed"

**Kiểm tra:**
1. MongoDB đã chạy chưa?
2. `MONGODB_URI` trong `.env` có đúng không?

**Nếu dùng MongoDB Atlas:**
- Lấy connection string từ MongoDB Atlas
- Thay vào `MONGODB_URI`
- Kiểm tra username/password

### Lỗi: "Port 5000 already in use"

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Lỗi: "Module error in frontend"

```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

---

## 🔐 Tài Khoản Test

### Đăng Ký Test Nhanh

Sau khi setup xong, có thể đăng ký với:

```
Email: testcandidate@example.com
Password: Test@123
Role: Candidate (Ứng viên)
```

hoặc

```
Email: testemployer@example.com
Password: Test@123
Role: Employer (Nhà tuyển dụng)
```

---

## ✅ Checklist Hoàn Tất

- [ ] Backend chạy tại `http://localhost:5000`
- [ ] Frontend chạy tại `http://localhost:5173`
- [ ] MongoDB kết nối thành công
- [ ] Có thể đăng ký & đăng nhập
- [ ] Có thể xem danh sách công việc
- [ ] Có thể ứng tuyển công việc

---

## 📊 Cấu Trúc Project

```
TimJob/
├── backend/           # http://localhost:5000
├── frontend/          # http://localhost:5173
└── Documentation files
```

---

## 🎯 Tiếp Theo?

Sau khi chạy thành công:

1. **Khám Phá Frontend:**
   - Đăng ký tài khoản
   - Tìm kiếm công việc
   - Xem chi tiết công việc
   - Ứng tuyển công việc

2. **Khám Phá Backend:**
   - Mở [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
   - Dùng Postman để test API
   - Hiểu cách hoạt động của API

3. **Phát Triển:**
   - Thêm tính năng mới
   - Sửa bugs
   - Cải thiện UI/UX
   - Deploy lên production

---

## 📞 Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề:

1. Đọc lại phần "Nếu Gặp Lỗi" ở trên
2. Xem [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)
3. Check console/terminal để hiểu lỗi
4. Xóa `node_modules` và cài lại

---

## 🎉 Hoàn Tất!

Nếu bạn thấy website chạy ở `http://localhost:5173` ✅

**Chúc mừng! Project của bạn đã setup thành công! 🚀**

---

**Bây giờ bạn có thể:**
- ✅ Sử dụng ứng dụng
- ✅ Phát triển features mới
- ✅ Deploy lên production
- ✅ Học hỏi full-stack development

---

**Happy Coding! 💻**
