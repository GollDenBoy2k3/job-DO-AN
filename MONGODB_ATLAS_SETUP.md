# 🗄️ Hướng Dẫn Cài Đặt MongoDB Atlas (Cloud Database)

## Tại Sao MongoDB Atlas?

✅ **Không cần cài đặt local** - Database lưu trên cloud  
✅ **Miễn phí** - Free tier rất hợp cho development  
✅ **Dễ quản lý** - Có giao diện web  
✅ **Bảo mật** - Tự động backup & encryption  
✅ **Scalable** - Dễ upgrade khi cần  

---

## 📋 Step-by-Step: Tạo MongoDB Atlas Account

### Bước 1: Tạo Tài Khoản MongoDB

1. Vào https://www.mongodb.com/cloud/atlas/register
2. Điền thông tin:
   - **Email**: Địa chỉ email của bạn
   - **Password**: Mật khẩu mạnh (8+ ký tự)
   - **First & Last Name**: Tên của bạn (hoặc tên giả)
3. Tick "I agree to the MongoDB Terms of Service"
4. Nhấn **"Create your Atlas account"**

### Bước 2: Xác Minh Email

1. MongoDB sẽ gửi email xác minh đến email của bạn
2. Mở email, click link "Verify email"
3. Bạn sẽ được chuyển về trang MongoDB Atlas

✅ **Tài khoản đã được tạo!**

---

## 🏢 Tạo Organization & Project

### Bước 3: Tạo Organization (Optional)

Sau khi xác minh email, bạn sẽ thấy:

```
Welcome to MongoDB Atlas!
```

Bạn có thể:
- ✅ Tạo **Organization** mới (hoặc bỏ qua)
- ✅ Tạo **Project** mới

Cho dự án này, chúng ta sẽ **tạo Project** trực tiếp.

### Bước 4: Tạo Project Mới

1. Nhấn **"Create a Project"**
2. Điền tên project: `JobFinder` (hoặc tên khác)
3. Nhấn **"Create Project"**

✅ **Project được tạo!**

---

## 🚀 Tạo Database Cluster

### Bước 5: Tạo Cluster

1. Sau khi tạo project, bạn sẽ thấy: **"Deploy your first cluster"**
2. Nhấn **"Build a Cluster"** hoặc **"Create a Cluster"**

### Bước 6: Chọn Cấu Hình Cluster

Bạn sẽ thấy các tùy chọn:

```
☐ Serverless
☑ Shared (Miễn phí - Nên chọn cái này)
```

**Chọn "Shared"** (miễn phí, đủ cho development):

1. **Provider**: Giữ mặc định (AWS)
2. **Region**: Chọn gần bạn nhất
   - `ap-southeast-1` (Singapore) - Tốc độ tốt cho Việt Nam
   - Hoặc `ap-southeast-2` (Sydney)
3. **Cluster Tier**: `M0` (miễn phí, 512MB)

3. Nhấn **"Create Deployment"**

⏳ **Chờ 1-2 phút cluster được tạo...**

```
Your cluster is being created...
This typically takes 1-2 minutes
```

✅ **Cluster được tạo thành công!**

---

## 🔐 Tạo Database User (Authentication)

### Bước 7: Tạo Username & Password

Sau khi cluster hoàn thành, chọn **"Database Access"** từ menu bên trái:

1. Nhấn **"Add New Database User"**
2. Chọn **"Password"** (xác thực bằng mật khẩu)
3. Điền:
   - **Username**: `jobfinder_user` (hoặc tên khác)
   - **Password**: Chọn mật khẩu mạnh (hoặc auto generate)
     - Ghi lại mật khẩu này! ⚠️
4. **Database User Privileges**: `Built-in role: Admin`
5. Nhấn **"Add User"**

⚠️ **Ghi nhớ:**
```
Username: jobfinder_user
Password: [your_password_here]
```

✅ **User được tạo!**

---

## 🌍 Cho Phép Kết Nối từ máy của bạn

### Bước 8: Cấu Hình IP Whitelist

1. Chọn **"Network Access"** từ menu
2. Nhấn **"Add IP Address"**
3. Chọn **"Add Current IP Address"** (tự động thêm IP của bạn)
   - Hoặc nhập IP thủ công nếu cần
4. Nhấn **"Confirm"**

**Hoặc cho phép tất cả IP (Không an toàn cho production):**
- Click **"Add IP Address"**
- Nhập: `0.0.0.0/0` (cho phép tất cả)
- Nhấn **"Confirm"**

✅ **IP được thêm!**

---

## 🔗 Lấy Connection String

### Bước 9: Lấy MongoDB Connection String

1. Vào **"Database"** (hoặc "Databases") từ menu
2. Bạn sẽ thấy cluster của bạn
3. Nhấn **"Connect"** button trên cluster
4. Chọn **"Connect your application"**
5. Chọn:
   - **Driver**: Node.js
   - **Version**: 4.1 or later
6. Bạn sẽ thấy connection string:

```
mongodb+srv://jobfinder_user:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
```

### Sao chép Connection String

```
mongodb+srv://jobfinder_user:<PASSWORD>@cluster0.########.mongodb.net/job-search?retryWrites=true&w=majority
```

**Thay `<PASSWORD>` với mật khẩu của user!**

Ví dụ:
```
mongodb+srv://jobfinder_user:MyP@ssw0rd123@cluster0.wk8x9k2.mongodb.net/job-search?retryWrites=true&w=majority
```

---

## 📝 Cấu Hình trong Project JobFinder

### Bước 10: Cập nhật .env File

1. Mở file `backend/.env`:

