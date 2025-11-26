export interface userInterface {
  user: string;
  name: string;
  isActive?: boolean;
  email: string;
  dob: string;
  submissionDate: string;
  passport: string;
  trnNumber: string;
  rejectionDate?: string;
  fileStatus?: string;
  submissionFile?: File | string;
  rejectionFile?: File | string;
  createdAt: string;
  type: string;
  _id?: string;

  // Invoice/Receipt related fields
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  invoiceDetails?: {
    invoiceNumber?: string;
    invoiceDate?: string;
    invoiceAmount?: number;
    businessPartner?: string;
    issuingOffice?: string;
  };
  receiptDetails?: {
    receiptNumber?: string;
    paymentDate?: string;
    paymentMethod?: string;
    amountPaid?: number;
  };
  visaDetails?: {
    visaType?: string;
    visaCategory?: string;
  };
}
