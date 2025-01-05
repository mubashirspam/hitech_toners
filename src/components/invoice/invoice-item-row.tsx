import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiTrash } from "react-icons/bi";
import type { InvoiceItem } from "./types";

interface InvoiceItemRowProps {
  item: InvoiceItem;
  index: number;
  onUpdate: (index: number, updates: Partial<InvoiceItem>) => void;
  onRemove: (index: number) => void;
}

export function InvoiceItemRow({
  item,
  index,
  onUpdate,
  onRemove,
}: InvoiceItemRowProps) {
  return (
    <div className="flex gap-4">
      <Input
        value={item.description}
        onChange={(e) => onUpdate(index, { description: e.target.value })}
        placeholder="Description"
        className="flex-1"
      />
      <Input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdate(index, { quantity: e.target.value })}
        placeholder="Quantity"
        className="w-32"
      />
      <Input
        type="number"
        value={item.unitPrice}
        onChange={(e) => onUpdate(index, { unitPrice: e.target.value })}
        placeholder="Unit Price"
        className="w-32"
      />
      <div className="w-44 flex items-center">
        {(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)}
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(index)}>
        <BiTrash className="h-4 w-4" />
      </Button>
    </div>
  );
}
