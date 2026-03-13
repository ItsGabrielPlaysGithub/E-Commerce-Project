import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { useCart } from "./index";
import { validateDeliveryDetails, placeOrder } from "../services";
import { DeliveryDetails, CartItem, Company } from "../types";

/**
 * Custom hook for managing cart logic and state
 * Handles: delivery form, order confirmation, MOQ warnings, etc.
 */
export function useCartLogic() {
  const { isLoggedIn, company: authCompany } = useAuth();
  const { items, pricingTier, updateQty, removeItem, clearCart, subtotal, itemCount } = useCart();
  const router = useRouter();

  // Create a company object with all required properties for cart components
  const accountType = ((authCompany as any)?.accountType as "wholesale" | "bulk" | "retail") || pricingTier;
  const tier = ((authCompany as any)?.tier as string) || "Standard";

  const company = {
    ...authCompany,
    accountType,
    tier,
    name: (authCompany?.companyName as string) || ((authCompany as any)?.name as string) || "Your Company",
    email: (authCompany?.emailAddress as string) || ((authCompany as any)?.email as string) || "",
    accountNumber: ((authCompany as any)?.accountNumber as string) || "",
    contactPerson: ((authCompany as any)?.contactPerson as string) || (authCompany?.fullName as string) || "",
  } as Company;

  // State
  const [showModal, setShowModal] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    address: company.address || "",
    contactPerson: company.contactPerson || "",
    contactNumber: (authCompany?.phoneNumber as string) || "",
    deliveryDate: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});
  const [placing, setPlacing] = useState(false);

  // Compute MOQ warnings
  const moqWarnings = items.filter((item: CartItem) => {
    if (accountType === "wholesale") return item.qty < item.product.minWholesale;
    if (accountType === "bulk") return item.qty < item.product.minBulk;
    return false;
  });

  // Validate delivery form
  const validateForm = useCallback(() => {
    const { isValid, errors: newErrors } = validateDeliveryDetails(delivery);
    setErrors(newErrors);
    return isValid;
  }, [delivery]);

  // Place order handler
  const handlePlaceOrder = useCallback(async () => {
    if (!validateForm()) return;
    if (!confirmed) {
      setErrors((prev) => ({
        ...prev,
        notes: "Please confirm your order before proceeding.",
      }));
      return;
    }

    setPlacing(true);
    try {
      await placeOrder({
        items: items.map((item: CartItem) => ({
          productId: item.product.id,
          quantity: item.qty,
          unitPrice: item.unitPrice,
        })),
        delivery,
        subtotal,
        deliveryFee: subtotal >= 3000 ? 0 : 350,
        grandTotal: subtotal + (subtotal >= 3000 ? 0 : 350),
        companyId: String(authCompany?.userId) || "",
      });
      clearCart();
      router.push("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      setErrors({ notes: "Failed to place order. Please try again." });
    } finally {
      setPlacing(false);
    }
  }, [validateForm, confirmed, items, delivery, subtotal, authCompany?.userId, clearCart, router]);

  // Close modal handler
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setErrors({});
    setConfirmed(false);
  }, []);

  return {
    // Auth & data
    isLoggedIn,
    company,
    items,
    itemCount,
    subtotal,
    accountType,
    tier,
    // Modal & form state
    showModal,
    setShowModal,
    delivery,
    setDelivery,
    confirmed,
    setConfirmed,
    errors,
    setErrors,
    placing,
    // Computed
    moqWarnings,
    // Handlers
    handlePlaceOrder,
    handleCloseModal,
    onUpdateQty: updateQty,
    onRemoveItem: removeItem,
  };
}
