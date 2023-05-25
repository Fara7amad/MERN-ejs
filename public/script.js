$(document).ready(function() {
  $('#dataTable').DataTable({
    paging: true, // Enable pagination
    pagingType: 'full_numbers', // Set the pagination style
    lengthMenu: [5, 10, 15, 20]
  });
});

function toggleAddCustomerForm() {
  const modalInstance = new bootstrap.Modal(document.getElementById('addModal'));
modalInstance.show();
}

function addCustomer() {
const newName = document.getElementById('newName').value;
const newEmail = document.getElementById('newEmail').value;
const newPhone = document.getElementById('newPhone').value;
const newAddress = document.getElementById('newAddress').value;
const newBills = document.getElementById('newBills').value;

const newCustomer = {
name: newName,
email: newEmail,
phone: newPhone,
address: newAddress,
bills: newBills
};

$.ajax({
url: '/customers',
type: 'POST',
data: newCustomer,
success: function() {
  location.reload();
},
error: function() {
  alert('Error adding customer');
}
});


document.getElementById('newName').value = '';
document.getElementById('newEmail').value = '';
document.getElementById('newPhone').value = '';
document.getElementById('newAddress').value = '';
document.getElementById('newBills').value = '';


const modalInstance = new bootstrap.Modal(document.getElementById('addModal'));
modalInstance.hide();

}

function confirmDelete(customerId, customerName, customerEmail) {
const modalElement = document.getElementById('deleteModal');
const modalInstance = new bootstrap.Modal(modalElement);
                modalInstance.show();
document.getElementById('deleteCustomerName').textContent = customerName;
document.getElementById('deleteCustomerEmail').textContent = customerEmail;

window.deleteCustomerId = customerId;
}

function deleteConfirmed() {
const customerId = window.deleteCustomerId;


fetch(`/customers/${customerId}`, {
  method: 'DELETE',
})
  .then(response => response.json())
  .then(data => {
    
    if (data.success) {
  
      location.reload();
    } else {
        console.error('Failed to update course:', error);
    }
  })
  .catch(error => {
    console.error('Error deleting customer:', error);
  });
}


function toggleEdit(rowId) {
const row = document.getElementById('row' + rowId);
const editButton = row.querySelector('.edit-button');
const saveButton = row.querySelector('.save-button');

if (row.classList.contains('edit-mode')) {

row.classList.remove('edit-mode');

if (editButton) {
  editButton.style.display = 'inline-block';
}

if (saveButton) {
  saveButton.style.display = 'none';
}


const inputFields = row.querySelectorAll('input[type="text"]');
const spanElements = row.querySelectorAll('span');

inputFields.forEach(input => {
  input.style.display = 'none';
});

spanElements.forEach(span => {
  span.style.display = 'inline-block';
});
} else {

row.classList.add('edit-mode');

if (editButton) {
  editButton.style.display = 'none';
}

if (saveButton) {
  saveButton.style.display = 'inline-block';
}


const inputFields = row.querySelectorAll('input[type="text"]');
const spanElements = row.querySelectorAll('span');

inputFields.forEach(input => {
  input.style.display = 'inline-block';
});

spanElements.forEach(span => {
  span.style.display = 'none';
});
}
}

function saveChanges(rowId, id) {

const row = document.getElementById('row' + rowId);
const nameInput = row.querySelector('#editName' + rowId);
const emailInput = row.querySelector('#editEmail' + rowId);
const phoneInput = row.querySelector('#editPhone' + rowId);
const addressInput = row.querySelector('#editAddress' + rowId);
const billsInput = row.querySelector('#editBills' + rowId);


const nameSpan = row.querySelector('#name' + rowId);
const emailSpan = row.querySelector('#email' + rowId);
const phoneSpan = row.querySelector('#phone' + rowId);
const addressSpan = row.querySelector('#address' + rowId);
const billsSpan = row.querySelector('#bills' + rowId);


const name = nameInput.value;
const email = emailInput.value;
const phone = phoneInput.value;
const address = addressInput.value;
const bills = billsInput.value;


if (name !== nameSpan.textContent ||
  email !== emailSpan.textContent ||
  phone !== phoneSpan.textContent ||
  address !== addressSpan.textContent
  || bills !== billsSpan.textContent) {



const requestData = {
  _id: id,
  name:name,
  email:email,
  phone:phone,
  address:address,
  bills:bills
};


fetch('/update-customer', {
method: 'PUT',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(requestData)
})
.then(response => response.json())
.then(data => {

if (data.success) {

  nameSpan.textContent = name;
  emailSpan.textContent = email;
  phoneSpan.textContent = phone;
  addressSpan.textContent = address;
  billsSpan.textContent = bills;
  location.reload();

  row.classList.remove('edit-mode');
  
  const editButton = row.querySelector('.edit-button');
  const saveButton = row.querySelector('.save-button');

  if (editButton) {
    editButton.style.display = 'inline-block';
  }

  if (saveButton) {
    saveButton.style.display = 'none';
  }


  const inputFields = row.querySelectorAll('input[type="text"]');
  const spanElements = row.querySelectorAll('span');

  inputFields.forEach(input => {
    input.style.display = 'none';
  });

  spanElements.forEach(span => {
    span.style.display = 'inline-block';
  });
} else {
  console.error('Failed to update customer');

}
})
.catch(error => {
console.error('Error updating customer:', error);

});


} else {

row.classList.remove('edit-mode');

const editButton = row.querySelector('.edit-button');
const saveButton = row.querySelector('.save-button');

if (editButton) {
  editButton.style.display = 'inline-block';
}

if (saveButton) {
  saveButton.style.display = 'none';
}

const inputFields = row.querySelectorAll('input[type="text"]');
const spanElements = row.querySelectorAll('span');

inputFields.forEach(input => {
  input.style.display = 'none';
});

spanElements.forEach(span => {
  span.style.display = 'inline-block';
});
}
}



