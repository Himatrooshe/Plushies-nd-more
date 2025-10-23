import {useState} from 'react';

export function ProductForm({productOptions = [], onVariantChange}) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (optionName, value) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    if (onVariantChange) {
      onVariantChange(newOptions);
    }
  };

  return (
    <div className="product-form">
      {productOptions.map((option) => (
        <div key={option.name} className="option-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-3 py-1 border rounded text-sm transition-colors ${
                  selectedOptions[option.name] === value
                    ? 'border-[#ff7380] bg-[#ff7380] text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
