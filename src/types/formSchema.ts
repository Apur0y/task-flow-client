// formSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  projectName: z.string({ required_error: "Project Name is required" }),
  projectId: z
    .string({ required_error: "Project ID is required" })
    .regex(/^PRJ\d{3}$/, {
      message:
        "Project ID must be in the format 'PRJ' followed by 3 digits (e.g., PRJ123)",
    }),
  clientId: z
    .string({ required_error: "Client ID is required" })
    .regex(/^CLI\d{3}$/, {
      message:
        "Client ID must be in the format 'CLI' followed by 3 digits (e.g., CLI123)",
    }),
  station: z.string({ required_error: "Source Station is required" }),
  projectValue: z
    .number({ invalid_type_error: "Project Value must be a number" })
    .min(0, "Project Value is required"),
  //   deadline: z
  //     .string({ required_error: "Deadline is required" })
  //     .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //       message: "Deadline must be in YYYY-MM-DD format",
  //     }),
  projectDescription: z
    .string({ required_error: "Project Description is required" })
    .min(40, "Project description must be at least 40 characters")
    .max(50, "Project description must be at most 50 characters"),
});

export type FormData = z.infer<typeof formSchema>;
