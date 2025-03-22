import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  placeholder?: string;
  options: string[];
  onSelect: (option: string) => void;
  defaultValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder = "Select an option",
  options,
  onSelect,
  defaultValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultValue || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef} dir="rtl">
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 text-right bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {selectedOption || placeholder}
        </span>
        <svg 
          className="w-5 h-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d={isOpen ? "M14.77 12.79a.75.75 0 01-1.06 0L10 9.06l-3.71 3.71a.75.75 0 01-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06z" : "M5.23 7.21a.75.75 0 011.06 0L10 10.94l3.71-3.73a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"} 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 text-right cursor-pointer hover:bg-blue-500 hover:text-white ${
                  selectedOption === option ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface DropDownMenuProps {
    categoriesNames: string[];
    getCategoryName: (name:string) => void; 
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ categoriesNames  , getCategoryName}) => {
  const handleSelect = (option: string) => {
  getCategoryName(option)
  };

  return (
    <div className="p-4 max-w-md mx-auto" dir="rtl">
      <Dropdown 
        options={categoriesNames} 
        onSelect={handleSelect} 
      />
    </div>
  );
};

export default DropDownMenu;