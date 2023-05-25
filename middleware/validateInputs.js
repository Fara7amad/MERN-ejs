const validateInputs= (email, name , password, company,phone, address, bills)=>{
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
      const nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]/;
      const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const companyRegex=/^[a-zA-Z0-9\s]+$/i //allows alphanumeric characters and spaces.
      const phoneRegex=/^\+?[1-9]\d{1,14}$/  //phone numbers in international format, with an optional "+" sign followed by 1 to 14 digits.
      const addressRegex=/^[a-zA-Z0-9\s,.'-]+$/i // alphanumeric characters, spaces, commas, periods, apostrophes, and hyphens.
      const billsRegex=/^[0-9]+$/
      //signup validation
      if(email&&name&&password&&company){
      const validEmail=emailRegex.test(email);
      const validName=nameRegex.test(name);
      const validPass=passRegex.test(password);
      const validCompany=companyRegex.test(company);
    return  {
    validEmail,
    validName,
    validPass,
    validCompany
    }
    }
    else if( email&&name&&phone&&address && bills) //Add customer + update customer
    {
      const validEmail=emailRegex.test(email);
      const validName=nameRegex.test(name);
      const validPhone=phoneRegex.test(phone);
      const validAddress=addressRegex.test(address); 
      const validBills=billsRegex.test(bills); 

      return  {
        validEmail,
        validName,
        validPhone,
        validAddress,
        validBills
        }
    }
   else if(email&&password){ //login validation
    const validEmail=emailRegex.test(email);
    const validPass=passRegex.test(password);
    return  {
      validEmail,
      validPass
      }
   }
    }

    module.exports=validateInputs;