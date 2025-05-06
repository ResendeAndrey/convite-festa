import { useEffect, useState } from "react";

type SearchInputProps = {
  onSearch: (value: string | undefined) => void;
};

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue !== null) {
        onSearch(inputValue?.trim() || undefined); // envia `undefined` se estiver vazio
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, onSearch]);


  return (
    <input
      type="text"
      placeholder="Buscar por nome ou telefone..."
      className="border border-gray-300 rounded px-4 py-2 w-full sm:max-w-sm bg-white"
      value={inputValue as string}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
