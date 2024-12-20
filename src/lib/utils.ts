import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// @ts-expect-error no types for html2pdf
import * as html2pdf from "html2pdf.js";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function downloadHtmlAsPdf(id: string, name: string) {
    const element = document.getElementById(id);
    if (!element) return;

    html2pdf
        .default()
        .set({
            margin: 8,
            filename: `${name}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 8 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save()
        .catch((error: unknown) => {
            console.error("Error generating PDF:", error);
        });
}
