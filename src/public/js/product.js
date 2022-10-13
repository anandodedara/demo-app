const formAddProduct = $('#form-add-product');
const editProductModal = $('#editProductModal');
const formEditProduct = $('#form-edit-product');
const formDeleteProduct = $('#form-delete-product');
const deleteProductModal = $('#deleteProductModal');

const addProduct = (e) => {
  e.preventDefault();
  const dataArray = $(formAddProduct).serializeArray();
  const data = {};
  dataArray.map((item) => {
    data[item.name] = item.value;
  });
  $.ajax({
    url: 'products',
    method: 'post',
    data: data,
    success: (response, textStatus, xhr) => {
      window.location.reload();
    },
    error: (response, textStatus, xhr) => {
      const modalBody = $('.modal-body');
      const html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${response.responseJSON.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalBody.prepend(html);
    },
  });
};

const editProduct = (e) => {
  e.preventDefault();
  const dataArray = $(formEditProduct).serializeArray();
  const data = {};
  let id;
  dataArray.map((item) => {
    if (item.name === 'id') {
      id = item.value;
      return;
    }
    data[item.name] = item.value;
  });
  $.ajax({
    url: 'products/' + id,
    method: 'patch',
    data: data,
    success: (response, textStatus, xhr) => {
      location.reload();
    },
    error: (response, textStatus, xhr) => {
      const modalBody = $('.modal-body');
      const html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${response.responseJSON.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalBody.prepend(html);
    },
  });
};

const deleteProduct = (e) => {
  e.preventDefault();
  const dataArray = $(formDeleteProduct).serializeArray();
  const index = dataArray.findIndex((item) => item.name === 'id');
  console.log(dataArray);
  const id = dataArray[index]['value'];
  console.log(id);
  $.ajax({
    url: 'products/' + id,
    method: 'delete',
    success: (response, textStatus, xhr) => {
      location.reload();
    },
    error: (response, textStatus, xhr) => {
      const modalBody = $('.modal-body');
      const html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${response.responseJSON.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalBody.prepend(html);
    },
  });
};

formAddProduct.on('submit', addProduct);
formEditProduct.on('submit', editProduct);
formDeleteProduct.on('submit', deleteProduct);

editProductModal.on('shown.bs.modal', (event) => {
  const id = event.relatedTarget.getAttribute('data-bs-id');
  $.ajax({
    url: 'products/' + id,
    success: (response, textStatus, xhr) => {
      const name = response.name;
      const price = response.price;
      const idInput = editProductModal.find('#id');
      const nameInput = editProductModal.find('#name');
      const priceInput = editProductModal.find('#price');
      nameInput.attr('value', name);
      priceInput.attr('value', price);
      idInput.attr('value', id);
    },
    error: (response, textStatus, xhr) => {
      const modalBody = $('.modal-body');
      const html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${response.responseJSON.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      modalBody.prepend(html);
    },
  });
});

deleteProductModal.on('show.bs.modal', (event) => {
  const id = event.relatedTarget.getAttribute('data-bs-id');
  const idInput = deleteProductModal.find('#id');
  idInput.val(id);
});
