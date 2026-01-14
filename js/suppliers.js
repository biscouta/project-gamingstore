// Suppliers Module

const suppliers = {
  render() {
    const data = crud.getAll('suppliers');
    ui.renderTable('suppliersTable', data, ['ID', 'Name', 'Email', 'Phone'], [
      { label: 'Delete', class: 'danger', onclick: 'suppliers.delete' }
    ]);
  },
  
  add() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    const name = $('supplierName').value.trim();
    const email = $('supplierEmail').value.trim();
    const phone = $('supplierPhone').value.trim();
    
    if (!name) {
      return ui.showAlert(' Supplier name is required', 'error');
    }
    
    const supplier = {
      id: makeId('s'),
      name,
      email,
      phone,
      createdAt: todayISO()
    };
    
    crud.add('suppliers', supplier);
    this.render();
    dashboard.render();
    ui.showAlert(' Supplier added successfully!');
    
    $('supplierName').value = '';
    $('supplierEmail').value = '';
    $('supplierPhone').value = '';
  },
  
  delete(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm('Delete this supplier?')) return;
    
    crud.delete('suppliers', id);
    this.render();
    dashboard.render();
    ui.showAlert(' Supplier deleted');
  },
  
  clearAll() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm(' Clear ALL suppliers?')) return;
    
    crud.clear('suppliers');
    this.render();
    dashboard.render();
    ui.showAlert(' All suppliers cleared');
  }
};