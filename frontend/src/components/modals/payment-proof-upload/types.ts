export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export interface PaymentProofUploadModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
}
