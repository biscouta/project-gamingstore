// Main Application Initialization

function init() {
  // Check authentication first
  const user = auth.getUser();
  
  if (!user) {
    // If not on login page, redirect to login
    if (!window.location.pathname.includes('login.html')) {
      window.location.href = 'login.html';
      return;
    }
    // Show login page
    if ($('loginPage')) {
      $('loginPage').style.display = 'block';
      $('appContent').style.display = 'none';
    }
  } else {
    // User is authenticated
    if ($('appContent')) {
      ui.showApp();
    }
    
    // Update UI for authenticated user
    ui.updateUserInfo();
    ui.setupRoleUI();
    
    if (!auth.isAdmin() && $('employeesTab')) {
      $('employeesTab').style.display = 'none';
    }
    
    // Only render dashboard if we're on the dashboard page
    if (window.location.pathname.includes('dashboard.html') || $('stats')) {
      dashboard.render();
    }
    
    // Only render modules if their containers exist
    if (window.location.pathname.includes('products.html') || $('productsTable')) {
      products.render();
    }
    if (window.location.pathname.includes('orders.html') || $('ordersTable')) {
      orders.render();
    }
    if (window.location.pathname.includes('customers.html') || $('customersTable')) {
      customers.render();
    }
    if (window.location.pathname.includes('suppliers.html') || $('suppliersTable')) {
      suppliers.render();
    }
    if (window.location.pathname.includes('employees.html') || $('employeesTable')) {
      employees.render();
    }
  }
  
  // Set today's date
  if ($('orderDate')) $('orderDate').value = todayISO();
  
  
  const loginBtn = $('loginBtn');
  if (loginBtn) {
    loginBtn.onclick = () => {
      try {
        const email = $('loginEmail').value.trim();
        const password = $('loginPassword').value.trim();
        auth.login(email, password);
        location.reload();
      } catch (e) {
        $('loginAlert').innerHTML = `<div class="alert alert-error">${e.message}</div>`;
      }
    };
  }
  
  // Tab navigation
  document.querySelectorAll('.tab[data-page]').forEach(tab => {
    tab.onclick = () => ui.showPage(tab.dataset.page);
  });
  
  // Products events
  if ($('addProductBtn')) {
    $('addProductBtn').onclick = () => {
      products.add();
    };
  }
  if ($('clearProductsBtn')) {
    $('clearProductsBtn').onclick = () => products.clearAll();
  }

  if ($('saveProductBtn')) {
    $('saveProductBtn').onclick = () => products.saveEdit();
  }
  if ($('cancelProductEditBtn')) {
    $('cancelProductEditBtn').onclick = () => products.cancelEdit();
  }
  
    if ($('productImage')) {
    $('productImage').addEventListener('change', function(e) {
      const file = e.target.files[0];
      const preview = $('imagePreview');
 
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 4px; border: 1px solid #ddd;">`;
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = '';
      }
    });
  }

  if ($('editProductImage')) {
    $('editProductImage').addEventListener('change', function(e) {
      const file = e.target.files[0];
      const preview = $('editImagePreview');
      if (!preview) return;

      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 4px; border: 1px solid #ddd;">`;
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = '';
      }
    });
  }
  
  // Orders events
  if ($('addOrderBtn')) {
    $('addOrderBtn').onclick = () => orders.add();
  }
  if ($('clearOrdersBtn')) {
    $('clearOrdersBtn').onclick = () => orders.clearAll();
  }
  if ($('saveOrderBtn')) {
    $('saveOrderBtn').onclick = () => orders.saveEdit();
  }
  if ($('cancelOrderEditBtn')) {
    $('cancelOrderEditBtn').onclick = () => orders.cancelEdit();
  }
  
  // Customers events
  if ($('addCustomerBtn')) {
    $('addCustomerBtn').onclick = () => customers.add();
  }
  if ($('clearCustomersBtn')) {
    $('clearCustomersBtn').onclick = () => customers.clearAll();
  }
  if ($('saveCustomerBtn')) {
    $('saveCustomerBtn').onclick = () => customers.saveEdit();
  }
  if ($('cancelCustomerEditBtn')) {
    $('cancelCustomerEditBtn').onclick = () => customers.cancelEdit();
  }
  
  // Suppliers events
  if ($('addSupplierBtn')) {
    $('addSupplierBtn').onclick = () => suppliers.add();
  }
  if ($('clearSuppliersBtn')) {
    $('clearSuppliersBtn').onclick = () => suppliers.clearAll();
  }
  if ($('saveSupplierBtn')) {
    $('saveSupplierBtn').onclick = () => suppliers.saveEdit();
  }
  if ($('cancelSupplierEditBtn')) {
    $('cancelSupplierEditBtn').onclick = () => suppliers.cancelEdit();
  }
  
  // Employees events
  if ($('addEmployeeBtn')) {
    $('addEmployeeBtn').onclick = () => employees.add();
  }
  if ($('clearEmployeesBtn')) {
    $('clearEmployeesBtn').onclick = () => employees.clearAll();
  }
  if ($('saveEmployeeBtn')) {
    $('saveEmployeeBtn').onclick = () => employees.saveEdit();
  }
  if ($('cancelEmployeeEditBtn')) {
    $('cancelEmployeeEditBtn').onclick = () => employees.cancelEdit();
  }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
