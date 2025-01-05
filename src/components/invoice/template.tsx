import { format } from "date-fns";
import { useMemo } from "react";
import logo from "@/assets/logo.png";
import qrCode from "@/assets/qrcode.png";
import type { FormState, InvoiceItem } from "./types";

type InvoiceProps = FormState & {
  id: string;
  items: InvoiceItem[];
};

const numberToWords = (num: number): string => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const convertLessThanThousand = (n: number): string => {
    if (n === 0) return "";

    if (n < 10) return ones[n];

    if (n < 20) return teens[n - 10];

    if (n < 100) {
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    }

    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "")
    );
  };

  if (num === 0) return "Zero";

  const wholePart = Math.floor(num);
  const decimalPart = Math.round((num - wholePart) * 100);

  let result = "";

  if (wholePart > 0) {
    const billions = Math.floor(wholePart / 1000000000);
    const millions = Math.floor((wholePart % 1000000000) / 1000000);
    const thousands = Math.floor((wholePart % 1000000) / 1000);
    const remainder = wholePart % 1000;

    if (billions) result += convertLessThanThousand(billions) + " Billion ";
    if (millions) result += convertLessThanThousand(millions) + " Million ";
    if (thousands) result += convertLessThanThousand(thousands) + " Thousand ";
    if (remainder) result += convertLessThanThousand(remainder);

    result = result.trim() + " Saudi Arabian Riyal";
  }

  if (decimalPart > 0) {
    result += " and " + convertLessThanThousand(decimalPart) + " Halala";
  }

  return result + " Only";
};

