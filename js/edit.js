// Dynamic edit page

const editPage = {
  type: null,
  id: null,
  config: null,
  item: null,

  getConfig(type) {
    const configs = {
      products: {
        label: 'Product',
        resource: 'products',
        listPage: 'products.html',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Game name' },
          { key: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Action, RPG, etc.' },
          { key: 'platform', label: 'Platform', type: 'select', required: true, options: ['PS5', 'Xbox', 'PC', 'Switch'] },
          { key: 'price', label: 'Price (MAD)', type: 'number', required: true, min: 0, placeholder: '499' },
          { key: 'stock', label: 'Stock', type: 'number', required: true, min: 0, placeholder: '50' },
          { key: 'rating', label: 'Rating (0-5)', type: 'number', required: false, min: 0, max: 5, step: 0.1, placeholder: '4.5' },
          { key: 'image', label: 'Product Image', type: 'file', required: false, accept: 'image/*' }
        ]
      },
      orders: {
        label: 'Order',
        resource: 'orders',
        listPage: 'orders.html',
        fields: [
          { key: 'customer', label: 'Customer', type: 'text', required: true, placeholder: 'Customer name' },
          { key: 'status', label: 'Status', type: 'select', required: true, options: ['pending', 'paid', 'shipped', 'cancelled'] },
          { key: 'amount', label: 'Amount (MAD)', type: 'number', required: true, min: 0, placeholder: '999' },
          { key: 'date', label: 'Date', type: 'date', required: true }
        ]
      },
      customers: {
        label: 'Customer',
        resource: 'customers',
        listPage: 'customers.html',
        fields: [
          { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
          { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
          { key: 'phone', label: 'Phone', type: 'tel', required: false, placeholder: '+212 600 000 000' },
          { key: 'city', label: 'City', type: 'text', required: false, placeholder: 'Casablanca' }
        ]
      },
      suppliers: {
        label: 'Supplier',
        resource: 'suppliers',
        listPage: 'suppliers.html',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Supplier name' },
          { key: 'email', label: 'Email', type: 'email', required: false, placeholder: 'supplier@example.com' },
          { key: 'phone', label: 'Phone', type: 'tel', required: false, placeholder: '+212 600 000 000' }
        ]
      },
      employees: {
        label: 'Employee',
        resource: 'employees',
        listPage: 'employees.html',
        fields: [
          { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Smith' },
          { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'jane@company.com' },
          { key: 'phone', label: 'Phone', type: 'tel', required: false, placeholder: '+212 600 000 000' },
          { key: 'role', label: 'Role', type: 'select', required: true, options: ['admin', 'employee', 'owner'] }
        ]
      }
    };

    return configs[type] || null;
  },

  init() {
    const user = auth.getUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    if (!auth.isAdmin()) {
      alert('Access denied. Admin role required for editing.');
      window.location.href = 'dashboard.html';
      return;
    }

    ui.updateUserInfo();
    ui.setupRoleUI();

    const params = new URLSearchParams(window.location.search);
    this.type = params.get('type');
    this.id = params.get('id');
    this.config = this.getConfig(this.type);

    if (!this.config || !this.id) {
      this.showError('Invalid edit request.');
      return;
    }

    this.item = crud.getAll(this.config.resource).find(item => item.id === this.id);
    if (!this.item) {
      this.showError('Item not found.');
      return;
    }

    $('editTitle').textContent = `Edit ${this.config.label}`;
    this.renderForm();

    $('saveEditBtn').onclick = () => this.save();
    $('returnEditBtn').onclick = () => this.goBack();
  },

  showError(message) {
    const alert = $('editPageAlert');
    if (alert) {
      alert.innerHTML = `<div class="alert alert-error">${escapeHtml(message)}</div>`;
    } else {
      alert(message);
    }
  },

  renderForm() {
    const form = $('editForm');
    form.innerHTML = '';

    this.config.fields.forEach(field => {
      const group = document.createElement('div');
      group.className = 'form-group';

      const label = document.createElement('label');
      label.textContent = field.label;
      group.appendChild(label);

      let input;
      if (field.type === 'select') {
        input = document.createElement('select');
        field.options.forEach(optionValue => {
          const option = document.createElement('option');
          option.value = optionValue;
          option.textContent = optionValue;
          input.appendChild(option);
        });
      } else {
        input = document.createElement('input');
        input.type = field.type;
      }

      input.id = `edit_${field.key}`;
      if (field.placeholder) input.placeholder = field.placeholder;
      if (field.min != null) input.min = field.min;
      if (field.max != null) input.max = field.max;
      if (field.step != null) input.step = field.step;
      if (field.accept) input.accept = field.accept;

      if (field.type !== 'file') {
        const value = this.item[field.key];
        if (field.type === 'date') {
          input.value = value || todayISO();
        } else if (value != null) {
          input.value = value;
        }
      }

      group.appendChild(input);

      if (field.type === 'file' && field.key === 'image') {
        const preview = document.createElement('div');
        preview.id = 'editImagePreview';
        preview.style.marginTop = '10px';
        if (this.item.image) {
          preview.innerHTML = `<img src="${this.item.image}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 4px; border: 1px solid #ddd;">`;
        } else {
          preview.innerHTML = '<div style="width: 200px; height: 200px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999;">No image</div>';
        }
        group.appendChild(preview);

        input.addEventListener('change', function(e) {
          const file = e.target.files[0];
          if (!file) {
            preview.innerHTML = '';
            return;
          }
          const reader = new FileReader();
          reader.onload = function(evt) {
            preview.innerHTML = `<img src="${evt.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 4px; border: 1px solid #ddd;">`;
          };
          reader.readAsDataURL(file);
        });
      }

      form.appendChild(group);
    });
  },

  goBack() {
    window.location.href = this.config.listPage;
  },

  save() {
    if (!this.config || !this.id) return;

    if (this.type === 'products') {
      return this.saveProduct();
    }
    if (this.type === 'orders') {
      return this.saveOrder();
    }
    if (this.type === 'customers') {
      return this.saveCustomer();
    }
    if (this.type === 'suppliers') {
      return this.saveSupplier();
    }
    if (this.type === 'employees') {
      return this.saveEmployee();
    }
  },

  saveProduct() {
    const name = $('edit_name').value.trim();
    const category = $('edit_category').value.trim();
    const platform = $('edit_platform').value;
    const price = $('edit_price').value;
    const stock = $('edit_stock').value;
    const rating = $('edit_rating').value;
    const imageInput = $('edit_image');
    const imageFile = imageInput ? imageInput.files[0] : null;

    if (!name || !category || !price || !stock) {
      return this.showError('Please fill all required fields.');
    }
    if (Number(price) < 0 || Number(stock) < 0) {
      return this.showError('Price and stock must be positive.');
    }

    const updates = {
      name,
      category,
      platform,
      price: Number(price),
      stock: Number(stock),
      rating: Number(rating) || 0
    };

    const finalize = (imageData, includeImage) => {
      if (includeImage) {
        updates.image = imageData;
      }
      const updated = crud.update('products', this.id, updates);
      if (!updated) {
        return this.showError('Product not found.');
      }
      ui.showAlert('Product updated');
      this.goBack();
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        finalize(e.target.result, true);
      };
      reader.onerror = () => this.showError('Error reading image file.');
      reader.readAsDataURL(imageFile);
    } else {
      finalize(null, false);
    }
  },

  saveOrder() {
    const customer = $('edit_customer').value.trim();
    const status = $('edit_status').value;
    const amount = $('edit_amount').value;
    const date = $('edit_date').value || todayISO();

    if (!customer || !amount) {
      return this.showError('Please fill all required fields.');
    }
    if (Number(amount) < 0) {
      return this.showError('Amount must be positive.');
    }

    const updated = crud.update('orders', this.id, {
      customer,
      status,
      amount: Number(amount),
      date
    });

    if (!updated) {
      return this.showError('Order not found.');
    }
    ui.showAlert('Order updated');
    this.goBack();
  },

  saveCustomer() {
    const name = $('edit_name').value.trim();
    const email = $('edit_email').value.trim();
    const phone = $('edit_phone').value.trim();
    const city = $('edit_city').value.trim();

    if (!name || !email) {
      return this.showError('Name and email are required.');
    }
    if (!email.includes('@')) {
      return this.showError('Invalid email address.');
    }

    const updated = crud.update('customers', this.id, {
      name,
      email,
      phone,
      city
    });

    if (!updated) {
      return this.showError('Customer not found.');
    }
    ui.showAlert('Customer updated');
    this.goBack();
  },

  saveSupplier() {
    const name = $('edit_name').value.trim();
    const email = $('edit_email').value.trim();
    const phone = $('edit_phone').value.trim();

    if (!name) {
      return this.showError('Supplier name is required.');
    }

    const updated = crud.update('suppliers', this.id, {
      name,
      email,
      phone
    });

    if (!updated) {
      return this.showError('Supplier not found.');
    }
    ui.showAlert('Supplier updated');
    this.goBack();
  },

  saveEmployee() {
    const name = $('edit_name').value.trim();
    const email = $('edit_email').value.trim();
    const phone = $('edit_phone').value.trim();
    const role = $('edit_role').value;

    if (!name || !email || !role) {
      return this.showError('Name, email, and role are required.');
    }
    if (!email.includes('@')) {
      return this.showError('Invalid email address.');
    }

    const updated = crud.update('employees', this.id, {
      name,
      email,
      phone,
      role
    });

    if (!updated) {
      return this.showError('Employee not found.');
    }
    ui.showAlert('Employee updated');
    this.goBack();
  }
};

window.editPage = editPage;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => editPage.init());
} else {
  editPage.init();
}
