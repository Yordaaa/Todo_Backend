import { body } from "express-validator";

export const registrationValidator = [
  body("name").trim().notEmpty().withMessage("First name field is required"),

  body("password")
    .trim()
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage(
      "Password must be 8+ chars with lowercase, uppercase, numeric, and special symbols."
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];
