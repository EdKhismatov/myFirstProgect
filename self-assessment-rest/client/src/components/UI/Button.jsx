import styles from './Button.module.css';
export default function Button(props) {
  const { onClick, children, title, disabled = false } = props;
  return (
    <button
    {...props}
      className={styles.button}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
