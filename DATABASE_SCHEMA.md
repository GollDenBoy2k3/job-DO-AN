# 📊 Database Schema Documentation

## MongoDB Collections

Dự án sử dụng 3 collection chính: **Users**, **Jobs**, và **Applications**

---

## 1. Collection: Users

Lưu trữ thông tin tất cả user (ứng viên và nhà tuyển dụng)

### Schema:

```javascript
{
  // Thông tin cá nhân
  fullName: String                    // Họ tên (bắt buộc)
  email: String                       // Email (bắt buộc, unique)
  password: String                    // Mật khẩu (hash) (bắt buộc)
  phone: String                       // Số điện thoại
  address: String                     // Địa chỉ
  avatar: String                      // URL ảnh đại diện (cloud image URL)

  // Phân loại
  role: enum ['candidate', 'employer', 'admin']  // Vai trò (mặc định: 'candidate')

  // Thông tin ứng viên
  candidate: {
    bio: String                       // Tiểu sử
    skills: [String]                  // Danh sách kỹ năng
    experience: String                // Năm kinh nghiệm
    education: String                 // Học vấn
    cvFile: String                    // URL file CV
    desiredSalary: {
      min: Number                     // Mức lương tối thiểu
      max: Number                     // Mức lương tối đa
      currency: String                // Đơn vị tiền tệ (mặc định: 'VND')
    }
    preferredLocations: [String]      // Địa điểm công việc mong muốn
    jobTypes: [enum]                  // Loại công việc mong muốn
    savedJobs: [ObjectId]             // Danh sách công việc yêu thích
  }

  // Thông tin nhà tuyển dụng
  employer: {
    companyName: String               // Tên công ty
    industry: String                  // Ngành công nghiệp
    companyWebsite: String            // Website công ty
    companyLogo: String               // URL logo công ty
    companySize: enum [...]           // Quy mô công ty
    description: String               // Mô tả công ty
    companyAddress: String            // Địa chỉ công ty
  }

  // Trạng thái
  isVerified: Boolean                 // Đã xác minh email (mặc định: false)
  isActive: Boolean                   // Tài khoản hoạt động (mặc định: true)

  // Timestamps
  createdAt: Date                     // Thời gian tạo
  updatedAt: Date                     // Thời gian cập nhật lần cuối
}
```

### Ví Dụ Dữ Liệu:

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "$2a$10$...",
  "phone": "0912345678",
  "address": "Hà Nội",
  "avatar": "https://...",
  "role": "candidate",
  "candidate": {
    "bio": "Lập trình viên 5 năm kinh nghiệm",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "5",
    "education": "Đại học CNTT",
    "cvFile": "https://...",
    "desiredSalary": {
      "min": 15000000,
      "max": 25000000,
      "currency": "VND"
    },
    "preferredLocations": ["Hà Nội", "Hồ Chí Minh"],
    "jobTypes": ["full-time", "remote"],
    "savedJobs": [ObjectId(...), ObjectId(...)]
  },
  "isVerified": true,
  "isActive": true,
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-20T15:45:00Z")
}
```

---

## 2. Collection: Jobs

Lưu trữ thông tin các bài đăng tuyển dụng

### Schema:

```javascript
{
  // Thông tin công việc
  title: String                       // Tên vị trí (bắt buộc)
  description: String                 // Mô tả chi tiết (bắt buộc)
  requirements: [String]              // Danh sách yêu cầu
  responsibilities: [String]          // Danh sách nhiệm vụ
  category: enum [...]                // Danh mục công việc

  // Mức lương
  salary: {
    min: Number                       // Lương tối thiểu (bắt buộc)
    max: Number                       // Lương tối đa (bắt buộc)
    currency: String                  // Đơn vị tiền (mặc định: 'VND')
    period: enum ['month', 'year']    // Chu kỳ (mặc định: 'month')
  }

  // Loại công việc
  jobType: enum [
    'full-time',
    'part-time',
    'remote',
    'contract'
  ]                                   // Loại công việc (bắt buộc)

  // Vị trí làm việc
  location: String                    // Địa điểm (bắt buộc)

  // Kinh nghiệm yêu cầu
  experienceLevel: enum [...]         // Cấp độ kinh nghiệm
  yearsRequired: Number               // Số năm kinh nghiệm

  // Kỹ năng
  requiredSkills: [String]            // Danh sách kỹ năng

  // Thông tin nhà tuyển dụng
  employerId: ObjectId                // ID nhà tuyển dụng (bắt buộc)
  companyName: String                 // Tên công ty (bắt buộc)
  companyLogo: String                 // URL logo

  // Trạng thái
  status: enum [
    'active',
    'closed',
    'draft'
  ]                                   // Trạng thái (mặc định: 'draft')
  expiryDate: Date                    // Ngày hết hạn

  // Thống kê
  applicationsCount: Number           // Số ứng viên (mặc định: 0)
  viewsCount: Number                  // Lượt xem (mặc định: 0)

  // Timestamps
  createdAt: Date                     // Ngày tạo
  updatedAt: Date                     // Ngày cập nhật
}
```

### Ví Dụ Dữ Liệu:

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Senior React Developer",
  "description": "Tìm một senior React developer có kinh nghiệm 5+ năm...",
  "requirements": [
    "HTML, CSS, JavaScript",
    "React 18+",
    "REST API"
  ],
  "responsibilities": [
    "Phát triển UI với React",
    "Code review"
  ],
  "category": "IT & Software",
  "salary": {
    "min": 25000000,
    "max": 40000000,
    "currency": "VND",
    "period": "month"
  },
  "jobType": "full-time",
  "location": "Hồ Chí Minh",
  "experienceLevel": "senior",
  "yearsRequired": 5,
  "requiredSkills": ["React", "JavaScript", "API", "Git"],
  "employerId": ObjectId("507f1f77bcf86cd799439011"),
  "companyName": "Tech Company ABC",
  "companyLogo": "https://...",
  "status": "active",
  "expiryDate": ISODate("2024-03-15T23:59:59Z"),
  "applicationsCount": 12,
  "viewsCount": 245,
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-20T15:45:00Z")
}
```

