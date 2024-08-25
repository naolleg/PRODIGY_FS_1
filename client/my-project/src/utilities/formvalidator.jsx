const FormValidator = {
    signup: (form) => {
      if (form.firstName === "") {
        return { success: false, error: { firstName: "First name is required" } };
      } else if (!/^[a-zA-Z]{3,10}$/.test(form.firstName)) {
        return {
          success: false,
          error: { firstName: "First name should consist of alphabetic characters only" },
        };
      }
  
      if (form.middleName === "") {
        return { success: false, error: { middleName: "Middle name is required" } };
      } else if (!/^[a-zA-Z]{3,10}$/.test(form.middleName)) {
        return {
          success: false,
          error: { middleName: "Middle name should consist of alphabetic characters only" },
        };
      }
  
      if (form.lastName === "") {
        return { success: false, error: { lastName: "Last name is required" } };
      } else if (!/^[a-zA-Z]{3,10}$/.test(form.lastName)) {
        return {
          success: false,
          error: { lastName: "Last name should consist of alphabetic characters only" },
        };
      }
  
      if (form.email === "") {
        return { success: false, error: { email: "Email is required" } };
      } else if (!form.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        return { success: false, error: { email: "Invalid email" } };
      }
  
      if (form.password === "") {
        return { success: false, error: { password: "Password is required" } };
      } else if (form.password.length < 8) {
        return { success: false, error: { password: "Password must be at least 8 characters long" } };
      }
  
      if (form.confirmPassword === "") {
        return { success: false, error: { confirmPassword: "Confirm password is required" } };
      } else if (form.confirmPassword !== form.password) {
        return { success: false, error: { confirmPassword: "Passwords do not match" } };
      }
  
      return { success: true, error: {} };
    },
    login: (form) => {
        if (form.email === "") {
          return { success: false, error: { email: "Email is required" } };
        } else if (!form.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
          return { success: false, error: { email: "Invalid email" } };
        }
    
        if (form.password === "") {
          return { success: false, error: { password: "Password is required" } };
        } else if (form.password.length < 8) {
          return { success: false, error: { password: "Password must be at least 8 characters long" } };
        }
    
        return { success: true, error: {} };
      },
  };
  
  export default FormValidator;