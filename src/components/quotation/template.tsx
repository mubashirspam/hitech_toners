import { useMemo } from "react";
import logo from "../../assets/logo.jpeg";
import { format } from "date-fns";
import type { FormState, QuotationItem } from "./types";

type QuotationProps = FormState & {
  id: string;
  items: QuotationItem[];
};

export default function QuotationTemplate({
  toAddress,
  items,
  // vat,
  brand,
  model,
  machineType,
  date,
  name,
  refNo,
  mobile,
  id,
}: QuotationProps) {
  const total = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc + Number(item.quantity || 0) * Number(item.unitPrice || 0),
        0
      ),
    [items]
  );
  const vat = useMemo(() => (total * 0.15).toFixed(2), [total]);

  const grandTotal = Number(total + Number(vat)).toFixed(2);

  const formattedDate = date ? format(new Date(date), "dd MMM yyyy") : "";

  return (
    <div
      id={id}
      className="w-[1024px] font-sans bg-white scale-[calc(718/1024)] origin-top-left p-4"
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <h2 className="text-[#D35400] font-bold text-lg">
            ABDULAZIZ HASAN FALAH EST.
          </h2>
          <p className="text-black text-base font-semibold">
            WHOLESALE & RETAIL - SALES & SERVICE
          </p>
          <p className="text-sm">DAMMAM-SAUDI ARABIA</p>
          {/* <p className="text-sm">VAT No. : 302134781700003</p> */}
        </div>

        <div className="flex items-start justify-center">
          <img
            src={logo}
            alt="shams logo"
            className="w-full max-w-32 object-contain bg-blend-multiply"
          />
        </div>

        <div dir="rtl" className="space-y-1">
          <h2 className="text-[#D35400] font-bold text-xl">
            مؤسسة عبدالعزيز حسن فلدج
          </h2>
          <p className="text-black text-base font-semibold">
            البيع بالجملة والتجزئة-المبيعات والخدمات
          </p>
          <p className="text-sm">الدمام - المملكة العربية السعودية</p>
          {/* <p className="text-sm">رقم الضريبة :٣٠٢١٣٤٧٨١٧٠٠٠٠٣</p> */}
        </div>
      </div>
      <div className="my-6 bg-[#D35400] text-white text-center py-2">
        <h2 className="text-lg font-semibold">QUOTATION</h2>
      </div>

      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-[#D35400] font-bold text-sm">TO</h3>
          <div className="whitespace-pre-wrap">{toAddress}</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[#D35400]">Date</p>
            <p className="text-right">{formattedDate}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[#D35400]">Name</p>
            <p className="text-right">{name}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[#D35400]">Ref No.</p>
            <p className="text-right">{refNo}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[#D35400]">Mob No.</p>
            <p className="text-right">{mobile}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-[#D35400] text-white font-bold text-center grid grid-cols-3">
          <div className="py-1.5 px-2.5">MACHINE TYPE</div>
          <div className="py-1.5 px-2.5">BRAND</div>
          <div className="py-1.5 px-2.5">MODEL</div>
        </div>
        <div className="divide-x divide-border text-center grid grid-cols-3">
          <div className="py-1.5 px-2.5">{machineType}</div>
          <div className="py-1.5 px-2.5">{brand}</div>
          <div className="py-1.5 px-2.5">{model}</div>
        </div>
      </div>
      <div>
        <div className="bg-[#D35400] text-white font-bold flex">
          <div className="py-1.5 px-2.5 w-16 shrink-0 text-center">S/No</div>
          <div className="py-1.5 px-2.5 flex-1 text-left">DESCRIPTION</div>
          <div className="py-1.5 px-2.5 w-32 shrink-0 text-right">QUANTITY</div>
          <div className="py-1.5 px-2.5 w-32 shrink-0 text-right">
            UNIT PRICE
          </div>
          <div className="py-1.5 px-2.5 w-44 shrink-0 text-right">AMOUNT</div>
        </div>
        <div>
          {items.map((item, index) => (
            <div key={index} className="border-b divide-x divide-border flex">
              <div className="py-1.5 px-3 w-16 shrink-0 text-center">
                {index + 1}
              </div>
              <div className="py-1.5 px-3 flex-1">{item.description}</div>
              <div className="py-1.5 px-3 w-32 shrink-0 text-right">
                {Number(item.quantity || 0)}
              </div>
              <div className="py-1.5 px-3 w-32 shrink-0 text-right">
                {Number(item.unitPrice || 0)}
              </div>
              <div className="py-1.5 px-3 w-44 shrink-0 text-right">
                {(
                  Number(item.quantity || 0) * Number(item.unitPrice || 0)
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-10">
        <div className="w-full max-w-xs">
          <p className="text-sm">TERMS & CONDITIONS :</p>
          <p className="text-sm">
            3 MONTHS WARRANTY FOR SERVICE & CHANGED PARTS FROM THE DATE OF
            INVOICE
          </p>
        </div>

        <div className="w-full max-w-xs divide-y divide-border border-y">
          <div className="grid grid-cols-2">
            <div className="py-1.5 px-2.5 font-bold">TOTAL</div>
            <div className="text-right py-1.5 px-2.5 flex items-center justify-end">
              {total.toFixed(2)}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="py-1.5 px-2.5 font-bold">VAT</div>
            <div className="text-right py-1.5 px-2.5 flex items-center justify-end">
              {Number(vat).toFixed(2)}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="bg-[#D35400] text-white py-1.5 px-2.5 font-bold">
              GRAND TOTAL
            </div>
            <div className="text-right py-1.5 px-2.5 flex items-center justify-end font-bold">
              {grandTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
