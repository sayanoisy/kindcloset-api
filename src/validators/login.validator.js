import { z } from "zod";

const isMobileNumber = (value) => {
  const mobileNumberRegex = /^[0-9]{10}$/;
  return mobileNumberRegex.test(value);
};

const LoginValidatorSchema = z.object({
  body: z
    .object({
      phoneNumber: z.string().refine(isMobileNumber, {
        message: "Invalid mobile number. It should be a 10-digit number.",
      }),
    })
    .strict(),
});

export default LoginValidatorSchema;
