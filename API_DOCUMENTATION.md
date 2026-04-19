# 📡 API Documentation

## JobFinder API - Toàn Bộ Endpoints

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### 1. Register (Đăng ký)

```http
POST /auth/register
Content-Type: application/json

{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "password123",
  "role": "candidate" // hoặc "employer"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "role": "candidate",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 2. Login (Đăng nhập)

```http
POST /auth/login
Content-Type: application/json

{
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "role": "candidate"
  }
}
```

---

### 3. Get Current User (Lấy thông tin user hiện tại)

```http
GET /auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "phone": "0912345678",
    "address": "Hà Nội",
    "role": "candidate",
    "candidate": {
      "skills": ["JavaScript", "React"],
      "experience": "5",
      "savedJobs": []
    }
  }
}
```

---

### 4. Update Profile (Cập nhật hồ sơ)

```http
PUT /auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "Nguyễn Văn A",
  "phone": "0912345678",
  "address": "Hà Nội",
  "candidate": {
    "bio": "Lập trình viên 5 năm kinh nghiệm",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "5",
    "education": "Đại học CNTT"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Cập nhật profile thành công",
  "user": { ... }
}
```

---

## 💼 Job Endpoints

### 1. Get All Jobs (Lấy danh sách công việc)

```http
GET /jobs?page=1&limit=10&title=React&location=Hà Nội&jobType=full-time&salaryMin=15000000&salaryMax=30000000&search=developer
```

**Query Parameters:**
- `page` (number): Trang (mặc định: 1)
- `limit` (number): Số công việc mỗi trang (mặc định: 10)
- `title` (string): Tìm theo tên công việc
- `location` (string): Tìm theo địa điểm
- `jobType` (string): Lọc theo loại (full-time, part-time, remote, contract)
- `salaryMin` (number): Mức lương tối thiểu
- `salaryMax` (number): Mức lương tối đa
- `search` (string): Tìm kiếm toàn văn

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Senior React Developer",
      "description": "...",
      "location": "Hà Nội",
      "jobType": "full-time",
      "salary": {
        "min": 25000000,
        "max": 40000000,
        "currency": "VND",
        "period": "month"
      },
      "requiredSkills": ["React", "JavaScript", "API"],
      "companyName": "Tech Company ABC",
      "applicationsCount": 5,
      "viewsCount": 120,
      "employerId": "507f1f77bcf86cd799439010"
    }
  ],
  "pagination": {
    "total": 25,
    "pages": 3,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### 2. Get Job Detail (Lấy chi tiết một công việc)

```http
GET /jobs/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Senior React Developer",
    "description": "Chúng tôi tìm một senior React developer...",
    "requirements": ["HTML, CSS, JavaScript", "React 18+", "REST API"],
    "responsibilities": ["Phát triển UI", "Code review"],
    "salary": { ... },
    "jobType": "full-time",
    "location": "Hà Nội",
    "experienceLevel": "senior",
    "yearsRequired": 5,
    "requiredSkills": ["React", "JavaScript", "API"],
    "employerId": {
      "_id": "507f1f77bcf86cd799439010",
      "fullName": "Công ty ABC",
      "email": "hr@abc.com"
    },
    "companyName": "Tech Company ABC",
    "status": "active",
    "applicationsCount": 5,
    "viewsCount": 121,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Create Job (Tạo công việc mới)

```http
POST /jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior React Developer",
  "description": "Chúng tôi tìm một senior React developer...",
  "requirements": ["HTML, CSS, JavaScript", "React 18+"],
  "responsibilities": ["Phát triển UI", "Code review"],
  "category": "IT & Software",
  "salary": {
    "min": 25000000,
    "max": 40000000,
    "currency": "VND",
    "period": "month"
  },
  "jobType": "full-time",
  "location": "Hà Nội",
  "experienceLevel": "senior",
  "yearsRequired": 5,
  "requiredSkills": ["React", "JavaScript", "API"],
  "expiryDate": "2024-03-15T23:59:59Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Tạo công việc thành công",
  "data": { ... }
}
```

