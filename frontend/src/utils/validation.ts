import toast from "react-hot-toast";

export const validateEmail = (email: string, errors: any = {}) => {
  if (!email) {
    errors.email = toast.error("E-mail is required");
  } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.email = toast.error("Invalid E-mail format");
  }

  return errors;
};

export const validatePassword = (
  password: string,
  repeatPassword: string | null = null,
  errors: any = {}
) => {
  if (!password) {
    errors.password = toast.error("Password is required");
  } else if (password.length <= 8) {
    errors.password = toast.error("Password must be longer than 8 characters");
  } else if (password.includes(" ")) {
    errors.password = toast.error("Password must not include whitespace");
  } else if (repeatPassword !== null) {
    if (!repeatPassword) {
      errors.password = toast.error("Please repeat the new password");
    } else if (repeatPassword !== password) {
      errors.password = toast.error("Passwords do not match");
    }
  }
  return errors;
};

export const validateUsername = (username: string, errors: any = {}) => {
  if (!username) {
    errors.username = toast.error("Username is required");
  } else if (username.length < 4) {
    errors.username = toast.error("Username must be longer than 3 characters");
  } else if (!/^[a-zA-Z0-9]{4,}$/.test(username)) {
    errors.username = toast.error(
      "Username must not contain any special characters"
    );
  }
  return errors;
};

export const validatePhoneNumber = (phoneNumber: string, errors: any = {}) => {
  if (phoneNumber) {
    if (
      !/^(\+\d{1,3}\s?)?(\d{3,4}|\(\d{3,4}\))[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/.test(
        phoneNumber
      )
    )
      errors.phoneNumber = toast.error("Invalid phone number format");
  }

  return errors;
};
