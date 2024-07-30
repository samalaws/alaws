import { z } from "zod";
export const devSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    gitHubLink: z.string().min(1, { message: "Github is required" }),
    onlineLink: z.string().optional(),
    images:         z.array(z.string()).min(1, "At least one image is required"),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
});