// Employees Module

const employees = {
  render() {
    if (!auth.isAdmin()) return;
    
    const data = crud.getAll('employees');
    ui.renderTable('employeesTable', data, ['ID', 'Name', 'Email', 'Phone', 'Role'], [
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