# <img src="./public/Dashboard-icon.svg" alt="Dashboard Icon" width="24" height="24" align="center" /> Finance Dashboard - Responsive Frontend App (React + Tailwind)

Welcome to **Finance Dashboard Pro**, a modern, responsive frontend dashboard built using **React 18**, **Vite**, and **Tailwind CSS**. This project demonstrates advanced UI/UX design, global state management, and Role-Based Access Control (RBAC). Whether you’re a fellow developer or a hiring manager, this project reflects my capabilities in building scalable frontend architectures, persistent state management, and interactive data visualization.

## 💼 About the Project

Finance Dashboard Pro is a comprehensive tool for tracking, visualizing, and analyzing financial activity. It features a seamless React frontend with "Glassmorphism" navbars and gradient summary cards. The app allows users to view dynamic charts and calculated insights, while administrators have full CRUD capabilities to manage transactions. Everything is powered by a robust React Context API setup combined with `localStorage` for a persistent, seamless experience without needing a live backend.

## 🔑 Core Features

- **Role-Based Access Control (RBAC)**: Custom segmented control toggle to switch seamlessly between Viewer and Admin modes.
- **Persistent State Management**: Transactions, the active User Role, and the UI Theme are all saved locally via Context API and `localStorage`.
- **Smart Insights Engine**: Dynamically calculates the Largest Expense, Savings Rate, and Most Frequent Spending Category using native JavaScript methods.
- **Dynamic Visualizations**: Interactive Cash Flow (Line) and Categorical (Pie) charts using Recharts that adapt to the current theme.
- **Premium UI & Dark Mode**: Fully supports system-level or user-toggled Dark Mode with hover micro-interactions.
- **CRUD Operations**: Admins can add and delete transactions with built-in confirmation safeguards.

## 🔧 Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Charts**: Recharts
- **Icons**: Lucide-React
- **Version Control**: Git & GitHub

## 📽️ Working of the App

- 🧑 **Viewer Mode**: Read-only access to interactive charts and calculated financial insights.
- 🔐 **Admin Access**: Unlocks full capabilities to add new transactions and delete existing ones securely.
- 🌗 **Theme Toggling**: Users can switch between Light and Dark mode seamlessly, updating charts and UI elements instantly.
- 💾 **Data Persistence**: Refreshing the browser maintains all user inputs, active themes, and selected roles.

## 📸 Screenshots

<p float="left">
  <img src="src\assets\Dash_light.png" alt="Dashboard Light Mode" width="45%" style="margin-right: 5%;" />
  <img src="src\assets\Charts.png" alt="Charts and Dark Mode" width="45%" />
</p>
<p float="left">
  <img src="src\assets\Admin_controls.png" alt="Admin Controls" width="45%" style="margin-right: 5%;" />
  <img src="src\assets\Viewer.png" alt="Viewer Mode" width="45%" />
</p>

## 🔮 Future Enhancements

- Integrate a live backend API (Node.js/Express) to replace `localStorage`.
- Add user authentication (Firebase or JWT).
- Implement an export feature to download financial reports as CSV or PDF.
- Add filtering options by date range (e.g., Last 7 Days, Last Month).

## Contact

I’m open to opportunities and collaborations!  
📧 Reach out to me at [saicharanchilla7777@gmail.com](mailto:saicharanchilla7777@gmail.com)  
🔗 Connect with me on [LinkedIn](https://www.linkedin.com/in/saicharan-chilla-2b2201271/)  
💻 Check out more of my work on [GitHub](https://github.com/228w1a1278)