function Button({ children, className, ...props }) {
  return (
    <button className={`py-2 font-semibold rounded-lg ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
