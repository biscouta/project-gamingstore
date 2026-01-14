// Utility Functions

const $ = (id) => document.getElementById(id);

const escapeHtml = (str) => {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
};

/*const makeId = (prefix) => {
  return `${prefix}_${Date.now()}`;
};*/

const makeId = (prefix) => {
  const now = new Date();
  const time = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  return `${prefix}_${time}`;
};


const todayISO = () => {
  return new Date().toISOString().slice(0, 10);
};