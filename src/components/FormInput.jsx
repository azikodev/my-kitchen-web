function FormInput({ name, label, type, placeholder, className, min, value, onClick, onChange, rows, cols }) {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text capitalizegit ad">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
        min={min}
        // required
        value={value}
        onClick={onClick}
        onChange={onChange}
        aria-rowspan={rows}
        aria-colspan={cols}
      />
    </label>
  );
}

export default FormInput;