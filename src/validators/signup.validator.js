import { z } from "zod";

const isMobileNumber = (value) => {
  const mobileNumberRegex = /^[0-9]{10}$/;
  return mobileNumberRegex.test(value);
};

const SignupValidatorSchema = z.object({
  body: z
    .object({
      name: z.string(),
      phoneNumber: z.string().refine(isMobileNumber, {
        message: "Invalid mobile number. It should be a 10-digit number.",
      }),
    })
    .strict(),
});

export default SignupValidatorSchema;
