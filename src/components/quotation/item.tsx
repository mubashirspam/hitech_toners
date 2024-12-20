import { BiTrash } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";

const QuotationItemRow = ({
    item,
    onUpdate,
    onRemove,
    index,
}: {
    item: { description: string; quantity: string; unitPrice: string };
    onUpdate: (
        index: number,
        updatingItem: Partial<{ description: string; quantity: string; unitPrice: string }>
    ) => void;
    onRemove: (index: number) => void;
    index: number;
}) => (
    <div className="flex gap-4">
        <FormField
            label="Description"
            value={item.description}
            onValueChange={(value) => onUpdate(index, { description: value })}
        />
        <FormField
            label="Quantity"
            type="number"
            value={item.quantity}
            onValueChange={(value) => onUpdate(index, { quantity: value })}
        />
        <FormField
            label="Unit Price"
            type="number"
            value={item.unitPrice}
            onValueChange={(value) => onUpdate(index, { unitPrice: value })}
        />
        <Button size="icon" variant="outline" onClick={() => onRemove(index)} className="self-end">
            <BiTrash />
        </Button>
    </div>
);

export default QuotationItemRow;
