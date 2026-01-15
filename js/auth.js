

const auth = {
  login(email, password) {
    if (!email || !password) {
      throw new Error('Email and password required');
    }
    if (password.length < 4) {
      throw new Error('Password too short (min 4 characters)');
    }
    
    const role = this.getRole(email);
    const session = {
      email,
      role,
      name: email.split('@')[0],
      loginTime: new Date().toISOString()
    };
    
    storage.set('session', [session]);
    return session;
  },
  
  logout() {
    storage.clear('session');
    location.reload();
  },
  
  getUser() {
    const sessions = storage.get('session');
    return sessions[0] || null;
  },
  
  isAdmin() {
    const user = this.getUser();
    return user && (user.role === 'admin' );
  },
  
  getRole(email) {
    const lower = email.toLowerCase();
    
    if (lower.includes('admin')) return 'admin';
    
   
  }
};