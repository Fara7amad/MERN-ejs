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
5. Users cannot modify other user's customers.
6. Regex Explanation:
   ```js
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/; //basic email pattern
      const nameRegex = /^[a-zA-Z ]*$/; // contains only alphabetical characters, allowing multiple words separated by spaces
      const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // at least 1 (digit, lowercase, uppercase), minimum length of 8 characters 
      const companyRegex=/^[a-zA-Z0-9\s]+$/i //allows alphanumeric characters and spaces.
      const phoneRegex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ //phone number with "-" and/or country code 
      const addressRegex=/^[a-zA-Z0-9\s,.'-]+$/i // alphanumeric characters, spaces, commas, periods, apostrophes, and hyphens.
      const billsRegex=/^[0-9]+$/ //Only Numbers
   ```
---
<h4>Improvements needed: </h4>

1. Changing customers' schema to handle the fact that each customer may have more than 1 bill.
2. Server-Side pagination needed 
3. Adding customer moadl needs improvements in displaying the error source and keeping the user's input values displayed. 
---
<h4> Test data to login </h4>

john@super.com
Admin@1234

jane@super.com
Admin@12344

doe@tech.com
Admin@12345
 
