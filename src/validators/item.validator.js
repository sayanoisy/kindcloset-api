import { z } from "zod";

const ItemValidatorSchema = z.object({
  body: z
    .object({
      itemType: z.string(),
      gender: z.string(),
      ageGroup: z.string(),
      size: z.string(),
      condition: z.string(),
      images: z.array(z.string()),
      description: z.string(),
    })
    .strict(),
});

export default ItemValidatorSchema;
