import { ObjectSchema } from "joi";
import { authSchema } from "./auth";
import { configurationSchema } from "./configure";
import { orderSchema } from "./order";

export default {
  ...authSchema,
  ...configurationSchema,
  ...orderSchema,
} as { [key: string]: ObjectSchema };

export type SchemaName =
  | "signin"
  | "signup"
  | "createConfiguration"
  | "updateConfiguration"
  | "updateOrder";
