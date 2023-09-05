const { body} = require("express-validator");

const userValidator  = {
    create:[
      body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("email")
      .exists()
      .withMessage("Email was not provided")
      .bail()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isString()
      .withMessage("Email must be a string")
      .bail()
      .isEmail()
      .withMessage("Email format is incorrect"),


    ]
}
const authValidator ={
  signup:[
    body("email")
    .exists()
    .withMessage("Email must be provided")
    .bail()
    .isString()
    .withMessage("Email must be a String")
    .bail()
    .isEmail()
    .withMessage("Provide the right email formate")
    .custom((value) => {
      if (!value.includes('@') || !value.includes('.')) {
        throw new Error("Email must include '@' and a valid domain.");
      }
      return true;
    })
    .withMessage("Email must include '@' and a valid domain."),
  body("password")
    .exists()
    .withMessage("Password must be provided")
    .bail()
    .isString()
    .withMessage("Password must be a String")
    .bail()
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
    .withMessage("Password should be at least 8 characters, with a minimum of 1 lowercase, 1 uppercase, 1 number, and 1 symbol."),

  ]
}
module.exports = {userValidator,authValidator};
