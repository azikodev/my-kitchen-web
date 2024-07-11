function FormInput({ name, label, type, placeholder, className, min, value, size, status, onInput, required }) {
  return (
    <label className="form-control w-full  ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        min={min}
        value={value}
        className={`h-11 input input-bordered w-full  ${size ? size : "max-w-[255px]"} `}
        onInput={onInput}
        required={required}
      />
    </label>
  );
}

export default FormInput;