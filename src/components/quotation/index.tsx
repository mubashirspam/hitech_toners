import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { FormField } from "./form-field";
import { Textarea } from "@/components/ui/textarea";
import QuotationItemRow from "./item";
import { downloadHtmlAsPdf } from "@/lib/utils";
import QuotationTemplate from "./template";
import logo from "../../assets/logo.jpeg";
import type { FormState, QuotationItem } from "./types";

const INITIAL_ITEM: QuotationItem = {
  description: "",
  quantity: "0",
  unitPrice: "0",
};

const INITIAL_FORM_STATE: FormState = {
  toAddress: "",
  name: "",
  refNo: "",
  mobile: "",
  date: "",
  brand: "",
  model: "",
  machineType: "",
  vat: "0",
};

export default function Quotation() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [items, setItems] = useState<QuotationItem[]>([INITIAL_ITEM]);

  const updateFormField = useCallback(
    (field: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAddItem = useCallback(() => {
    setItems((prev) => [...prev, { ...INITIAL_ITEM }]);
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpdateItem = useCallback(
    (index: number, updates: Partial<QuotationItem>) => {
      setItems((prev) =>
        prev.map((item, i) => (i === index ? { ...item, ...updates } : item))
      );
    },
    []
  );

  const resetData = useCallback(() => {
    setFormState(INITIAL_FORM_STATE);
    setItems([INITIAL_ITEM]);
  }, []);

  const formFields = useMemo(
    () =>
      [
        { label: "Name", field: "name" },
        { label: "Ref No", field: "refNo" },
        { label: "Mobile", field: "mobile" },
        { label: "Date", field: "date", type: "date" },
        { label: "Brand", field: "brand" },
        { label: "Model", field: "model" },
        { label: "Machine Type", field: "machineType" },
        // { label: "VAT", field: "vat", type: "number" },
      ] as { label: string; field: keyof FormState; type?: string }[],
    []
  );

  return (
    <div className="space-y-4 pb-10">
      <div className="flex justify-center">
        <img
          src={logo}
          alt="shams logo"
          className="w-full max-w-32 object-contain bg-blend-multiply"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quotation Form</CardTitle>
          <CardDescription>Please enter the details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>To Address</Label>
              <Textarea
                rows={5}
                value={formState.toAddress}
                onChange={(e) => updateFormField("toAddress", e.target.value)}
                placeholder="Type here"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {formFields.map(({ label, field, type }) => (
                <FormField
                  key={field}
                  label={label}
                  value={formState[field]}
                  onValueChange={(value) => updateFormField(field, value)}
                  type={type}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
          <CardDescription>Please enter the item details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item, index) => (
              <QuotationItemRow
                key={index}
                item={item}
                index={index}
                onUpdate={handleUpdateItem}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleAddItem}>
            <BiPlus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center gap-4">
        <Button onClick={resetData}>Reset</Button>
        <Button
          onClick={() => downloadHtmlAsPdf("quotationContainer", "Quotation")}
        >
          Generate Quotation
        </Button>
      </div>

      <div className="fixed top-0 left-0 -translate-x-[150%] -translate-y-[150%] pointer-events-none">
        <QuotationTemplate
          id="quotationContainer"
          {...formState}
          items={items}
        />
      </div>
    </div>
  );
}
