# LuxeWatch

## 🚀 Overview
LuxeWatch is an intuitive and responsive web application showcasing a collection of luxury watches. Focus heavily on frontend development, UI design, and interaction.

## 📌 Features
- **Product List Page:** Displays watches with images, names, brands, and prices.
- **Product Detail View:** Clicking on a watch shows detailed information in a modal.
- **Shopping Cart ("My Bag") Feature:** Users can add watches to their bag, view total prices, adjust quantities, and remove items.
- **State Management:** Implemented using React’s built-in state management (`useState`,`useEffect` and `useContext`).
- **Barcode Scanner:** Uses a web-based barcode scanner to scan products.
- **Backend Integration (Optional Bonus):** LuxeWatch fetches product data dynamically from an API.
- **Free Tier Render Hosting:** Since the backend is hosted on Render’s free tier, data loading may take a minute.

---

## 🛠️ Setup & Run Locally
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/LuxeWatch.git
   cd LuxeWatch
   ```
2. **Install dependencies:**
   ```sh
   npm install  # or yarn install
   ```
3. **Start the development server:**
   ```sh
   npm start  # or yarn start
   ```
4. Open `http://localhost:3000` in your browser.

---

## 🎨 Design Choices
1. **UI/UX Design:**
   - Luxe and minimalistic design for a premium feel.
   - Used **Tailwind CSS** for a responsive and clean layout.
   - Modals for product details to avoid unnecessary navigation.
2. **State Management:**
   - Used `useState` and `useContext` for efficient state handling.
   - Context API is used for global state management of the cart.
3. **Barcode Scanner:**
   - Integrated **QuaggaJS** for real-time barcode scanning.
   - Implemented a recent scans history feature with a clear history option.

---

## 🏆 Challenges & Solutions
### Challenge: Barcode Scanner Compatibility
- **Issue:** Some devices had trouble accessing the camera.
- **Solution:** Implemented a fallback message prompting users to allow camera permissions.

---

## ✅ Optional/Bonus Tasks Completed
✔ **Backend Integration**: Fetching product data dynamically from an API.
✔ **Barcode Scanner**: Implemented with QuaggaJS.

---

## 🌐 Deployment Links

Frontend: [LuxeWatch on Netlify](https://luxewatch.netlify.app)

Backend: [LuxeWatch API on Render](https://luxewatch-channelblend.onrender.com)
