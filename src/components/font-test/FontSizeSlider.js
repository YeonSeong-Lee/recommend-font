export function FontSizeSlider({ value, onChange }) {
  return (
    <div>
      <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 mb-2">
        폰트 크기: {value}px
      </label>
      <input
        id="font-size"
        type="range"
        min="12"
        max="72"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
} 