---

## 3. Collection: Applications

Lưu trữ thông tin các đơn ứng tuyển

### Schema:

```javascript
{
  // Tham chiếu
  jobId: ObjectId                     // ID công việc (bắt buộc)
  candidateId: ObjectId               // ID ứng viên (bắt buộc)

  // Thông tin ứng viên (snapshot)
  candidateName: String               // Tên ứng viên
  candidateEmail: String              // Email ứng viên
  candidatePhone: String              // Điện thoại ứng viên

  // Thông tin công việc (snapshot)
  jobTitle: String                    // Tiêu đề công việc
  employerId: ObjectId                // ID nhà tuyển dụng
  companyName: String                 // Tên công ty

  // Nội dung đơn
  coverLetter: String                 // Thư xin việc
  cvFile: String                      // URL file CV

  // Trạng thái
  status: enum [
    'pending',
    'reviewed',
    'accepted',
    'rejected',
    'interview'
  ]                                   // Trạng thái (mặc định: 'pending')

  // Ghi chú
  notes: String                       // Ghi chú từ nhà tuyển dụng
  interviewDate: Date                 // Ngày phỏng vấn
  interviewNotes: String              // Ghi chú phỏng vấn

  // Flags
  isViewed: Boolean                   // Đã xem (mặc định: false)
  isStarred: Boolean                  // Đánh dấu sao (mặc định: false)

  // Timestamps
  appliedAt: Date                     // Thời gian ứng tuyển
  createdAt: Date                     // Thời gian tạo
  updatedAt: Date                     // Thời gian cập nhật
}
```

### Ví Dụ Dữ Liệu:

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "jobId": ObjectId("507f1f77bcf86cd799439012"),
  "candidateId": ObjectId("507f1f77bcf86cd799439011"),
  "candidateName": "Nguyễn Văn A",
  "candidateEmail": "nguyenvana@example.com",
  "candidatePhone": "0912345678",
  "jobTitle": "Senior React Developer",
  "employerId": ObjectId("507f1f77bcf86cd799439010"),
  "companyName": "Tech Company ABC",
  "coverLetter": "Tôi rất hứng thú với vị trí này...",
  "cvFile": "https://...",
  "status": "interview",
  "notes": "Ứng viên cần cảnh báo nhẹ",
  "interviewDate": ISODate("2024-02-01T14:00:00Z"),
  "interviewNotes": "Phỏng vấn online qua Zoom",
  "isViewed": true,
  "isStarred": true,
  "appliedAt": ISODate("2024-01-20T10:30:00Z"),
  "createdAt": ISODate("2024-01-20T10:30:00Z"),
  "updatedAt": ISODate("2024-01-25T09:15:00Z")
}
```

---

## 🔑 Indexes

Để tối ưu performance, các indexes sau được tạo:

### Users Collection:
```javascript
{ email: 1 }                          // Unique index cho email
{ role: 1 }                           // Index cho tìm kiếm theo role
```

### Jobs Collection:
```javascript
{ title: "text", description: "text" } // Text index để tìm kiếm full-text
{ employerId: 1 }                     // Index cho tìm công việc của nhà tuyển dụng
{ status: 1 }                         // Index cho lọc theo status
{ createdAt: -1 }                     // Index cho sắp xếp theo ngày
```

### Applications Collection:
```javascript
{ jobId: 1, candidateId: 1 }          // Unique index (một ứng viên mỗi job một lần)
{ employerId: 1 }                     // Index cho tìm ứng viên của nhà tuyển dụng
{ status: 1 }                         // Index cho lọc theo status
{ appliedAt: -1 }                     // Index cho sắp xếp theo ngày
```

---

## 📝 Mối Quan Hệ Giữa Collections

```
Users (Employer) 
    ↓ (employerId)
Jobs 
    ↓ (jobId)
Applications
    ↓ (candidateId)
Users (Candidate)
```

- **1 Employer** có thể tạo **n Jobs**
- **1 Job** có thể có **n Applications**
- **1 Candidate** có thể gửi **n Applications**

---

## 🔄 Sample Queries

### Lấy tất cả công việc của một nhà tuyển dụng:
```javascript
db.jobs.find({ employerId: ObjectId("...") })
```

### Lấy tất cả đơn ứng tuyển cho một công việc:
```javascript
db.applications.find({ jobId: ObjectId("...") })
```

### Tìm kiếm công việc theo từ khóa:
```javascript
db.jobs.find({ $text: { $search: "React" } })
```

### Lấy ứng viên đã được phỏng vấn:
```javascript
db.applications.find({ status: "interview" })
```

---

## 📊 Data Type Reference

| JavaScript | MongoDB |
|-----------|---------|
| String | String |
| Number | Int32, Int64, Double |
| Boolean | Boolean |
| Date | Date |
| Object | ObjectEmbedded |
| Array | Array |
| null | Null |
| ObjectId | ObjectId |

---

**Tài liệu này giúp bạn hiểu rõ cấu trúc dữ liệu của dự án.** 💾
