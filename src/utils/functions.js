import { APP_USER } from "./constants";

// Local storage operations
export const useLocalStorage = {
  set: (key, data) => {
    let stringifiedData = JSON.stringify(data);
    localStorage.setItem(key, stringifiedData);
  },

  get: (key) => {
    const data = JSON.parse(localStorage.getItem(key));

    if (!data) {
      return null;
    }
    return data;
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export const getUserDetails = () => {
  const user = useLocalStorage.get(APP_USER);

  return user ? user : null;
};

export const getRequestError = (errorMessage) => {
  if (errorMessage) {
    alert(errorMessage);
  } else {
    return "There might be a problem with your internet connection. Please check and try again.";
  }
};

export const logout = () => {
  useLocalStorage.remove(APP_USER);
  window.scrollTo(0, 0);
  window.location.assign("/");
};

export const formatNumber = (n, decimals) => {
  return (
    n &&
    Number(n)
      .toFixed(decimals || 0)
      .replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      })
  );
};

export const capitalizeWord = (word) => {
  const result = word.charAt(0).toUpperCase() + word.slice(1);

  return result;
};

export const generateCode = () => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 4) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

// Form Validations
export const emailFormValidation = (required) => {
  return {
    required: required ? "Email address is required" : false,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  };
};
export const nameFormValidation = (required) => {
  return {
    required: required ? "This field is required" : false,
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Invalid name",
    },
    minLength: {
      value: 2,
      message: "Must be more than 1 character",
    },
  };
};
export const textFormValidation = (required, minLength) => {
  return {
    required: required ? "This field is required" : false,
    minLength: minLength
      ? {
          value: minLength + 1,
          message: `Must be more than ${minLength} character(s)`,
        }
      : {
          value: 2,
          message: "Must be more than 1 character",
        },
  };
};
export const numberFormValidation = (
  required,
  minLength,
  maxLength,
  min,
  max
) => {
  return {
    required: required ? "This field is required" : false,
    minLength: {
      value: minLength,
      message: `Minimum characters is ${minLength}`,
    },
    maxLength: {
      value: maxLength,
      message: `Maximum characters is ${maxLength}`,
    },
    min: {
      value: min || 0,
      message: `Minimum value is ${min || 0}`,
    },
    max: {
      value: max || 10000000000000000000,
      message: `Maximum value is ${max || 10000000000000000000}`,
    },
  };
};
export const passwordFormValidation = (required) => {
  return {
    required: required ? "This field is required" : false,
    minLength: {
      value: 8,
      message: "Must be atleast 8 characters",
    },
  };
};
export const basicFormValidation = (required) => {
  return {
    required: required ? "This field is required" : false,
  };
};
