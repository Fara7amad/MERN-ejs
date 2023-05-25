# MERN-ejs
This Repo is a tiny practice to MVC pattern using MERN stack -Except using ejs instead of React
---
It consists of 3 views:
1. Login page:
   - The first view to see.
   - It validates inputs.
   - Shows error messages.
2. Signup page:
   - It validates inputs.
   - Shows error messages.
3. Customers page:
   - Nav: includes the name of the logged user and logout option.
   - Table:
     - DataTables Plugin
     - Client-Side Pagination
     - LenghtMenu option
     - Search, Sorting
     - Add, Edit, and Delete customers.
 ---
 <h2> Assumptions: </h2>
 
1. Tasks:
    - User can add, edit, and delete customers
    - Each user can only see the customers related to the same company that the user works in.
2. Customer Fields:
    - Name
    - Email
    - Address
    - Phone
    - Bills (It has the bill amount and the related user)
3. Users can:
    - Self-register (fields: name, email, password, company)
    - Login (fields: email, password)
4. All routes are protected except the login and registration, but if the user is logged in already he must logout to return to the login page.
5. Users cannot modify other user's customers
---
<h2> Improvements needed: <h2>
  
1. Styling the "Add customer" functionality.  
2. Styling fonts, buttons.
3. Changing customers' schema to handle the fact that each customer may have more than 1 bill.
 
