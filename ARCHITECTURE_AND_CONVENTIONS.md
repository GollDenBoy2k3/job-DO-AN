# 🏗️ Architecture & Code Conventions

## Project Architecture

Dự án được chia thành 2 phần độc lập: **Backend** và **Frontend**

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Frontend)                    │
│  React + Vite + TailwindCSS (Port 5173)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Server (Backend)                       │
│  Express.js + Node.js (Port 5000)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Routes → Controllers → Models                  │   │
│  │ + Middleware (Auth, ErrorHandler)             │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ MongoDB Queries
                     │
┌────────────────────▼────────────────────────────────────┐
│                    Database                              │
│  MongoDB (Local hoặc MongoDB Atlas)                    │
│  Collections: Users, Jobs, Applications               │
└─────────────────────────────────────────────────────────┘
```

---

## Backend Architecture (MVC Pattern)

```
backend/src/
├── models/              # MongoDB Schemas
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── controllers/         # Business Logic
│   ├── authController.js
│   ├── jobController.js
│   └── applicationController.js
│
├── routes/              # API Routes
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
│
├── middleware/          # Custom Middleware
│   ├── auth.js          # JWT verification
│   └── errorHandler.js  # Global error handling
│
├── config/              # Configuration
│   └── database.js      # MongoDB connection
│
├── utils/               # Utility Functions
│   └── jwt.js           # JWT operations
│
└── server.js            # Main Application Entry
```

### Request Flow:

```
Request
  ↓
Middleware (CORS, logging)
  ↓
Routes (Parse request path)
  ↓
Controllers (Validate, process data)
  ↓
Models (Database operations)
  ↓
Response
```

---

## Frontend Architecture

```
frontend/src/
├── components/          # Reusable React Components
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   └── ...
│
├── pages/               # Full Page Components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── JobDetailPage.jsx
│   ├── JobsListPage.jsx
│   ├── CandidateDashboardPage.jsx
│   └── EmployerDashboardPage.jsx
│
├── context/             # React Context (State Management)
│   └── AuthContext.jsx
│
├── hooks/               # Custom Hooks
│   └── useJobs.js
│
├── services/            # API Service Functions
│   ├── jobService.js
│   └── applicationService.js
│
├── utils/               # Utility Functions
│   └── api.js           # Axios instance
│
├── styles/              # CSS
│   └── globals.css      # Global Tailwind styles
│
├── App.jsx              # Main Component with Routes
└── main.jsx             # Entry Point
```

### Component Hierarchy:

```
App
├── AuthProvider
│   └── BrowserRouter
│       ├── Navbar
│       └── Routes
│           ├── HomePage
│           ├── LoginPage
│           ├── RegisterPage
│           ├── JobDetailPage
│           ├── JobsListPage
│           ├── CandidateDashboardPage
│           └── EmployerDashboardPage
```

---

## 📝 Code Naming Conventions

### Backend

```javascript
// Files: camelCase.js
authController.js
jobService.js

// Classes/Functions: camelCase
export const createJob = async (req, res) => { }
export const getApplicationById = async (id) => { }

// Constants: UPPER_SNAKE_CASE
const JWT_EXPIRY = '7d';
const SALT_ROUNDS = 10;

// Variables: camelCase
let userEmail = "example@gmail.com";
const phoneNumber = "0912345678";
```

### Frontend

```javascript
// Files: PascalCase.jsx (Components), camelCase.js (Hooks/Utils)
HomePage.jsx
useJobs.js
api.js

// Components: PascalCase
function HomePage() { }
function JobCard() { }
export const AuthProvider = ({ children }) => { }

// Functions: camelCase
const fetchJobs = async () => { }
const handleSearch = (e) => { }

// Variables: camelCase
const [jobs, setJobs] = useState([]);
let searchQuery = "";
```

---

## 💬 Comment Guidelines

### Backend Comments

```javascript
/**
 * Lấy danh sách công việc (Tiếng Việt)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware
 * @returns {Promise<void>}
 */
export const getAllJobs = async (req, res, next) => {
  // Implementation
};

// Inline comments cho logic phức tạp
// Kiểm tra user đã apply công việc này chưa
const existingApp = await Application.findOne({
  jobId,
  candidateId: req.user._id,
});
```

### Frontend Comments

```jsx
// Component description
// Trang chi tiết công việc - hiển thị thông tin chi tiết và nút ứng tuyển

// JSX Comments
{/* Danh sách kỹ năng yêu cầu */}
<div className="skills">
  {job.requiredSkills.map(skill => (...))}
</div>

// Function comments
/**
 * Hook để lấy danh sách công việc
 * @param {Object} filters - Filter parameters
 * @param {number} page - Page number
 * @returns {Object} { jobs, loading, error, pagination }
 */
export const useJobs = (filters = {}, page = 1) => {
  // Implementation
};
```

---

## 🔐 Security Best Practices

### Backend

```javascript
// ✅ DO: Hash passwords trước lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ✅ DO: Verify JWT token
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // ...
};

// ✅ DO: Validate input
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: 'Please provide email and password',
  });
}

