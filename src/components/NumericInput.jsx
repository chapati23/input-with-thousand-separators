import React, { useEffect, useRef, useState } from 'react';

const NumericInput = ({ 
  value, 
  onChange, 
  locale = navigator.language || 'en-US',
  placeholder = 'Enter a number',
  className = '',
  ...props 
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [rawValue, setRawValue] = useState('');
  const inputRef = useRef(null);
  const cursorPositionRef = useRef(null);

  // Format number with locale-specific thousand separators
  const formatNumber = (num) => {
    if (!num || num === '') return '';
    
    // Remove any non-numeric characters except decimal point
    const cleanedNum = num.toString().replace(/[^\d.-]/g, '');
    
    if (cleanedNum === '' || cleanedNum === '-') return cleanedNum;
    
    // Split into integer and decimal parts
    const parts = cleanedNum.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Format the integer part with thousand separators
    const numberValue = parseInt(integerPart, 10);
    if (isNaN(numberValue)) return '';
    
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    let formatted = formatter.format(Math.abs(numberValue));
    
    // Add back the negative sign if needed
    if (numberValue < 0 || (integerPart === '-0' || integerPart === '-')) {
      formatted = '-' + formatted;
    }
    
    // Add back the decimal part if it exists
    if (decimalPart !== undefined) {
      // Get the decimal separator for the locale
      const decimalSeparator = (1.1).toLocaleString(locale).charAt(1);
      formatted += decimalSeparator + decimalPart;
    }
    
    return formatted;
  };

  // Parse formatted number back to raw number
  const parseNumber = (formattedNum) => {
    if (!formattedNum) return '';
    
    // Get locale-specific separators
    const thousandSeparator = (1000).toLocaleString(locale).charAt(1);
    const decimalSeparator = (1.1).toLocaleString(locale).charAt(1);
    
    // Replace locale-specific decimal separator with standard dot
    let parsed = formattedNum.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
    
    // Remove thousand separators
    if (thousandSeparator) {
      parsed = parsed.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '');
    }
    
    // Remove any remaining non-numeric characters except dot and minus
    parsed = parsed.replace(/[^\d.-]/g, '');
    
    return parsed;
  };

  // Initialize with external value
  useEffect(() => {
    if (value !== undefined && value !== null) {
      const formatted = formatNumber(value.toString());
      setDisplayValue(formatted);
      setRawValue(value.toString());
    }
  }, [value, locale]);

  // Handle input changes
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    // Store cursor position for restoration
    cursorPositionRef.current = cursorPos;
    
    // Parse the input to get raw number
    const parsed = parseNumber(inputValue);
    
    // Allow empty input
    if (inputValue === '') {
      setDisplayValue('');
      setRawValue('');
      if (onChange) {
        onChange('');
      }
      return;
    }
    
    // Allow minus sign at the beginning
    if (inputValue === '-') {
      setDisplayValue('-');
      setRawValue('-');
      return;
    }
    
    // Format the number
    const formatted = formatNumber(parsed);
    
    // Update state
    setDisplayValue(formatted);
    setRawValue(parsed);
    
    // Call onChange with the raw numeric value
    if (onChange) {
      const numericValue = parseFloat(parsed);
      onChange(isNaN(numericValue) ? parsed : numericValue);
    }
  };

  // Restore cursor position after formatting
  useEffect(() => {
    if (cursorPositionRef.current !== null && inputRef.current) {
      // Calculate the new cursor position based on the formatted value
      const oldLength = rawValue.length;
      const newLength = displayValue.length;
      const lengthDiff = newLength - oldLength;
      
      let newPosition = cursorPositionRef.current;
      
      // Adjust cursor position based on added/removed separators
      if (lengthDiff > 0) {
        // Separators were added
        const beforeCursor = rawValue.substring(0, cursorPositionRef.current);
        const formattedBeforeCursor = formatNumber(beforeCursor);
        newPosition = formattedBeforeCursor.length;
      }
      
      // Set the cursor position
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newPosition, newPosition);
        }
      });
      
      cursorPositionRef.current = null;
    }
  }, [displayValue]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={`numeric-input ${className}`}
      {...props}
    />
  );
};

export default NumericInput; 