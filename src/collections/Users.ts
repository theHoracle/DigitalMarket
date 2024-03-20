import path from "path";
import { Access, CollectionConfig } from "payload/types";
import dotenv from "dotenv";
import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { CartItem, useCart } from "@/hooks/use-cart";
import { AfterReadHook } from "payload/dist/collections/config/types";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user && user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

const syncCart: AfterReadHook = async ({ req }) => {};
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "Verify your account",
          buttonText: "Verify account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id"],
  },
  fields: [
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product files",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "product_files",
      hasMany: true,
    },
    {
      name: "role",
      label: "Role",
      required: true,
      defaultValue: "user",
      admin: {
        condition: () => false,
      },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "cart",
      label: "Cart",
      required: false,
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      admin: {
        hidden: true,
      },
    },
  ],
};