// ❌ DON'T: Trả về password trong response
// res.json({ user }) // Password vẫn trong user object
// ✅ DO: Xóa password trước khi send
const userResponse = user.toObject();
delete userResponse.password;
res.json({ user: userResponse });
```

### Frontend

```javascript
// ✅ DO: Lưu token safely
localStorage.setItem('token', token);

// ✅ DO: Attach token vào API requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ DO: Handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ❌ DON'T: Lưu sensitive data trong localStorage
// localStorage.setItem('password', userPassword);
```

---

## 📊 Database Schema Rules

### Naming Conventions

```javascript
// Fields: camelCase
{
  firstName: String,     // ✅ Good
  mobile_number: String, // ❌ Bad
  PhoneNumber: String,   // ❌ Bad
}

// Collections: Singular, PascalCase
db.User (not Users)
db.Job (not Jobs)
db.Application (not Applications)

// Embedded documents (PascalCase)
candidate: {
  bio: String,
  skills: [String],
  desiredSalary: {
    min: Number,
    max: Number,
  }
}
```

### Indexing Strategy

```javascript
// Tạo index cho fields được search thường xuyên
jobSchema.index({ title: 'text', description: 'text' });

// Tạo index cho foreign keys
jobSchema.index({ employerId: 1 });

// Tạo index cho sorting
jobSchema.index({ createdAt: -1 });

// Unique indexes
userSchema.index({ email: 1 }, { unique: true });
```

---

## 🔄 API Response Format

### Success Response

```javascript
// 200 OK
{
  success: true,
  data: { ... },
  message: "Operation successful"
}

// 201 Created
{
  success: true,
  message: "Resource created successfully",
  data: { ... }
}
```

### Error Response

```javascript
// 400 Bad Request
{
  success: false,
  message: "Validation error message"
}

// 401 Unauthorized
{
  success: false,
  message: "Please login to access this resource"
}

// 403 Forbidden
{
  success: false,
  message: "You don't have permission to access this resource"
}

// 404 Not Found
{
  success: false,
  message: "Resource not found"
}

// 500 Server Error
{
  success: false,
  message: "Server error"
}
```

---

## 🧪 Testing Your Code

### Testing Endpoints (Using curl or Postman)

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Nguyen A","email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Get Jobs
curl http://localhost:5000/api/jobs?page=1&limit=10

# Create Job (with token)
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"React Developer",...}'
```

---

## 📦 Project Dependencies

### Backend Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| cors | Cross-origin requests |
| dotenv | Environment variables |
| multer | File uploads |
| express-validator | Input validation |

### Frontend Dependencies

| Package | Purpose |
|---------|---------|
| react | UI library |
| react-router-dom | Routing |
| axios | HTTP client |
| tailwindcss | CSS framework |
| lucide-react | Icons |

---

## 🚀 Performance Tips

### Backend

```javascript
// ✅ DO: Use pagination
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;
const jobs = await Job.find(filter).skip(skip).limit(limit);

// ✅ DO: Select only needed fields
const users = await User.find().select('name email phone');

// ✅ DO: Use indexes for frequently queried fields

// ❌ DON'T: Load all documents
const allJobs = await Job.find(); // Bad for large datasets
```

### Frontend

```javascript
// ✅ DO: Lazy load images
<img src={job.logo} alt="logo" loading="lazy" />

// ✅ DO: Use memo for expensive components
const JobCard = React.memo(({ job }) => { ... });

// ✅ DO: Debounce search input
const [searchQuery, setSearchQuery] = useState('');
// Use useCallback + debounce

// ❌ DON'T: Render all items at once
{items.map(...)} // For 1000+ items, use virtualization
```

---

## 📚 Extending the Project

### Adding a New Feature

1. **Backend:**
   - Create model in `src/models/`
   - Create controller in `src/controllers/`
   - Create routes in `src/routes/`
   - Add route to `server.js`

2. **Frontend:**
   - Create components in `src/components/`
   - Create pages in `src/pages/`
   - Create hooks if needed in `src/hooks/`
   - Add routes in `App.jsx`

### Example: Adding a new field to User

```javascript
// 1. Backend - Update model
// src/models/User.js
userSchema.add({
  companyPhone: String,  // New field
  companyAddress: String, // New field
});

// 2. Backend - Update controller to handle new fields
// src/controllers/authController.js
const { companyPhone, companyAddress } = req.body;
user.employer.companyPhone = companyPhone;

// 3. Frontend - Update form
// In registration or profile page
<input name="companyPhone" ... />
<input name="companyAddress" ... />

// 4. Frontend - Update API call
const response = await apiClient.put('/auth/update-profile', {
  employer: {
    companyPhone,
    companyAddress,
  }
});
```

---

## 🎯 Git Commit Conventions

```bash
# Format: type(scope): message

# Examples:
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(jobs): correct salary calculation"
git commit -m "docs(api): update API documentation"
git commit -m "refactor(frontend): optimize JobCard component"

# Types: feat, fix, docs, style, refactor, test, chore
```

---

**Theo dõi các conventions này để duy trì code quality! 💪**
