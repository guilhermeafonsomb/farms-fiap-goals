import { useState } from "react";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "money" | "unit";
  placeholder?: string;
};

export const LabeledInput = ({
  label,
  value,
  onChangeText,
  type = "money",
  placeholder,
}: Props) => {
  const [displayValue, setDisplayValue] = useState(value);

  function handleChange(text: string) {
    let numeric = text.replace(/\D/g, "");

    if (type === "money") {
      let number = parseFloat(numeric) / 100;
      let formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(number);
      setDisplayValue(formatted);
      onChangeText(number.toString());
    } else if (type === "unit") {
      let number = parseInt(numeric) || 0;
      let formatted = `${number} unidades`;
      setDisplayValue(formatted);
      onChangeText(number.toString());
    }
  }

  return (
    <section>
      <label htmlFor={label} className="flex flex-col">
        <span className="text-base font-medium text-black mb-2">{label}</span>
        <input
          id={label}
          className="rounded-lg p-3 mb-3 text-black bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder={placeholder}
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          aria-describedby={placeholder ? `${label}-hint` : undefined}
        />
      </label>
    </section>
  );
};
