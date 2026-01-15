// Orders Module

const orders = {
  editId: null,
  render() {
    const data = crud.getAll('orders');
    ui.renderTable('ordersTable', data, ['ID', 'Customer', 'Status', 'Date', 'Amount'], [
      { label: 'Edit', class: 'secondary', onclick: 'orders.startEdit' },
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

  startEdit(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    window.location.href = `edit.html?type=orders&id=${encodeURIComponent(id)}`;
  },

  saveEdit() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    if (!this.editId) return;

    const customer = $('editOrderCustomer').value.trim();
    const status = $('editOrderStatus').value;
    const amount = $('editOrderAmount').value;
    const date = $('editOrderDate').value || todayISO();

    if (!customer || !amount) {
      return ui.showAlert(' Please fill all required fields', 'error');
    }

    if (Number(amount) < 0) {
      return ui.showAlert(' Amount must be positive', 'error');
    }

    const updated = crud.update('orders', this.editId, {
      customer,
      status,
      amount: Number(amount),
      date
    });

    if (!updated) {
      return ui.showAlert(' Order not found', 'error');
    }

    this.render();
    dashboard.render();
    ui.showAlert(' Order updated');
    this.cancelEdit();
  },

  cancelEdit() {
    this.editId = null;
    $('editOrderCustomer').value = '';
    $('editOrderAmount').value = '';
    $('editOrderDate').value = todayISO();
    const section = $('orderEditSection');
    if (section) section.style.display = 'none';
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

window.orders = orders;
