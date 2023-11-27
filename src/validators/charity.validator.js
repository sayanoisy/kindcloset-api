import { z } from "zod";

const isMobileNumber = (value) => {
  const mobileNumberRegex = /^[0-9]{10}$/;
  return mobileNumberRegex.test(value);
};

const CharityValidatorSchema = z.object({
  body: z
    .object({
      organizationName: z.string(),
      contactNumber: z.string().refine(isMobileNumber, {
        message: "Invalid contact number. It should be a 10-digit number.",
      }),
      contactEmail: z
        .string()
        .email("Invalid email id. Please enter valid email id"),
      contactLocation: z.string(),
      privacyPreferences: z.boolean(),
      documents: z.array(z.string()),
      portfolioLink: z.string(),
      accreditationStatus: z.boolean(),
    })
    .strict(),
});

export default CharityValidatorSchema;
