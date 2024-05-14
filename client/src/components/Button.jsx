function Button({ children, onClick, className, ...props }) {
  return (
    <button
      className={`py-2 font-semibold rounded-lg ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
