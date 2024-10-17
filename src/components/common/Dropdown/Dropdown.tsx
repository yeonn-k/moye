import React, { useState } from 'react';
import { S } from './Dropdown';

interface DropdownProps {
  options?: string[];
  onSelect?: (selectedItem: string) => void;
  width?: string;
  height?: string;
  setSelected: (selected: string) => void;
}

const Dropdown = ({
  options = ['옵션 1', '옵션 2', '옵션 3'],
  onSelect = async () => {},
  width = '100px',
  height = '30px',
  setSelected,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = async (option: string) => {
    setSelectedItem(option);
    setIsOpen(false);
    setSelected(option);
    await onSelect(option);
  };

  return (
    <S.DropdownContainer open={isOpen} width={width} height={height}>
      <S.DropdownButton onClick={toggleDropdown}>
        {selectedItem}
      </S.DropdownButton>
      {isOpen ? (
        <S.DropdownArrowUp onClick={toggleDropdown} />
      ) : (
        <S.DropdownArrowDown onClick={toggleDropdown} />
      )}
      {isOpen && (
        <S.DropdownList open={isOpen}>
          {options.map((option, index) => (
            <S.DropdownItem
              key={index}
              onClick={() => handleSelect(option)}
              height={height}
            >
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
