'use client';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import './styles.css';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

export function CountrySelect({ value, onChange, required }: CountrySelectProps) {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        if (value) {
          const selected = data.countries.find((country: CountryOption) => country.value === value);
          setSelectedCountry(selected || null);
        }
      });
  }, [value]);

  const handleChange = (selectedOption: CountryOption | null) => {
    setSelectedCountry(selectedOption);
    onChange(selectedOption?.value || '');
  };

  return (
    <Select
      options={countries}
      value={selectedCountry}
      onChange={handleChange}
      placeholder="Select a country"
      isClearable
      required={required}
      className="country-select"
      classNamePrefix="country-select"
      formatOptionLabel={(option: CountryOption) => (
        <div className="flex items-center">
          <span className="mr-2">{option.flag}</span>
          <span>{option.label}</span>
        </div>
      )}
    />
  );
} 