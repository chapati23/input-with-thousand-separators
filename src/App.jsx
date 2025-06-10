import React, { useState } from 'react';
import './App.css';
import NumericInput from './components/NumericInput';

function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState(1234567.89);
  const [value3, setValue3] = useState('');
  const [selectedLocale, setSelectedLocale] = useState(navigator.language || 'en-US');

  const locales = [
    { code: 'en-US', name: 'English (US) - 1,234.56' },
    { code: 'de-DE', name: 'German - 1.234,56' },
    { code: 'fr-FR', name: 'French - 1 234,56' },
    { code: 'es-ES', name: 'Spanish - 1.234,56' },
    { code: 'en-IN', name: 'English (India) - 12,34,567.89' },
    { code: 'zh-CN', name: 'Chinese - 1,234.56' },
  ];

  return (
    <div className="app">
      <div className="container">
        <h1>Numeric Input with Thousand Separators</h1>
        
        <div className="demo-section">
          <h2>Basic Example</h2>
          <p>Type numbers and see them formatted with thousand separators:</p>
          <NumericInput
            value={value1}
            onChange={setValue1}
            placeholder="Enter a number (e.g., 1000)"
          />
          <p className="value-display">
            Raw value: <code>{value1 === '' ? 'empty' : value1}</code>
          </p>
        </div>

        <div className="demo-section">
          <h2>With Initial Value</h2>
          <p>Pre-populated with a formatted number:</p>
          <NumericInput
            value={value2}
            onChange={setValue2}
            placeholder="Enter a number"
          />
          <p className="value-display">
            Raw value: <code>{value2}</code>
          </p>
        </div>

        <div className="demo-section">
          <h2>Different Locales</h2>
          <p>Select a locale to see different formatting:</p>
          <select 
            value={selectedLocale} 
            onChange={(e) => setSelectedLocale(e.target.value)}
            className="locale-select"
          >
            {locales.map(locale => (
              <option key={locale.code} value={locale.code}>
                {locale.name}
              </option>
            ))}
          </select>
          <NumericInput
            value={value3}
            onChange={setValue3}
            locale={selectedLocale}
            placeholder={`Enter a number (${selectedLocale})`}
          />
          <p className="value-display">
            Raw value: <code>{value3 === '' ? 'empty' : value3}</code>
          </p>
        </div>

        <div className="features">
          <h2>Features</h2>
          <ul>
            <li>✓ Automatic thousand separator formatting based on locale</li>
            <li>✓ Supports decimal numbers</li>
            <li>✓ Supports negative numbers</li>
            <li>✓ Maintains cursor position while typing</li>
            <li>✓ Works with different international number formats</li>
            <li>✓ Returns numeric value to onChange handler</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App; 