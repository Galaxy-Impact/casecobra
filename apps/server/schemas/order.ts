import Joi from "joi";

const updateOrder = Joi.object().keys({
  status: Joi.string().valid("fulfilled", "shipped", "awaiting_shipment"),
});

export const orderSchema = {
  updateOrder,
};
