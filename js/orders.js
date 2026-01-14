// Orders Module

const orders = {
  render() {
    const data = crud.getAll('orders');
    ui.renderTable('ordersTable', data, ['ID', 'Customer', 'Status', 'Date', 'Amount'], [
      { label: 'Delete', class: 'danger', onclick: 'orders.delete' }
    ]);
  },
  
  add() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    const customer = $('orderCustomer').value.trim();
    const status = $('orderStatus').value;
    const amount = $('orderAmount').value;
    const date = $('orderDate').value || todayISO();
    
    if (!customer || !amount) {
      return ui.showAlert(' Please fill all required fields', 'error');
    }
    
    if (Number(amount) < 0) {
      return ui.showAlert(' Amount must be positive', 'error');
    }
    
    const order = {
      id: makeId('o'),
      customer,
      status,
      amount: Number(amount),
      date,
      createdAt: todayISO()
    };
    
    crud.add('orders', order);
    this.render();
    dashboard.render();
    ui.showAlert(' Order added successfully!');
    
    $('orderCustomer').value = '';
    $('orderAmount').value = '';
  },
  
  delete(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm('Delete this order?')) return;
    
    crud.delete('orders', id);
    this.render();
    dashboard.render();
    ui.showAlert(' Order deleted');
  },
  
  clearAll() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm(' Clear ALL orders?')) return;
    
    crud.clear('orders');
    this.render();
    dashboard.render();
    ui.showAlert(' All orders cleared');
  }
};