⚠️ **Requires**: Employer role

---

### 4. Update Job (Cập nhật công việc)

```http
PUT /jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior React Developer (Updated)",
  "salary": {
    "min": 30000000,
    "max": 45000000,
    "currency": "VND",
    "period": "month"
  },
  "status": "active"
}
```

⚠️ **Requires**: Job owner or admin

---

### 5. Delete Job (Xóa công việc)

```http
DELETE /jobs/:id
Authorization: Bearer <token>
```

⚠️ **Requires**: Job owner or admin

---

### 6. Get Jobs by Employer (Lấy công việc của nhà tuyển dụng)

```http
GET /jobs/employer/:employerId?page=1&limit=10
```

---

## 📝 Application Endpoints

### 1. Apply Job (Ứng tuyển công việc)

```http
POST /applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439012",
  "coverLetter": "Tôi rất hứng thú với vị trí này..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Ứng tuyển thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "jobId": "507f1f77bcf86cd799439012",
    "candidateId": "507f1f77bcf86cd799439011",
    "candidateName": "Nguyễn Văn A",
    "candidateEmail": "nguyenvana@example.com",
    "jobTitle": "Senior React Developer",
    "companyName": "Tech Company ABC",
    "coverLetter": "Tôi rất hứng thú...",
    "status": "pending",
    "appliedAt": "2024-01-20T10:30:00Z"
  }
}
```

⚠️ **Requires**: Candidate role

---

### 2. Get Applications (Lấy danh sách đơn ứng tuyển)

```http
GET /applications?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter theo trạng thái (pending, reviewed, accepted, rejected, interview)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "jobId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Senior React Developer"
      },
      "candidateId": {
        "_id": "507f1f77bcf86cd799439011",
        "fullName": "Nguyễn Văn A"
      },
      "status": "pending",
      "appliedAt": "2024-01-20T10:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

### 3. Get Application Detail (Lấy chi tiết đơn)

```http
GET /applications/:id
Authorization: Bearer <token>
```

---

### 4. Update Application (Cập nhật trạng thái đơn)

```http
PUT /applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "interview",
  "notes": "Phỏng vấn lần 1 qua điện thoại",
  "interviewDate": "2024-02-01T14:00:00Z"
}
```

⚠️ **Requires**: Employer role

---

### 5. Delete Application (Xóa đơn ứng tuyển)

```http
DELETE /applications/:id
Authorization: Bearer <token>
```

---

### 6. Get Candidate Applications (Lấy đơn của ứng viên)

```http
GET /applications/candidate/:candidateId?page=1&limit=10
```

---

## 🔄 Status Types

### Job Status:
- `draft` - Nháp (chưa đăng)
- `active` - Đang tuyển
- `closed` - Đã đóng

### Application Status:
- `pending` - Chờ xử lý
- `reviewed` - Đã xem
- `interview` - Lên lịch phỏng vấn
- `accepted` - Được chấp nhận
- `rejected` - Bị từ chối

---

## 🛡️ Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Vui lòng nhập email và mật khẩu"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Vui lòng đăng nhập để truy cập tài nguyên này"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Bạn không có quyền truy cập tài nguyên này"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Không tìm thấy công việc"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Lỗi máy chủ"
}
```

---

## 🔑 JWT Token Usage

Tất cả request cần authentication phải include token trong header:

```
Authorization: Bearer <your_jwt_token>
```

Token được lấy từ response của endpoint `/auth/register` hoặc `/auth/login`.

---

## 💡 Tips & Best Practices

1. **Pagination**: Luôn sử dụng `page` và `limit` để tránh tải quá nhiều dữ liệu
2. **Filtering**: Kết hợp nhiều bộ lọc để có kết quả chính xác
3. **Error Handling**: Luôn kiểm tra `success` flag và `message`
4. **Token Expiry**: Token có thời hạn 7 ngày, sau đó cần đăng nhập lại
5. **CORS**: Frontend có thể call API từ domain khác nhờ CORS configuration

---

**Này là tài liệu API hoàn chỉnh. Happy Coding! 🚀**