```env
# Thay dòng này:
MONGODB_URI=mongodb://localhost:27017/job-search

# Thành:
MONGODB_URI=mongodb+srv://jobfinder_user:MyP@ssw0rd123@cluster0.wk8x9k2.mongodb.net/job-search?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Thay thế các giá trị:

| Giá trị | Ví dụ |
|--------|-------|
| `jobfinder_user` | Username bạn tạo |
| `MyP@ssw0rd123` | Password của user |
| `cluster0.wk8x9k2` | Cluster name từ connection string |
| `job-search` | Tên database (có thể thay đổi) |

---

## ✅ Kiểm Tra Kết Nối

### Bước 11: Test Kết Nối

1. Mở Terminal:

```bash
cd backend
npm run dev
```

2. Nếu thành công, bạn sẽ thấy:

```
Server running on port 5000
MongoDB Connected: [cluster-name]
```

✅ **Kết nối thành công!**

### Nếu Có Lỗi:

```
MongoError: Could not connect to MongoDB
```

**Kiểm tra:**
1. ✅ Username & password đúng?
2. ✅ IP address đã được whitelist?
3. ✅ Connection string đúng?
4. ✅ Network kết nối được?

---

## 🔍 Quản Lý Database trên MongoDB Atlas

### Xem Dữ Liệu

1. Vào **"Database"** → Click **"Browse Collections"** trên cluster
2. Bạn sẽ thấy các collection:
   - **users** - Danh sách users
   - **jobs** - Danh sách công việc
   - **applications** - Danh sách ứng tuyển

3. Click vào collection để xem dữ liệu

### Backup & Tạo Database Mới

**Tạo Database mới:**
1. Click **"Database"** → Click **"Create"** trên cluster
2. Nhập tên: `job-search-staging` (hoặc tên khác)
3. Click **"Create"**

**Backup (Auto):**
- MongoDB Atlas tự động backup
- Vào **"Backup"** để xem lịch backup

---

## 📊 Monitoring & Performance

### Xem Metrics

1. **Metrics** - CPU, Memory, Network usage
2. **Performance Insights** - Query analysis
3. **Alerts** - Cấu hình canh báo

### Upgrade Cluster

Nếu moreFree tier không đủ:

1. Vào **"Database"** → Click cluster
2. Chọn **"Upgrade Cluster"**
3. Chọn tier cao hơn (M2, M5, M10, etc.)
4. Click **"Upgrade"**

---

## 🔒 Bảo Mật Best Practices

### ✅ DO:
- ✅ Sử dụng mật khẩu mạnh (8+ ký tự, mix)
- ✅ Whitelist IP của bạn (không phải 0.0.0.0/0 production)
- ✅ Tạo user riêng cho mỗi application
- ✅ Lưu password trong `.env` (không trong code)
- ✅ Rotate password thường xuyên

### ❌ DON'T:
- ❌ Không commit `MONGODB_URI` vào Git
- ❌ Không chia sẻ password với người khác
- ❌ Không dùng `0.0.0.0/0` trên production
- ❌ Không sử dụng username/password đơn giản

---

## 🆘 Troubleshooting

### Lỗi: "MongoError: authentication failed"

**Giải pháp:**
- ✅ Kiểm tra username & password
- ✅ Kiểm tra ký tự đặc biệt (!, @, #, $) có cần escape không
- ✅ Kiểm tra URL encoding

### Lỗi: "MongoError: cannot read database"

**Giải pháp:**
- ✅ Kiểm tra IP whitelist
- ✅ Kiểm tra network kết nối
- ✅ Kiểm tra firewall

### "getaddrinfo ENOTFOUND cluster0.mongodb.net"

**Giải pháp:**
- ✅ Kiểm tra internet connection
- ✅ Kiểm tra typo trong connection string
- ✅ Kiểm tra cluster name đúng không

### Timeout khi kết nối

**Giải pháp:**
- ✅ Chờ 1-2 phút cluster hoàn thành
- ✅ Restart backend server
- ✅ Kiểm tra network latency (ping cluster)

---

## 📚 Tài Liệu Thêm

### Những điều cần biết:

| Khái Niệm | Giải Thích |
|----------|-----------|
| **Organization** | Nhóm projects & users |
| **Project** | Chứa 1 hoặc nhiều clusters |
| **Cluster** | Database instances thực tế |
| **Database** | Collection of data |
| **Collection** | Table-like structure |
| **Document** | JSON record |

---

## 🎯 Tiếp Theo

Sau khi cấu hình MongoDB Atlas:

1. ✅ Cấu hình `.env` file
2. ✅ Chạy backend: `npm run dev`
3. ✅ Chạy frontend: `npm run dev`
4. ✅ Bắt đầu develop!

---

## 💡 Tips & Tricks

### Lấy connection string lại:

1. Vào **Database** → Click **Connect** trên cluster
2. Chọn **"Connect your application"**
3. Copy connection string

### Tạo Database mới (staging):

```bash
# Sử dụng cùng cluster nhưng database khác
mongodb+srv://jobfinder_user:PASSWORD@cluster0.xxx.mongodb.net/job-search-staging
```

### Xem real-time logs:

1. Vào **"Activity Feed"** để xem hoạt động
2. Vào **"Logs"** để xem server logs

---

## ✨ Hoàn Tất!

Bây giờ bạn đã có:

✅ MongoDB Atlas account  
✅ Database cluster chạy trên cloud  
✅ User authentication  
✅ Connection string  
✅ Configured trong `.env`  

**Bạn sẵn sàng develop! 🚀**

---

**Happy coding! 💻**

Mọi thắc mắc, xem thêm: https://docs.mongodb.com/atlas/
