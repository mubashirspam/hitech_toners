import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const FormField = ({
    label,
    value,
    onValueChange,
    type = "text",
    ...props
}: React.ComponentProps<"input"> & { label: string; onValueChange: (val: string) => void }) => (
    <div className="space-y-1">
        <Label>{label}</Label>
        <Input
            type={type}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="Type here"
            {...props}
        />
    </div>
);
