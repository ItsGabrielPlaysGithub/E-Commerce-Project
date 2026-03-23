import { DeliveryDetails } from "../types";

/**
 * Validate delivery details before submission
 */
export function validateDeliveryDetails(delivery: DeliveryDetails) {
  const errors: Partial<DeliveryDetails> = {};

  if (!delivery.address.trim()) {
    errors.address = "Delivery address is required.";
  }
  if (!delivery.contactPerson.trim()) {
    errors.contactPerson = "Contact person is required.";
  }
  if (!delivery.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required.";
  }
  if (!delivery.deliveryDate) {
    errors.deliveryDate = "Preferred delivery date is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
