// Customers Module

const customers = {
  editId: null,
  render() {
    const data = crud.getAll('customers');
    ui.renderTable('customersTable', data, ['ID', 'Name', 'Email', 'Phone', 'City'], [
      { label: 'Edit', class: 'secondary', onclick: 'customers.startEdit' },
      { label: 'Delete', class: 'danger', onclick: 'customers.delete' }
    ]);
  },
  
  add() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    const name = $('customerName').value.trim();
    const email = $('customerEmail').value.trim();
    const phone = $('customerPhone').value.trim();
    const city = $('customerCity').value.trim();
    
    if (!name || !email) {
      return ui.showAlert(' Name and email are required', 'error');
    }
    
    if (!email.includes('@')) {
      return ui.showAlert(' Invalid email address', 'error');
    }
    
    const customer = {
      id: makeId('c'),
      name,
      email,
      phone,
      city,
      createdAt: todayISO()
    };
    
    crud.add('customers', customer);
    this.render();
    dashboard.render();
    ui.showAlert(' Customer added successfully!');
    
    $('customerName').value = '';
    $('customerEmail').value = '';
    $('customerPhone').value = '';
    $('customerCity').value = '';
  },

  startEdit(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    window.location.href = `edit.html?type=customers&id=${encodeURIComponent(id)}`;
  },

  saveEdit() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    if (!this.editId) return;

    const name = $('editCustomerName').value.trim();
    const email = $('editCustomerEmail').value.trim();
    const phone = $('editCustomerPhone').value.trim();
    const city = $('editCustomerCity').value.trim();

    if (!name || !email) {
      return ui.showAlert(' Name and email are required', 'error');
    }
    if (!email.includes('@')) {
      return ui.showAlert(' Invalid email address', 'error');
    }

    const updated = crud.update('customers', this.editId, {
      name,
      email,
      phone,
      city
    });

    if (!updated) {
      return ui.showAlert(' Customer not found', 'error');
    }

    this.render();
    dashboard.render();
    ui.showAlert(' Customer updated');
    this.cancelEdit();
  },

  cancelEdit() {
    this.editId = null;
    $('editCustomerName').value = '';
    $('editCustomerEmail').value = '';
    $('editCustomerPhone').value = '';
    $('editCustomerCity').value = '';
    const section = $('customerEditSection');
    if (section) section.style.display = 'none';
  },
  
  delete(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm('Delete this customer?')) return;
    
    crud.delete('customers', id);
    this.render();
    dashboard.render();
    ui.showAlert(' Customer deleted');
  },
  
  clearAll() {
    if (!auth.isAdmin()) {
      return ui.showAlert('❌ Admin only', 'error');
    }
    
    if (!confirm(' Clear ALL customers?')) return;
    
    crud.clear('customers');
    this.render();
    dashboard.render();
    ui.showAlert(' All customers cleared');
  }
};

window.customers = customers;
