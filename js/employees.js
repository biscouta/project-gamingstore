// Employees Module

const employees = {
  editId: null,
  render() {
    if (!auth.isAdmin()) return;
    
    const data = crud.getAll('employees');
    ui.renderTable('employeesTable', data, ['ID', 'Name', 'Email', 'Phone', 'Role'], [
      { label: 'Edit', class: 'secondary', onclick: 'employees.startEdit' },
      { label: 'Delete', class: 'danger', onclick: 'employees.delete' }
    ]);
  },
  
  add() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    const name = $('employeeName').value.trim();
    const email = $('employeeEmail').value.trim();
    const phone = $('employeePhone').value.trim();
    const role = $('employeeRole').value;
    
    if (!name || !email || !role) {
      return ui.showAlert(' Name, email, and role are required', 'error');
    }
    
    if (!email.includes('@')) {
      return ui.showAlert(' Invalid email address', 'error');
    }
    
    const employee = {
      id: makeId('e'),
      name,
      email,
      phone,
      role,
      createdAt: todayISO()
    };
    
    crud.add('employees', employee);
    this.render();
    dashboard.render();
    ui.showAlert('✅ Employee added successfully!');
    
    $('employeeName').value = '';
    $('employeeEmail').value = '';
    $('employeePhone').value = '';
  },

  startEdit(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    window.location.href = `edit.html?type=employees&id=${encodeURIComponent(id)}`;
  },

  saveEdit() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    if (!this.editId) return;

    const name = $('editEmployeeName').value.trim();
    const email = $('editEmployeeEmail').value.trim();
    const phone = $('editEmployeePhone').value.trim();
    const role = $('editEmployeeRole').value;

    if (!name || !email || !role) {
      return ui.showAlert(' Name, email, and role are required', 'error');
    }

    if (!email.includes('@')) {
      return ui.showAlert(' Invalid email address', 'error');
    }

    const updated = crud.update('employees', this.editId, {
      name,
      email,
      phone,
      role
    });

    if (!updated) {
      return ui.showAlert(' Employee not found', 'error');
    }

    this.render();
    dashboard.render();
    ui.showAlert(' Employee updated');
    this.cancelEdit();
  },

  cancelEdit() {
    this.editId = null;
    $('editEmployeeName').value = '';
    $('editEmployeeEmail').value = '';
    $('editEmployeePhone').value = '';
    const section = $('employeeEditSection');
    if (section) section.style.display = 'none';
  },
  
  delete(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm('Delete this employee?')) return;
    
    crud.delete('employees', id);
    this.render();
    dashboard.render();
    ui.showAlert(' Employee deleted');
  },
  
  clearAll() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm('Clear ALL employees?')) return;
    
    crud.clear('employees');
    this.render();
    dashboard.render();
    ui.showAlert(' All employees cleared');
  }
};

window.employees = employees;
