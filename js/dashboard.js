// Dashboard Module

const dashboard = {
  render() {
    const productsCount = crud.getAll('products').length;
    const ordersCount = crud.getAll('orders').length;
    const customersCount = crud.getAll('customers').length;
    const suppliersCount = crud.getAll('suppliers').length;
    const employeesCount = crud.getAll('employees').length;
    
    const orders = crud.getAll('orders');
    const revenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    
    const statsEl = $('stats');
    if (!statsEl) return;
    
    statsEl.innerHTML = `
      <div class="stat-card">
        <div class="stat-label">Products</div>
        <div class="stat-value">${productsCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Orders</div>
        <div class="stat-value">${ordersCount}</div>
        <div class="stat-label">Revenue: ${revenue.toFixed(2)} MAD</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Customers</div>
        <div class="stat-value">${customersCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Suppliers</div>
        <div class="stat-value">${suppliersCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Employees</div>
        <div class="stat-value">${employeesCount}</div>
      </div>
    `;
  }
};
