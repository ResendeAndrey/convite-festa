
import * as React from 'react';
import Select from 'react-select';


interface FamilyFilterProps {
  families: FamilyData[];
  onFamilyChange: (selectedFamily: FamilyData | undefined) => void;
  selectedFamilyId?: string;
}

const FamilyFilter: React.FC<FamilyFilterProps> = ({ families, onFamilyChange, selectedFamilyId }) => {
  const [selectedFamily, setSelectedFamily] = React.useState<FamilyData | null>(null);

  React.useEffect(() => {
    if (selectedFamilyId) {
      const family = families.find((f) => f.id === selectedFamilyId);
      setSelectedFamily(family || null);
    }
  }, [families, selectedFamilyId]);
  if (!families) return null
  return (
    <div>
      <Select className='min-w-3xs'
        onChange={(opt) => {
          const family = families.find((f) => f?.id === opt?.value) || undefined;
          onFamilyChange(family);
        }}
        options={families.map(family => ({ value: family.id, label: family.name }))}
        value={selectedFamilyId ? { value: selectedFamily?.id, label: selectedFamily?.name } : null}
        placeholder="Selecione a Familia"
        isClearable


      />

    </div>
  );
};

export default FamilyFilter;
