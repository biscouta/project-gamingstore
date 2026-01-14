// UI Manager

const ui = {
  showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    $(pageName).classList.add('active');
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
  },
  
  showApp() {
    $('loginPage').style.display = 'none';
    $('appContent').style.display = 'block';
    this.updateUserInfo();
    this.setupRoleUI();
  },
  
  updateUserInfo() {
    const user = auth.getUser();
    if (user) {
      $('userInfo').style.display = 'flex';
      $('userInfo').innerHTML = `
        <span>👤 ${escapeHtml(user.email)} <span class="badge">${escapeHtml(user.role)}</span></span>
        <button onclick="auth.logout()" style="width: auto; padding: 8px 20px;">Logout</button>
      `;
    }
  },
  
  setupRoleUI() {
    const isAdmin = auth.isAdmin();
    document.querySelectorAll('.admin-only').forEach(el => {
      el.style.display = isAdmin ? 'block' : 'none';
    });
    
    if (!isAdmin) {
      const employeesTab = document.querySelector('[data-page="employees"]');
      if (employeesTab) employeesTab.style.display = 'none';
    }
  },
  
  showAlert(message, type = 'success') {
    alert(message);
  },
  
  renderTable(containerId, data, columns, actions) {
    const container = $(containerId);
    
    if (data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <h3>No data yet</h3>
          <p>Add your first item using the form above</p>
        </div>
      `;
      return;
    }
    
    let html = '<table><thead><tr>';
    columns.forEach(col => html += `<th>${col}</th>`);
    html += '<th>Actions</th></tr></thead><tbody>';
    
    data.forEach(item => {
      html += '<tr>';
      columns.forEach(col => {
        const key = col.toLowerCase().replace(' ', '');
        if (key === 'image' && item.image) {
          html += `<td><img src="${item.image}" alt="Product" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;"></td>`;
        } else if (key === 'image' && !item.image) {
          html += `<td><div style="width: 100px; height: 100px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999;">No image</div></td>`;
        } else {
          html += `<td>${escapeHtml(item[key] || item[col.toLowerCase()] || '')}</td>`;
        }
      });
      
      html += '<td>';
      actions.forEach(action => {
        html += `<button class="${action.class || ''}" onclick="${action.onclick}('${item.id}')">${action.label}</button> `;
      });
      html += '</td></tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
  }
};