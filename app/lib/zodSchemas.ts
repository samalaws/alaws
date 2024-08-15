import { z } from "zod";

export const devSchema = z.object({
    title:          z.string().min(1, { message: "Title is required" }),
    description:    z.string().min(1, { message: "Description is required" }),
    gitHubLink:     z.string().min(1, { message: "Github is required" }),
    onlineLink:     z.string().optional(),
    images:         z.array(z.string()).min(1, "At least one image is required"),
    status:         z.enum(["draft", "published", "archived"]).default("draft"),
    languages:      z.enum(["Arabic","English","German"] ).default("English"),
});

export const artSchema = z.object({
    title:          z.string().min(1, { message: "Title is required" }),
    description:    z.string().min(1, { message: "Description is required" }),
    images:         z.array(z.string()).min(1, "At least one image is required"),
    status:         z.enum(["draft", "published", "archived"]).default("draft"),
    languages:      z.enum(["Arabic","English","German"] ).default("English"),
    khat:           z.enum(["Ruqaa","Naskh","Diwani","DiwaniJali","Kufi","Taliek","Thuluth"] ).default("Diwani"),
});

export const articleSchema = z.object({
    title:          z.string().min(1, { message: "Title is required" }),
    paragraph:      z.string().min(1, { message: "Description is required" }),
    images:         z.array(z.string()).min(1, "At least one image is required"),
    status:         z.enum(["draft", "published", "archived"]).default("draft"),
    languages:      z.enum(["Arabic","English","German"] ).default("English"),
});

export const contactSchema = z.object({
    name:           z.string().min(1, { message: "Name is required" }),
    email:          z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    reason:         z.enum(["Personal","Business"] ).default("Business"),
    subject:        z.string().min(1, { message: "Subject is required" }),
    message:        z.string().min(1, { message: "Message is required" }),
});