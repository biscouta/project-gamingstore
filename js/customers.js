// Customers Module

const customers = {
  render() {
    const data = crud.getAll('customers');
    ui.renderTable('customersTable', data, ['ID', 'Name', 'Email', 'Phone', 'City'], [
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