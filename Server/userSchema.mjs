export const UserSchema = {
  firstName: {
    notEmpty: { errorMessage: "First name shouldn't be empty" },
  },
  lastName: {
    notEmpty: { errorMessage: "Last name shouldn't be empty" },
  },
  username: {
    notEmpty: { errorMessage: "Username shouldn't be empty" },
  },
  password: {
    notEmpty: { errorMessage: "Password shouldn't be empty" },
  },
  birthday: {
    notEmpty: { errorMessage: "Birthday shouldn't be empty" },
  },
  role: {
    notEmpty: { errorMessage: "Role shouldn't be empty" },
  },
  phoneNumber: {
    notEmpty: { errorMessage: "Phone Number shouldn't be empty" },
  },
  email: {
    notEmpty: { errorMessage: "Email shouldn't be empty" },
  },
};
