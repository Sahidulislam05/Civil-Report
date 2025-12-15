# Civil Report
## 🏙️ Public Infrastructure Issue Reporting System  
 
#### A full-stack civic tech platform where citizens can report public infrastructure problems and track their resolution transparently. Admins and staff can efficiently manage, assign, and resolve issues with proper workflow tracking.

---

## 🌐 Live Website
🔗 **Live Site:** https://civil-report.vercel.app  

---

## 🔐 Admin Credentials
- **Admin Email:** admin@example.com  
- **Admin Password:** admin123  

---

## 👥 Demo Accounts
### 👤 Citizen
### 🧑‍🔧 Staff
---

## 📂 GitHub Repositories
- **Client Repo:** https://github.com/Sahidulislam05/Civil-Report  
- **Server Repo:** https://github.com/Sahidulislam05/Public-Issue-Server  

---

## 🧠 Project Overview
Municipal services often suffer from delayed response, lack of transparency, and poor tracking.  
This system solves that by providing:

- A centralized reporting platform for citizens
- Role-based dashboards for Admin, Staff, and Citizen
- Real-time issue tracking with timeline history
- Priority handling through premium subscription & issue boosting

---

## 🚀 Core Features (Highlights)

- 🔐 **Role-Based Authentication** (Admin, Staff, Citizen)
- 🧾 **Issue Reporting with Image & Location**
- ⏳ **Full Issue Lifecycle Tracking (Timeline)**
- 📊 **Dashboards with stats & charts**
- ⬆️ **Upvote System (1 vote per user per issue)**
- ⚡ **Boost Issue Priority via Payment**
- ⭐ **Premium Subscription for Unlimited Reports**
- 💳 **Stripe Payment Integration**
- 📄 **Downloadable Invoice PDF**
- 🚫 **Admin Block / Unblock System**
- 🔎 **Search, Filter & Pagination (Server-side)**
- 🔔 **SweetAlert & Toast Notifications**
- 📱 **Fully Responsive UI (Mobile / Tablet / Desktop)**

---

## 🏠 Home Page
- Responsive Navbar with profile dropdown
- Beautiful banner / slider
- Latest resolved issues (minimum 6)
- Feature section & “How it works”
- Extra sections for engagement
- Clean footer
- Custom 404 Not Found page

---

## 📄 All Issues Page
- Card-based issue listing
- Shows:
  - Image, title, category
  - Status & priority badges
  - Location
  - Upvote count
- Server-side:
  - Search
  - Filter (status, category, priority)
  - Pagination
- Upvote rules:
  - Login required
  - Cannot upvote own issue
  - Only once per user
  - Instant UI update

---

## 🔍 Issue Details Page (Private Route)
- Full issue information
- Action buttons:
  - Edit (owner + pending only)
  - Delete (owner only)
  - Boost Issue (৳100 via Stripe)
- Assigned staff information
- **Vertical Timeline UI**
  - Latest updates on top
  - Status badges
  - Read-only audit history

Timeline records created for:
- Issue creation
- Staff assignment
- Status changes
- Boost payment
- Rejection
- Closure

---

## 👤 Citizen Dashboard
- Dashboard stats with charts
- My Issues:
  - Edit / Delete (pending only)
  - Filters
- Report Issue:
  - Free users: max 3 issues
  - Premium users: unlimited
- Profile:
  - Premium subscription (৳1000)
  - Premium badge
  - Block warning if blocked

---

## 🧑‍🔧 Staff Dashboard
- View only assigned issues
- Change issue status with rules:
  - Pending → In-Progress
  - In-Progress → Working
  - Working → Resolved
  - Resolved → Closed
- Each change creates a timeline entry
- Profile update (name, photo)

---

## 🛡️ Admin Dashboard
- Dashboard stats & charts
- Manage Issues:
  - Assign staff (once only)
  - Reject pending issues
- Manage Users:
  - Block / Unblock citizens
  - View subscription info
- Manage Staff:
  - Create staff (Firebase + DB)
  - Update & delete staff
- Payments Page:
  - View all payments
  - Filter & charts
  - Invoice PDF download

---

## 🧩 Challenge Tasks
- Token verification & role-based middleware
- Server-side pagination
- Server-side search & filter
- Loader during data fetching
- Invoice PDF download (Admin & User)

---

## 🎯 Optional Tasks
- Axios interceptors
- Add animations (Framer Motion or AOS)


---

## 🛠️ Technologies Used

### Frontend
- React + Vite
- React Router
- Tailwind CSS + DaisyUI
- TanStack Query
- Axios
- Firebase Authentication
- Stripe Checkout
- React Icons
- SweetAlert2 / React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe API
- PDF Generation

---

## 🔒 Security & Best Practices
- Environment variables for Firebase & MongoDB secrets
- Protected private routes
- Persistent login after refresh
- No Lorem Ipsum text used
- Clean, readable commit history

---

## 📌 Final Notes
This project focuses on **real-world usability, transparency, and scalability**.  
It simulates how a modern city infrastructure reporting system can work efficiently with proper accountability.

---

✨ **Thank you for reviewing my project!**  
If you have any questions, feel free to explore the dashboards using the provided credentials.
