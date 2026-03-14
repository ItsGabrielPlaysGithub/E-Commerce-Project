import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { useCart } from "./index";
import { validateDeliveryDetails, placeOrder } from "../services";
import { DeliveryDetails, CartItem, Company } from "../types";

type CartAuthCompany = Company & {
  userId?: number;
  companyName?: string;
  emailAddress?: string;
  fullName?: string;
  phoneNumber?: string;
  accountType?: "wholesale" | "bulk" | "retail";
  tier?: string;
  name?: string;
  email?: string;
  accountNumber?: string;
  contactPerson?: string;
};

/**
 * Custom hook for managing cart logic and state
 * Handles: delivery form, order confirmation, MOQ warnings, etc.
 */
export function useCartLogic() {
  const { isLoggedIn, company: authCompany } = useAuth();
  const { items, pricingTier, updateQty, removeItem, removeItems, subtotal, itemCount } = useCart();
  const router = useRouter();
  const currentCompany = authCompany as CartAuthCompany | null;

  const accountType = currentCompany?.accountType || pricingTier;
  const tier = currentCompany?.tier || "Standard";

  const company = {
    ...currentCompany,
    accountType,
    tier,
    name: currentCompany?.companyName || currentCompany?.name || "Your Company",
    email: currentCompany?.emailAddress || currentCompany?.email || "",
    accountNumber: currentCompany?.accountNumber || "",
    contactPerson: currentCompany?.contactPerson || currentCompany?.fullName || "",
  } as Company;

  // State
  const [showModal, setShowModal] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    address: company.address || "",
    contactPerson: company.contactPerson || "",
    contactNumber: currentCompany?.phoneNumber || "",
    deliveryDate: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});
  const [placing, setPlacing] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const hasInitializedSelection = useRef(false);

  useEffect(() => {
    if (items.length === 0) {
      setSelectedItemIds([]);
      hasInitializedSelection.current = false;
      return;
    }

    if (!hasInitializedSelection.current) {
      setSelectedItemIds(items.map((item) => item.product.id));
      hasInitializedSelection.current = true;
      return;
    }

    setSelectedItemIds((currentSelected) => {
      const availableIds = new Set(items.map((item) => item.product.id));
      const nextSelected = currentSelected.filter((id) => availableIds.has(id));
      const newItemIds = items
        .map((item) => item.product.id)
        .filter((id) => !currentSelected.includes(id));

      return [...nextSelected, ...newItemIds];
    });
  }, [items]);

  const selectedItems = items.filter((item) => selectedItemIds.includes(item.product.id));
  const selectedItemCount = selectedItems.reduce((sum, item) => sum + item.qty, 0);
  const selectedSubtotal = selectedItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  const moqWarnings = items.filter((item: CartItem) => {
    if (accountType === "wholesale") return item.qty < item.product.minWholesale;
    if (accountType === "bulk") return item.qty < item.product.minBulk;
    return false;
  });

  const selectedMoqWarnings = selectedItems.filter((item: CartItem) => {
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
    if (selectedItems.length === 0) {
      setErrors((prev) => ({
        ...prev,
        notes: "Select at least one item to checkout.",
      }));
      return;
    }

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
        items: selectedItems.map((item: CartItem) => ({
          productId: item.product.id,
          quantity: item.qty,
          unitPrice: item.unitPrice,
        })),
        delivery,
        subtotal: selectedSubtotal,
        deliveryFee: selectedSubtotal >= 3000 ? 0 : 350,
        grandTotal: selectedSubtotal + (selectedSubtotal >= 3000 ? 0 : 350),
        companyId: String(currentCompany?.userId) || "",
      });
      removeItems(selectedItems.map((item) => item.product.id));
      router.push("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      setErrors({ notes: "Failed to place order. Please try again." });
    } finally {
      setPlacing(false);
    }
  }, [validateForm, selectedItems, confirmed, delivery, selectedSubtotal, currentCompany?.userId, removeItems, router]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setErrors({});
    setConfirmed(false);
  }, []);

  const toggleItemSelection = useCallback((productId: string) => {
    setSelectedItemIds((currentSelected) =>
      currentSelected.includes(productId)
        ? currentSelected.filter((id) => id !== productId)
        : [...currentSelected, productId]
    );
    setErrors((prev) => ({ ...prev, notes: undefined }));
  }, []);

  return {
    isLoggedIn,
    company,
    items,
    selectedItems,
    selectedItemIds,
    itemCount,
    selectedItemCount,
    subtotal,
    selectedSubtotal,
    accountType,
    tier,
    showModal,
    setShowModal,
    delivery,
    setDelivery,
    confirmed,
    setConfirmed,
    errors,
    setErrors,
    placing,
    moqWarnings,
    selectedMoqWarnings,
    hasSelectedItems: selectedItems.length > 0,
    handlePlaceOrder,
    handleCloseModal,
    onUpdateQty: updateQty,
    onRemoveItem: removeItem,
    onToggleItemSelection: toggleItemSelection,
  };
}
