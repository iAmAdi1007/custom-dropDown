import { useState } from "react";
import useClickOutside from "../custom Hooks/useClickOutside";
import styled from "styled-components";

export default function Dropdown() {
  const [isOpen, setOpen] = useState(false);
  const [selectedInputs, setSelectedInputs] = useState([]);
  const options = ["red", "blue", "orange", "blue"];

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const dropDownRef = useClickOutside(handleOpen);

  const handleAddOption = (event) => {
    event.stopPropagation();
    const value = event.target.innerText;
    if (!value) {
      return;
    }
    setSelectedInputs((prev) => [...prev, value]);
  };

  const handleClearInput = (input) => {
    const inputArray = [...selectedInputs];
    setSelectedInputs(
      inputArray.filter((el) => el.toLowerCase() !== input.toLowerCase())
    );
  };

  return (
    <>
      <SelectDropDown role="select" ref={dropDownRef}>
        <SelectedOptions role="input">
          {selectedInputs.length > 0
            ? selectedInputs.map((input) => (
                <SelectedOption>
                  <div>{input}</div>
                  <div
                    onClick={() => handleClearInput(input)}
                    style={{ cursor: "pointer" }}
                  >
                    x
                  </div>
                </SelectedOption>
              ))
            : ""}
          <DropDownArrow onClick={handleOpen}>
            {!isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            )}
          </DropDownArrow>
        </SelectedOptions>
        {isOpen && (
          <OptionList onClick={handleAddOption}>
            {options.map((option, index) => (
              <SelectOption role="option" key={`${option}&${index}`}>
                {option}
              </SelectOption>
            ))}
          </OptionList>
        )}
      </SelectDropDown>
    </>
  );
}

const SelectDropDown = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectOption = styled.div`
  padding: 5px;

  &:hover {
    cursor: pointer;
    background: gray;
  }
`;

const SelectedOptions = styled.div`
  width: 18.2rem;
  border: 1px solid gray;
  height: 2.5rem;
  border-radius: 8px 8px 5px 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 5px;
  position: relative;
`;

const OptionList = styled.div`
  border: 1px solid transparent;
  box-shadow: 1px 1px 4px lightgray;
`;

const SelectedOption = styled.div`
  display: flex;
  gap: 1.5rem;
  border-radius: 2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid transparent;
  box-shadow: 1px 1px 2px lightgray;
  padding: 0 5px;
`;

const DropDownArrow = styled.span`
  position: absolute;
  cursor: pointer;
  right: 0;
  svg {
    padding-left: 10px;
    width: 35px;
    height: 35px;
    color: black;
    transition: transform 0.5s ease-in-out;
  }
`;
