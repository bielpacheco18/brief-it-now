
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FieldType = 'text' | 'textarea' | 'dropdown' | 'number' | 'date' | 'email';

interface FieldTypeSelectorProps {
  value: FieldType;
  onChange: (value: FieldType) => void;
}

export function FieldTypeSelector({ value, onChange }: FieldTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as FieldType)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Tipo de campo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="text">Texto curto</SelectItem>
          <SelectItem value="textarea">Texto longo</SelectItem>
          <SelectItem value="dropdown">Lista suspensa</SelectItem>
          <SelectItem value="number">Número</SelectItem>
          <SelectItem value="date">Data</SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
