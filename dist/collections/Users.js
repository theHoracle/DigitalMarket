"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var PrimaryActionEmail_1 = require("../components/emails/PrimaryActionEmail");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../../.env"),
});
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user && user.role === "admin")
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "Verify your account",
                    buttonText: "Verify account",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token),
                });
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: function () { return true; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "product_files",
            label: "Product files",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "product_files",
            hasMany: true,
        },
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
