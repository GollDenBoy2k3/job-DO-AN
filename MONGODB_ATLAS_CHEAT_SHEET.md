# 🚀 MongoDB Atlas - Cheat Sheet (Quick Reference)

Nếu bạn muốn chỉ những bước cần thiết mà không muốn đọc hết documentation.

---

## ⚡ 5 Phút Setup

### 1️⃣ Tạo Account
```
https://www.mongodb.com/cloud/atlas/register
Tạo tài khoản → Xác minh email
```

### 2️⃣ Tạo Cluster
```
Dashboard → Create Deployment
- Provider: AWS
- Region: ap-southeast-1 (Singapore)
- Tier: M0 (Free)
→ Chờ 1-2 phút
```

### 3️⃣ Tạo User
```
Database Access → Add New Database User
Username: jobfinder_user
Password: [Chọn mật khẩu mạnh]
→ Copy password đôi để nhớ ⚠️
```

### 4️⃣ Whitelist IP
```
Network Access → Add IP Address
→ Chọn "Add Current IP Address"
```

### 5️⃣ Lấy Connection String
```
Database → Connect → "Connect your application"
Copy: mongodb+srv://jobfinder_user:PASSWORD@cluster0.xxx.mongodb.net/job-search
```

### 6️⃣ Cấu hình .env
```env
# backend/.env
MONGODB_URI=mongodb+srv://jobfinder_user:YOUR_PASSWORD@cluster0.xxx.mongodb.net/job-search?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 7️⃣ Test
```bash
cd backend
npm run dev
# Nên thấy: MongoDB Connected: cluster0
```

✅ **Done!**

---

## 🔑 Connection String Format

```
mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER].[ID].mongodb.net/[DATABASE]
```

### Ví dụ:
```
mongodb+srv://jobfinder_user:MySecret123@cluster0.wk8x9k2.mongodb.net/job-search
```

---

## ⚠️ Common Issues & Fixes

| Error | Solution |
|-------|----------|
| `authentication failed` | ❌ Check username/password |
| `Could not connect` | ❌ Whitelist your IP address |
| `getaddrinfo ENOTFOUND` | ❌ Check cluster name in string |
| `timeout` | ❌ Wait for cluster to finish creating |

---

## 🔐 Password với ký tự đặc biệt

Nếu password có ký tự đặc biệt như `!@#$%`, cần **URL encode**:

| Ký tự | Encode |
|-------|--------|
| `!` | `%21` |
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |

**Ví dụ:**
- Password: `Pass@word!`
- Trong URL: `Pass%40word%21`

---

## 📝 Ghi nhớ

```
✅ Cluster được tạo
✅ User: jobfinder_user
✅ Password: _______________  (ghi lại ở đây!)
✅ Connection String: mongodb+srv://...
```

---

## 🔗 Chi tiết đầy đủ

Xem: **[MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)** 📖

---

**Done! Chúng ta sẵn sàng code! 🚀**
