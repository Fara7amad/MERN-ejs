
/**
 * Function to validate all system inputs
 * @param {String} email 
 * @param {String} name 
 * @param {String} password 
 * @param {String} company 
 * @param {String} phone 
 * @param {String} address 
 * @param {Number} bills 
 * @returns boolean results
 */

const validateInputs= (email, name , password,phone, address, bills)=>{
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
      const nameRegex = /^[a-zA-Z ]*$/;
      const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const phoneRegex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;   
      const addressRegex=/^[a-zA-Z0-9\s,.'-]+$/;
      const billsRegex=/^[0-9]+$/
      //signup validation
      if(email&&name&&password){
      const validEmail=emailRegex.test(email);
      const validName=nameRegex.test(name);
      const validPass=passRegex.test(password);
    return  {
    validEmail,
    validName,
    validPass,
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