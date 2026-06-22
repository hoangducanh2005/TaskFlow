# Tình trạng dự án TaskFlow

Dự án TaskFlow hiện tại đang được phát triển với stack **MERN** (MongoDB, Express, React, Node.js) và đã hoàn thành phần lớn giao diện Frontend cũng như bộ khung cơ bản cho Backend.

## 1. Tiến độ hiện tại (Những gì đã hoàn thành)

### 🚀 Backend (Node.js + Express + Mongoose)
- **Cấu trúc project:** Đã khởi tạo cấu trúc MVC (models, controllers, route, config).
- **Database:** Đã kết nối thành công với MongoDB (`config/db.js`).
- **Models:** Đã tạo `Task.js` schema với các trường: `title`, `status` ('active', 'completed'), và `completedAt`.
- **API Routes & Controllers:** Đã hoàn thành các API CRUD cơ bản:
  - `GET /api/tasks` (Lấy danh sách task)
  - `POST /api/tasks` (Tạo task mới)
  - `PUT /api/tasks/:id` (Cập nhật task)
  - `DELETE /api/tasks/:id` (Xóa task)

### 🎨 Frontend (React + Vite + TailwindCSS)
- **Cài đặt thư viện:** Đã cài đặt đầy đủ các thư viện cần thiết như `react-router`, `sonner` (Toast notifications), `axios`, `lucide-react`, và UI framework `shadcn/ui`.
- **Cấu trúc & Routing:** Thiết lập cấu trúc thư mục quy chuẩn (`components`, `pages`, `lib`, `assets`). Đã cấu hình `react-router` trong `App.jsx` với `HomePage` và `NotFound`.
- **Giao diện (UI Components):** Đã xây dựng đầy đủ các component chính:
  - `Header`, `Footer`
  - `AddTask` (Nhập task mới)
  - `TaskList`, `TaskCard`, `TaskEmptyState` (Hiển thị danh sách nhiệm vụ)
  - `StatsAndFilters` (Thống kê và bộ lọc)
  - `TaskListPagination` (Phân trang)
  - `DateTimeFilters` (Lọc theo thời gian)
- **Logic xử lý cơ bản (HomePage):** Đã gọi API lấy dữ liệu, xử lý bộ lọc (All/Active/Completed), xử lý phân trang (Pagination) ở Client-side.

---

## 2. Các vấn đề hiện tại (Cần khắc phục ngay)

- **Sự bất đồng bộ Dữ liệu giữa Frontend & Backend:** 
  - Backend `GET /api/tasks` đang trả về một Mảng Array gốc (`[ { task1 }, { task2 } ]`).
  - Trong khi đó, ở `HomePage.jsx` của Frontend đang mong đợi object có dạng: `{ tasks: [...], activeCount: 0, completeCount: 0 }` và truyền thêm param `?filter=today`. Backend hiện chưa xử lý phần filter này.
- **Lỗi import component:** Ở `HomePage.jsx` đang import `DateTimeFilter` nhưng tên file thực tế trong folder components là `DateTimeFilters.jsx`.

---

## 3. Các Phase cần làm tiếp theo (Roadmap)

### Phase 1: Đồng bộ hóa và sửa lỗi API (Integration & Bug Fix)
- [ ] Sửa lại controller `getAllTasks` ở backend để nhận query string `?filter=...`.
- [ ] Tính toán số lượng `activeCount` và `completeCount` ở Backend và trả về đúng định dạng JSON mà Frontend mong đợi.
- [ ] Kiểm tra và sửa các lỗi sai tên file khi import (ví dụ: `DateTimeFilters.jsx`).
- [ ] Hoàn thiện các API calls (Create, Update, Delete) trong các component như `AddTask`, `TaskCard` bằng `axios`.

### Phase 2: Hoàn thiện tính năng Frontend (Feature Completion)
- [ ] Tích hợp `sonner` toast vào các hành động tạo, sửa, xóa thành công/thất bại.
- [ ] Xử lý trạng thái Loading (Skeleton hoặc Spinner) trong thời gian đợi fetch dữ liệu từ API.
- [ ] Xử lý logic hiển thị Empty State nếu không có Task nào.

### Phase 3: Trau chuốt Giao diện & Trải nghiệm người dùng (UX/UI Polish)
- [ ] Kiểm tra responsive trên các kích thước màn hình (Mobile, Tablet, Desktop).
- [ ] Thêm các hiệu ứng micro-animations khi chuyển trạng thái của Task (ví dụ: từ Active sang Completed).
- [ ] Bổ sung tính năng kéo thả (Drag & Drop) nếu cần thiết để sắp xếp thứ tự ưu tiên.

### Phase 4: Kiểm thử và Triển khai (Testing & Deployment)
- [ ] Kiểm tra toàn bộ luồng (E2E testing) xem từ lúc tạo task đến lúc xóa có bị lỗi không.
- [ ] Xử lý Edge Cases (Nhập tên task quá dài, kết nối mạng lỗi,...).
- [ ] Deploy Backend lên các nền tảng như Render hoặc Vercel.
- [ ] Deploy Frontend lên nền tảng như Vercel hoặc Netlify và cấu hình lại `.env` cho URL API production.
