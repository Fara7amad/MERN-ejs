$(document).ready(function() {
  $('#dataTable').DataTable({
    paging: true, // Enable pagination
    pagingType: 'full_numbers', // Set the pagination style
    lengthMenu: [5, 10, 15, 20]
  });
});

function toggleAddCustomerForm() {
const addCustomerForm = document.getElementById('addCustomerForm');
if (addCustomerForm.style.display === 'none') {
addCustomerForm.style.display = 'block';
} else {
addCustomerForm.style.display = 'none';
}
}

function addCustomer() {
const newName = document.getElementById('newName').value;
const newEmail = document.getElementById('newEmail').value;
const newPhone = document.getElementById('newPhone').value;
const newAddress = document.getElementById('newAddress').value;

const newCustomer = {
name: newName,
email: newEmail,
phone: newPhone,
address: newAddress,
};

$.ajax({
url: '/customers',
type: 'POST',
data: newCustomer,
success: function(response) {
  console.log(response);
  location.reload();
  // Update the table as desired
},
error: function(error) {
  console.error(error);
  alert('Error adding customer');
}
});

// Reset the input fields
document.getElementById('newName').value = '';
document.getElementById('newEmail').value = '';
document.getElementById('newPhone').value = '';
document.getElementById('newAddress').value = '';

const addCustomerForm = document.getElementById('addCustomerForm');
addCustomerForm.style.display = 'none';

}

function confirmDelete(customerId, customerName, customerEmail) {
// Set customer info in the confirmation modal
const modalElement = document.getElementById('deleteModal');
const modalInstance = new bootstrap.Modal(modalElement);
                modalInstance.show();
document.getElementById('deleteCustomerName').textContent = customerName;
document.getElementById('deleteCustomerEmail').textContent = customerEmail;

// Store the customer ID in a global variable to access it in the deleteConfirmed function
window.deleteCustomerId = customerId;
}

function deleteConfirmed() {
const customerId = window.deleteCustomerId;

// Send an AJAX request to delete the customer
fetch(`/customers/${customerId}`, {
  method: 'DELETE',
})
  .then(response => response.json())
  .then(data => {
    // Check the response data for success or failure
    if (data.success) {
      // Refresh the page to update the customer list
      location.reload();
    } else {
        console.error('Failed to update course:', error);
    }
  })
  .catch(error => {
    console.error('Error deleting customer:', error);
  });
}


// Function to toggle edit mode
function toggleEdit(rowId) {
const row = document.getElementById('row' + rowId);
const editButton = row.querySelector('.edit-button');
const saveButton = row.querySelector('.save-button');

if (row.classList.contains('edit-mode')) {
// Switch back to view mode
row.classList.remove('edit-mode');

if (editButton) {
  editButton.style.display = 'inline-block';
}

if (saveButton) {
  saveButton.style.display = 'none';
}

// Hide the input fields and show the span elements
const inputFields = row.querySelectorAll('input[type="text"]');
const spanElements = row.querySelectorAll('span');

inputFields.forEach(input => {
  input.style.display = 'none';
});

spanElements.forEach(span => {
  span.style.display = 'inline-block';
});
} else {
// Switch to edit mode
row.classList.add('edit-mode');

if (editButton) {
  editButton.style.display = 'none';
}

if (saveButton) {
  saveButton.style.display = 'inline-block';
}

// Hide the span elements and show the input fields
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

const nameSpan = row.querySelector('#name' + rowId);
const emailSpan = row.querySelector('#email' + rowId);
const phoneSpan = row.querySelector('#phone' + rowId);
const addressSpan = row.querySelector('#address' + rowId);

const name = nameInput.value;
const email = emailInput.value;
const phone = phoneInput.value;
const address = addressInput.value;

// Check if there are any changes
if (name !== nameSpan.textContent ||
  email !== emailSpan.textContent ||
  phone !== phoneSpan.textContent ||
  address !== addressSpan.textContent) {


// Send the updated customer information to the server
const requestData = {
  _id: id,
  name:name,
  email:email,
  phone:phone,
  address:address
};

// Send an AJAX request to update the customer
fetch('/update-customer', {
method: 'PUT',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(requestData)
})
.then(response => response.json())
.then(data => {
// Check the response data for success or failure
if (data.success) {
  // Update the displayed customer information
  nameSpan.textContent = name;
  emailSpan.textContent = email;
  phoneSpan.textContent = phone;
  addressSpan.textContent = address;
  location.reload();

  // Switch back to view mode
  row.classList.remove('edit-mode');
  
  const editButton = row.querySelector('.edit-button');
  const saveButton = row.querySelector('.save-button');

  if (editButton) {
    editButton.style.display = 'inline-block';
  }

  if (saveButton) {
    saveButton.style.display = 'none';
  }

  // Hide the input fields and show the span elements
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
  // Handle failure case
}
})
.catch(error => {
console.error('Error updating customer:', error);
// Handle error case
});


} else {
// No changes, switch back to view mode without sending a request
row.classList.remove('edit-mode');

const editButton = row.querySelector('.edit-button');
const saveButton = row.querySelector('.save-button');

if (editButton) {
  editButton.style.display = 'inline-block';
}

if (saveButton) {
  saveButton.style.display = 'none';
}

// Hide the input fields and show the span elements
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



