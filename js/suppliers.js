// Suppliers Module

const suppliers = {
  editId: null,
  render() {
    const data = crud.getAll('suppliers');
    ui.renderTable('suppliersTable', data, ['ID', 'Name', 'Email', 'Phone'], [
      { label: 'Edit', class: 'secondary', onclick: 'suppliers.startEdit' },
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

  startEdit(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    window.location.href = `edit.html?type=suppliers&id=${encodeURIComponent(id)}`;
  },

  saveEdit() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    if (!this.editId) return;

    const name = $('editSupplierName').value.trim();
    const email = $('editSupplierEmail').value.trim();
    const phone = $('editSupplierPhone').value.trim();

    if (!name) {
      return ui.showAlert(' Supplier name is required', 'error');
    }

    const updated = crud.update('suppliers', this.editId, {
      name,
      email,
      phone
    });

    if (!updated) {
      return ui.showAlert(' Supplier not found', 'error');
    }

    this.render();
    dashboard.render();
    ui.showAlert(' Supplier updated');
    this.cancelEdit();
  },

  cancelEdit() {
    this.editId = null;
    $('editSupplierName').value = '';
    $('editSupplierEmail').value = '';
    $('editSupplierPhone').value = '';
    const section = $('supplierEditSection');
    if (section) section.style.display = 'none';
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

window.suppliers = suppliers;
