# Numeric Input with Thousand Separators

A React component that automatically formats numbers with thousand separators based on the user's locale. When you type "100", it stays as "100", but when you type "1000", it automatically formats to "1,000" (or the appropriate format for your locale).

## Demo

![Numeric Input Demo](https://via.placeholder.com/800x400/f0f0f0/333333?text=Numeric+Input+Demo)

## Features

- ✨ **Automatic Formatting**: Numbers are formatted with thousand separators as you type
- 🌍 **Locale Support**: Respects different international number formats
- 🎯 **Smart Cursor Positioning**: Maintains correct cursor position during formatting
- 🔢 **Full Number Support**: Handles decimals, negative numbers, and empty values
- 🎨 **Customizable**: Supports custom styling and all standard input props
- ⚡ **Lightweight**: No external dependencies beyond React

## Installation

### Running the Demo

1. Clone this repository:

```bash
git clone <your-repo-url>
cd input-with-thousand-separators
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Using the Component

To use the `NumericInput` component in your own project, copy the `src/components/NumericInput.jsx` file to your project.

## Usage

### Basic Example

```jsx
import React, { useState } from 'react';
import NumericInput from './components/NumericInput';

function MyForm() {
  const [amount, setAmount] = useState('');

  return (
    <NumericInput
      value={amount}
      onChange={setAmount}
      placeholder="Enter amount"
    />
  );
}
```

### With Custom Locale

```jsx
<NumericInput
  value={value}
  onChange={setValue}
  locale="de-DE" // German: 1.234,56
/>
```

### With Initial Value

```jsx
const [value, setValue] = useState(1234567.89);

<NumericInput
  value={value}
  onChange={setValue}
/>
// Displays: 1,234,567.89
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | `''` | The numeric value to display |
| `onChange` | `function` | - | Callback function that receives the numeric value |
| `locale` | `string` | `navigator.language` | Locale string for formatting (e.g., 'en-US', 'de-DE') |
| `placeholder` | `string` | `'Enter a number'` | Placeholder text |
| `className` | `string` | `''` | Additional CSS classes |
| `...props` | `object` | - | Any other valid input props |

### onChange Callback

The `onChange` callback receives the raw numeric value, not the formatted string:

```jsx
<NumericInput
  value={value}
  onChange={(numericValue) => {
    console.log(numericValue); // 1234.56 (number)
    console.log(typeof numericValue); // "number"
  }}
/>
```

## Supported Locales

The component uses the browser's `Intl.NumberFormat` API, which supports many locales:

- **English (US)**: `en-US` → 1,234.56
- **German**: `de-DE` → 1.234,56
- **French**: `fr-FR` → 1 234,56
- **Spanish**: `es-ES` → 1.234,56
- **English (India)**: `en-IN` → 12,34,567.89
- **Chinese**: `zh-CN` → 1,234.56
- And many more...

## Examples

### Form Integration

```jsx
function PaymentForm() {
  const [formData, setFormData] = useState({
    amount: '',
    description: ''
  });

  const handleAmountChange = (value) => {
    setFormData(prev => ({ ...prev, amount: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Amount:', formData.amount); // Raw numeric value
  };

  return (
    <form onSubmit={handleSubmit}>
      <NumericInput
        value={formData.amount}
        onChange={handleAmountChange}
        placeholder="Enter payment amount"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### With Validation

```jsx
function ValidatedInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (numericValue) => {
    setValue(numericValue);
    
    if (numericValue && numericValue < 100) {
      setError('Minimum amount is 100');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <NumericInput
        value={value}
        onChange={handleChange}
        style={{ borderColor: error ? 'red' : undefined }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### Currency Input

```jsx
function CurrencyInput({ currency = 'USD' }) {
  const [amount, setAmount] = useState('');

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>{currency} </span>
      <NumericInput
        value={amount}
        onChange={setAmount}
        placeholder="0.00"
        style={{ marginLeft: '8px' }}
      />
    </div>
  );
}
```

## Browser Support

This component works in all modern browsers that support:

- ES6+ JavaScript
- `Intl.NumberFormat` API

## Development

### Project Structure

```
├── src/
│   ├── components/
│   │   └── NumericInput.jsx    # Main component
│   ├── App.jsx                 # Demo application
│   ├── App.css                 # Demo styles
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Uses the native [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API
