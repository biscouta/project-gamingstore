

const products = {
  editId: null,
  render() {
    const data = crud.getAll('products');
    ui.renderTable('productsTable', data, ['ID', 'Image', 'Name', 'Category', 'Platform', 'Price', 'Stock', 'Rating'], [
      { label: 'Edit', class: 'secondary', onclick: 'products.startEdit' },
      { label: 'Delete', class: 'danger', onclick: 'products.delete' }
    ]);
  },
  
  add() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    const name = $('productName').value.trim();
    const category = $('productCategory').value.trim();
    const platform = $('productPlatform').value;
    const price = $('productPrice').value;
    const stock = $('productStock').value;
    const rating = $('productRating').value;
    const imageInput = $('productImage');
    const imageFile = imageInput ? imageInput.files[0] : null;
    
    // Debug: show what values we're getting
    console.log('Form values:', { name, category, platform, price, stock, rating });
    
    if (!name || !category || !price || !stock) {
      return ui.showAlert('Please fill all required fields', 'error');
    }
    
    if (Number(price) < 0 || Number(stock) < 0) {
      return ui.showAlert('Price and stock must be positive', 'error');
    }
    
    // Handle image upload
    const handleImageUpload = (imageData) => {
      const product = {
        id: makeId('p'),
        name,
        category,
        platform,
        price: Number(price),
        stock: Number(stock),
        rating: Number(rating) || 0,
        image: imageData,
        createdAt: todayISO()
      };
      
      crud.add('products', product);
      this.render();
      ui.showAlert('Product added successfully!');
      
      // Clear form
      $('productName').value = '';
      $('productCategory').value = '';
      $('productPrice').value = '';
      $('productStock').value = '';
      $('productRating').value = '';
      if (imageInput) {
        imageInput.value = '';
      }
      if ($('imagePreview')) {
        $('imagePreview').innerHTML = '';
      }
    };
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        handleImageUpload(e.target.result);
      };
      reader.onerror = function() {
        ui.showAlert('Error reading image file', 'error');
      };
      reader.readAsDataURL(imageFile);
    } else {
      handleImageUpload(null);
    }
  },

  startEdit(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    window.location.href = `edit.html?type=products&id=${encodeURIComponent(id)}`;
  },

  saveEdit() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    if (!this.editId) return;

    const name = $('editProductName').value.trim();
    const category = $('editProductCategory').value.trim();
    const platform = $('editProductPlatform').value;
    const price = $('editProductPrice').value;
    const stock = $('editProductStock').value;
    const rating = $('editProductRating').value;
    const imageInput = $('editProductImage');
    const imageFile = imageInput ? imageInput.files[0] : null;

    if (!name || !category || !price || !stock) {
      return ui.showAlert('Please fill all required fields', 'error');
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      return ui.showAlert('Price and stock must be positive', 'error');
    }

    const updates = {
      name,
      category,
      platform,
      price: Number(price),
      stock: Number(stock),
      rating: Number(rating) || 0
    };

    const finalizeUpdate = (imageData, includeImage) => {
      if (includeImage) {
        updates.image = imageData;
      }
      const updated = crud.update('products', this.editId, updates);
      if (!updated) {
        return ui.showAlert(' Product not found', 'error');
      }
      this.render();
      ui.showAlert(' Product updated');
      this.cancelEdit();
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(e) {
        finalizeUpdate(e.target.result, true);
      };
      reader.onerror = function() {
        ui.showAlert('Error reading image file', 'error');
      };
      reader.readAsDataURL(imageFile);
    } else {
      finalizeUpdate(null, false);
    }
  },

  cancelEdit() {
    this.editId = null;
    $('editProductName').value = '';
    $('editProductCategory').value = '';
    $('editProductPrice').value = '';
    $('editProductStock').value = '';
    $('editProductRating').value = '';
    if ($('editProductImage')) {
      $('editProductImage').value = '';
    }
    const preview = $('editImagePreview');
    if (preview) preview.innerHTML = '';
    const section = $('productEditSection');
    if (section) section.style.display = 'none';
  },
  
  delete(id) {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm('Delete this product?')) return;
    
    crud.delete('products', id);
    this.render();
    ui.showAlert(' Product deleted');
  },
  
  clearAll() {
    if (!auth.isAdmin()) {
      return ui.showAlert(' Admin only', 'error');
    }
    
    if (!confirm(' Clear ALL products? This cannot be undone!')) return;
    
    crud.clear('products');
    this.render();
    ui.showAlert(' All products cleared');
  }
};

window.products = products;