export default function InvoiceTemplate({
  toAddress,
  items,
  date,
  name,
  invoiceNo,
  mobile,
  id,
}: InvoiceProps) {
  const itemsWithVAT = useMemo(() => {
    return items.map((item) => {
      const amount = Number(item.quantity || 0) * Number(item.unitPrice || 0);
      const vat = amount * 0.15;
      return {
        ...item,
        amount,
        vat,
        total: amount + vat,
      };
    });
  }, [items]);

  const totals = useMemo(() => {
    return itemsWithVAT.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.amount,
        vat: acc.vat + item.vat,
        total: acc.total + item.total,
      }),
      { subtotal: 0, vat: 0, total: 0 }
    );
  }, [itemsWithVAT]);

  const formattedDate = date ? format(new Date(date), "dd MMM yyyy") : "";

  return (
    <div
      id={id}
      className="w-[1024px] font-sans bg-white scale-[calc(718/1024)] origin-top-left p-8 bg-white min-h-[1056px] flex flex-col border border-border"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-1">
          <h2 className="text-[#440873] font-bold text-lg">
            Shams Al Ghuroub Trading Est.
          </h2>
          <p className="text-black text-base font-semibold">
            WHOLESALE & RETAIL - SALES & SERVICE
          </p>
          <p className="text-sm">MECCA-SAUDI ARABIA</p>
          <p className="text-sm">VAT No. : 302134781700003</p>
          <p className="text-sm">Email : hitech2025printer@gmail.com</p>{" "}
          <p className="text-sm">Phone : 0507515641</p>
        </div>

        <div className="flex items-start justify-center">
          <img
            src={logo}
            alt="shams logo"
            className="w-full max-w-32 object-contain bg-blend-multiply"
          />
        </div>

        <div dir="rtl" className="space-y-1">
          <h2 className="text-[#440873] font-bold text-xl">
            مؤسسة شمس الغروب التجارية
          </h2>
          <p className="text-black text-base font-semibold">
            البيع بالجملة والتجزئة-المبيعات والخدمات
          </p>
          <p className="text-sm">مكة - المملكة العربية السعودية</p>
          <p className="text-sm">رقم الضريبة :٣٠٢١٣٤٧٨١٧٠٠٠٠٣</p>
          <p className="text-sm">
            البريد الإلكتروني : hitech2025printer@gmail.com
          </p>
          <p className="text-sm">هاتف : 0507515641</p>
        </div>
      </div>
      <div className="my-6 bg-[#440873] text-white text-center py-2 border border-border">
        <h2 className="text-lg font-semibold">TAX INVOICE (ﻓﺎﺗﻭﺭﺓ ﺿﺭﻳﺑﻳﺔ)</h2>
      </div>

      <div className="flex gap-6 mb-6">
        {/* Left Section - Address */}
        <div className="flex-1 border border-border p-3">
          <div className="font-semibold mb-2">TO (إلى)</div>
          <div className="text-sm whitespace-pre-line">{toAddress}</div>
        </div>

        {/* Right Section - Details */}
        <div className="w-[400px] border border-border">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-3 font-semibold border-r border-border">
                  Date (التاريخ)
                </td>
                <td className="py-2 px-3">{formattedDate}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3 font-semibold border-r border-border">
                  Name (الاسم)
                </td>
                <td className="py-2 px-3">{name}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3 font-semibold border-r border-border">
                  Invoice No. (رقم الفاتورة)
                </td>
                <td className="py-2 px-3">{invoiceNo}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold border-r border-border">
                  Mobile No. (رقم الجوال)
                </td>
                <td className="py-2 px-3">{mobile}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex-1 flex flex-col border border-border border-[0.5px]">
        <div className="bg-[#440873] text-white text-sm font-semibold flex divide-x divide-white/50">
          <div className="py-1 px-3 w-16 shrink-0 text-center">S/No الرقم</div>
          <div className="py-1 px-3 flex-1 text-left">
            DESCRIPTION OF GOODS وصف البضائع
          </div>
          <div className="py-1 px-1.5 w-16 shrink-0 text-center">
            QTY الكمية
          </div>
          <div className="py-1 px-1.5 w-24 shrink-0 text-center">
            RATE السعر
          </div>
          <div className="py-1 px-1.5 w-24 shrink-0 text-center">
            AMOUNT المبلغ
          </div>
          <div className="py-1 px-1.5 w-24 shrink-0 text-center">
            VAT 15% الضريبة
          </div>
          <div className="py-1 px-1.5 w-24 shrink-0 text-center">
            TOTAL الإجمالي
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          {itemsWithVAT.map((item, index) => (
            <div
              key={index}
              className="border-b border-border divide-x divide-border flex"
            >
              <div className="py-1.5 px-3 w-16 shrink-0 text-center">
                {index + 1}
              </div>
              <div className="py-1.5 px-3 flex-1">{item.description}</div>
              <div className="py-1.5 px-3 w-16 shrink-0 text-right">
                {Number(item.quantity || 0)}
              </div>
              <div className="py-1.5 px-3 w-24 shrink-0 text-right">
                {Number(item.unitPrice || 0).toFixed(2)}
              </div>
              <div className="py-1.5 px-3 w-24 shrink-0 text-right">
                {item.amount.toFixed(2)}
              </div>
              <div className="py-1.5 px-3 w-24 shrink-0 text-right">
                {item.vat.toFixed(2)}
              </div>
              <div className="py-1.5 px-3 w-24 shrink-0 text-right">
                {item.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-4"></div>
      <div className="mt-auto">
        <div className="flex justify-between mb-6">
          <div className="space-y-3 flex-1 mr-6">
            {/* Amount in Words Section */}
            <div className="border-t border-border mt-4 pt-4 space-y-2">
              <div className="text-sm">
                <span className="font-semibold">
                  Amount Chargeable (in words) المبلغ المستحق بالحروف:{" "}
                </span>
                {numberToWords(totals.total)}
              </div>
              <div className="text-sm">
                <span className="font-semibold">
                  VAT Amount in words مبلغ ضريبة القيمة المضافة بالحروف:{" "}
                </span>
                {numberToWords(totals.vat)}
              </div>
            </div>

            <div className="border border-border p-3">
              <h3 className="font-bold text-base mb-2">
                Company's Bank Details تفاصيل البنك
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold">Bank Name اسم البنك</span>
                  <span className="text-sm">: NCB BANK</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">A/c No. رقم الحساب</span>
                  <span className="text-sm">: 01600000390506</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">IBAN آيبان</span>
                  <span className="text-sm">: SA5410000001600000390506</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Branch & SWIFT Code الفرع والسويفت
                  </span>
                  <span className="text-sm">: MAKKAH</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xs border border-border">
            <div className="grid grid-cols-2 divide-x divide-border border-b">
              <div className="py-1.5 px-2 font-bold">SUBTOTAL (المجموع)</div>
              <div className="text-right py-1.5 px-2">
                {totals.subtotal.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border border-b">
              <div className="py-1.5 px-2 font-bold">
                TOTAL VAT (ضريبة القيمة المضافة)
              </div>
              <div className="text-right py-1.5 px-2">
                {totals.vat.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="bg-[#440873] text-white py-1.5 px-2 font-bold">
                GRAND TOTAL (المجموع الكلي)
              </div>
              <div className="text-right py-1.5 px-2 font-bold">
                {totals.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border p-3">
          <p className="text-sm font-bold mb-1">DECLARATIONS (ﺇﻗﺭﺍﺭ) :</p>
          <p className="text-sm">
            We declare that this invoice shows the actual price of the goods
            described and that all particulars are true and correct.
            <br />
            نقر بأن هذه الفاتورة تُظهر السعر الفعلي للبضائع الموصوفة، وأن جميع
            التفاصيل الواردة صحيحة ودقيقة.
          </p>
        </div>

        <div className="mt-6">
          <div className="border-t pt-4 flex justify-between items-start">
            <div className="flex items-start gap-8">
              <img src={qrCode} alt="QR Code" className="w-32" />
              <div className="border-t border-dashed pt-2">
                <p className="text-sm">Customer's Seal and Signature</p>
                <p className="text-sm text-right">ختم وتوقيع العميل</p>
              </div>
            </div>

            <div className="text-right ml-auto">
              <p className="text-sm">Branch & SWIFT Code: MAKKAH</p>
              <p className="text-sm font-semibold">
                for Shams Al Ghuroub Trading Est. (مؤسسة شمس الغروب للتجارة)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
