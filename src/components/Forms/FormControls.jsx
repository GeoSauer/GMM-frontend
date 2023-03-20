import classnames from 'classnames';

export default function FormControls({
  label,
  required,
  children,
}) {
  const className = classnames(
    styles.formControl,
    styles.labelText
  );
  return (
    <label className={className}>
      <LabelText text={label} required={required} />
      {children}
    </label>
  );
}

export function LabelText({ text, required }) {
  const className = classnames(styles.labelText, {
    [styles.Required]: required,
  });
  return <span className={className}>{text}</span>;
}

export function InputControl({ label, required, ...rest }) {
  return (
    <FormControls label={label} required={required}>
      <input {...rest} required={required} />
    </FormControls>
  );
}
