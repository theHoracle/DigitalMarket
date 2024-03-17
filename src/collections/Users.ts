import path from "path";
import { CollectionConfig } from "payload/types";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<p>Click the following link to verify your account:</p> <a href="${process.env.NEXT_PUBLIC_SERVER}/verify-email?token=${token}">Verify your account</a> `;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      label: "Role",
      required: true,
      // defaultValue: "user",
      // admin: {
      //   condition: () => false,
      // },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
