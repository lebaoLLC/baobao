# PRUTWin — Bản đồ dự án (đọc file này trước khi sửa code)

Đây là prototype giao diện app PRUTWin (Prudential), viết bằng React chạy
thẳng trên trình duyệt qua Babel Standalone — **không cần Node.js, không cần
build/bundler**. Chỉ cần mở `index.html` (hoặc host cả thư mục lên static
server) là chạy được.

## 1. Cấu trúc thư mục

```
prutwin-split/
├── index.html          <- điểm vào duy nhất, load CSS + JS theo thứ tự
├── style.css            <- toàn bộ CSS dùng chung
├── MAP.md                <- chính là file bạn đang đọc
└── js/
    ├── 00_react_hooks.js                    <- hook dùng chung (luôn load đầu)
    ├── 01_shared_components.js              <- header, bottom nav, placeholder ảnh
    ├── 02_login.js                          <- Step 0: Đăng nhập
    ├── 03_home_before_profile.js            <- Frame 1 & 2: Trang chủ + Prompt (chưa có hồ sơ)
    ├── 04_more_tab.js                       <- Frame 3: tab "Thêm" (Settings)
    ├── 05_onboarding_flow.js                <- Frame 1.1 → 6: luồng Tạo hồ sơ PRUTwin
    ├── 06_profile_after_and_contract.js     <- Frame 3.2 & 3.3: tab Hồ sơ + Chi tiết hợp đồng
    ├── 07_home_notifications_and_update.js  <- Frame 3.1, 4.1, 4.2, 4.3: Trang chủ (đã có hồ sơ) + Cập nhật hồ sơ
    ├── 08_chat_ai_flow.js                   <- Frame 2.1 → 4: toàn bộ Chatbox AI
    ├── 09_app_router.js                     <- App root, quản lý route (switch-case)
    └── 10_mount.js                          <- dòng render React vào DOM (luôn load cuối)
```

**Quan trọng:** thứ tự load trong `index.html` KHÔNG được đổi, vì các file
sau dùng component/const định nghĩa ở file trước (không dùng
import/export ES module, tất cả chạy chung 1 global scope).

## 2. Bảng tra cứu: muốn sửa 1 màn hình → vào file nào

| Bạn muốn sửa...                                   | Vào file này                              |
|----------------------------------------------------|--------------------------------------------|
| Màn đăng nhập                                       | `js/02_login.js`                            |
| Trang chủ khi CHƯA tạo hồ sơ (Frame 1)              | `js/03_home_before_profile.js`              |
| Màn "Bạn cần tạo hồ sơ PRUTwin" (Frame 2)           | `js/03_home_before_profile.js`              |
| Tab "Thêm" / Settings (Frame 3)                     | `js/04_more_tab.js`                         |
| Toàn bộ luồng tạo hồ sơ AI (Frame 1.1 → 6)          | `js/05_onboarding_flow.js`                  |
| Tab Hồ sơ khi ĐÃ tạo (Frame 3.2)                    | `js/06_profile_after_and_contract.js`       |
| Chi tiết 1 hợp đồng (Frame 3.3)                     | `js/06_profile_after_and_contract.js`       |
| Banner nhắc quyền lợi sức khỏe (Frame 3.1)          | `js/07_home_notifications_and_update.js`    |
| Trang chủ khi ĐÃ có hồ sơ (Frame 4.1)               | `js/07_home_notifications_and_update.js`    |
| Form cập nhật hồ sơ (Frame 4.2)                     | `js/07_home_notifications_and_update.js`    |
| Màn cảm ơn sau khi cập nhật (Frame 4.3)             | `js/07_home_notifications_and_update.js`    |
| Trang chủ Chatbox AI (Frame 2.1)                    | `js/08_chat_ai_flow.js`                     |
| AI Giải thích quyền lợi (Frame 2.2)                 | `js/08_chat_ai_flow.js`                     |
| AI Giải đáp thắc mắc (Frame 3 trong chat)           | `js/08_chat_ai_flow.js`                     |
| AI Mô phỏng tình huống (Frame 4 trong chat)         | `js/08_chat_ai_flow.js`                     |
| Header / Bottom nav / khung ảnh placeholder dùng chung | `js/01_shared_components.js`             |
| Màu sắc thương hiệu, bo góc, shadow, font           | `style.css` (phần `:root`)                  |
| Thêm/xoá 1 màn hình khỏi luồng, đổi thứ tự điều hướng | `js/09_app_router.js`                     |

## 3. Cách hoạt động của luồng điều hướng (routing)

App KHÔNG dùng react-router. Điều hướng được quản lý thủ công bằng 1 biến
`route` (state) trong `js/09_app_router.js`. Mỗi màn hình ứng với 1 chuỗi
`route` cụ thể, xem bảng đầy đủ ở đầu file `09_app_router.js`.

Để thêm 1 màn hình mới:
1. Viết component màn hình mới trong file `.js` phù hợp (hoặc tạo file mới,
   nhớ thêm `<script>` load nó vào `index.html` đúng vị trí theo thứ tự phụ thuộc).
2. Vào `js/09_app_router.js`, thêm 1 `case "tenRouteMoi":` mới trong switch,
   set `content = <ComponentMoi ... />`.
3. Ở nơi cần điều hướng tới màn mới, gọi `onXxx={() => setRoute("tenRouteMoi")}`.

## 4. Quy ước code chung

- Toàn bộ style dùng biến CSS trong `:root` (đầu `style.css`) — đổi màu
  thương hiệu / bo góc chỉ cần sửa biến, không phải tìm từng dòng.
- Các màn hình auto-fill dữ liệu mẫu (onboarding, update profile...) mô
  phỏng hiệu ứng "AI tự động điền" bằng `setTimeout`/`useEffect` — tìm từ
  khoá `setTimeout` trong đúng file để chỉnh tốc độ hoặc nội dung.
- `AssetPlaceholder` (trong `01_shared_components.js`) là khung caro xám
  thay chỗ cho ảnh/video thật. Hiện app đã có `js/00_assets_config.js`;
  thả file vào `assets/custom/` theo tên trong file đó là các slot logo/ảnh/video
  sẽ tự hiển thị thay cho khung placeholder.
- App được set cứng full màn hình mobile thật (không khung điện thoại giả,
  không thanh cuộn, có padding an toàn cho tai thỏ/Dynamic Island và thanh
  gạt dưới của iPhone) — cấu hình này nằm ở đầu `style.css`, mục 2.

## 5. Cách chạy thử

Vì dùng Babel Standalone (transform JSX ngay trên trình duyệt), **không thể
mở trực tiếp `index.html` bằng `file://`** ở một số trình duyệt do CORS khi
load các file `.js` riêng lẻ. Cách chạy đúng:

```bash
cd prutwin-split
python3 -m http.server 8080
# rồi mở http://localhost:8080/index.html
```

Hoặc dùng bất kỳ static server nào khác (VS Code Live Server, `npx serve`, v.v).

## 6. Giới hạn cần lưu ý khi giao cho AI khác sửa

- Đây là bản **không dùng build tool** (không webpack/vite) để giữ đơn giản,
  dễ mở trực tiếp. Nếu AI khác đề xuất chuyển sang cấu trúc npm/React project
  chuẩn (với `import`/`export`), cần báo trước vì sẽ đổi toàn bộ cách chạy.
- Dữ liệu trong toàn bộ file (`PERSONAL_INFO`, `CATEGORIES`, hợp đồng mẫu,
  câu trả lời AI mẫu...) đều là **dữ liệu giả lập cho mục đích demo**, chưa
  kết nối API thật.
