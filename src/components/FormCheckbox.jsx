function FormCheckbox() {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Completed</span>
        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" name="completed" />
      </label>
    </div>
  );
}

export default FormCheckbox;
