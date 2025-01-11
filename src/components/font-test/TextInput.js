export function TextInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="custom-text" className="block text-sm font-medium text-gray-700 mb-2">
        테스트할 텍스트를 입력하세요
      </label>
      <input
        id="custom-text"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="텍스트를 입력하세요..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
} 