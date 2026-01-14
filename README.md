# 🎮 Gaming Store Admin Dashboard

A comprehensive web-based admin dashboard for managing a gaming store's inventory, orders, customers, suppliers, and employees.

## 🚀 Features

- **Authentication System**: Role-based access control (Admin, Employee, Client)
- **Dashboard**: Real-time statistics and charts
- **Products Management**: Add, edit, delete gaming products with categories, platforms, and ratings
- **Orders Management**: Track and manage customer orders with status updates
- **Customer Management**: Complete customer database with contact information
- **Supplier Management**: Manage supplier relationships and contact details
- **Employee Management**: Staff management with role assignments
- **Responsive Design**: Modern UI that works on all devices

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for data persistence
- **UI Framework**: Custom CSS with modern design principles
- **Charts**: Dynamic dashboard visualizations

## 📦 Project Structure

```
├── index.html          # Main application entry point
├── login.html          # Standalone login page
├── dashboard.html      # Standalone dashboard page
├── products.html       # Standalone products page
├── orders.html         # Standalone orders page
├── customers.html      # Standalone customers page
├── suppliers.html      # Standalone suppliers page
├── employees.html      # Standalone employees page
├── css/
│   └── styles.css      # Main stylesheet
└── js/
    ├── app.js          # Main application controller
    ├── auth.js         # Authentication logic
    ├── crud.js         # CRUD operations
    ├── dashboard.js    # Dashboard functionality
    ├── products.js     # Product management
    ├── orders.js       # Order management
    ├── customers.js    # Customer management
    ├── suppliers.js    # Supplier management
    ├── employees.js    # Employee management
    ├── storage.js      # Local storage utilities
    └── utils.js        # Utility functions
```

## 🔐 Login Credentials

Use these test accounts to access the system:

- **Admin**: admin@test.com / test123 (Full access)
- **Employee**: emp@test.com / test123 (View only)
- **Client**: client@test.com / test123 (Limited access)

## 🚀 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/gaming-store-admin.git
   cd gaming-store-admin
   ```

2. Open `index.html` in your web browser or serve it with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. Login with the test credentials provided above.

## 📱 Usage

1. **Login**: Use the test credentials to access the dashboard
2. **Dashboard**: View overview statistics and charts
3. **Products**: Manage gaming inventory (Admin only)
4. **Orders**: Track and update order status
5. **Customers**: Manage customer database
6. **Suppliers**: Handle supplier information
7. **Employees**: Manage staff and roles

## 🎯 Key Features

### Role-Based Access Control
- **Admin**: Full access to all features and data
- **Employee**: View-only access to most data
- **Client**: Limited access to specific features

### Data Management
- **Products**: Categories (Action, RPG, etc.), Platforms (PS5, Xbox, PC, Switch), Ratings, Stock management
- **Orders**: Status tracking (pending, paid, shipped, cancelled), Amount tracking
- **Customers**: Complete contact management with location data
- **Suppliers**: Supplier relationship management
- **Employees**: Staff management with role assignments

### Dashboard Analytics
- Real-time statistics
- Dynamic charts and visualizations
- Key performance indicators

## 🔧 Customization

The application is built with modularity in mind. You can easily:
- Add new product categories or platforms
- Customize the color scheme in `css/styles.css`
- Extend the authentication system
- Add new dashboard widgets
- Integrate with a backend API

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need support, please open an issue on GitHub.

---

**Note**: This is a frontend-only demonstration application. Data is stored locally in the browser's LocalStorage. For production use, integrate with a proper backend API and database.
