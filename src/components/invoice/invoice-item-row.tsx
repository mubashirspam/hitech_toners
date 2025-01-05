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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border-b border-border">
      <div className="flex items-center gap-2">
        <span className="md:hidden font-semibold">Description:</span>
        <Input
          value={item.description}
          onChange={(e) => onUpdate(index, { description: e.target.value })}
          placeholder="Description"
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="md:hidden font-semibold">Quantity:</span>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdate(index, { quantity: e.target.value })}
          placeholder="Quantity"
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="md:hidden font-semibold">Unit Price:</span>
        <Input
          type="number"
          value={item.unitPrice}
          onChange={(e) => onUpdate(index, { unitPrice: e.target.value })}
          placeholder="Unit Price"
          className="flex-1"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <span className="md:hidden font-semibold">Amount:</span>
          <span className="flex-1">
            {(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(
              2
            )}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
          className="shrink-0"
        >
          <BiTrash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
