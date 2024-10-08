import React, { useState } from 'react';
import { S } from './Dropdown';

const Dropdown = ({
  options = ['옵션 1', '옵션 2', '옵션 3'],
  onSelect = async () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = async (option: string) => {
    onSelect();
    setSelectedItem(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer open={isOpen}>
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
            <S.DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default Dropdown;
