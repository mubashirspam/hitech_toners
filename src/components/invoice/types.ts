export interface InvoiceItem {
    description: string;
    quantity: string;
    unitPrice: string;
    vat?: string;
}

export interface FormState {
    toAddress: string;
    name: string;
    invoiceNo: string;
    mobile: string;
    date: string;
    brand: string;
    model: string;
    machineType: string;
}
