import {Link} from 'react-router';

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  showArrow = true,
  disabled = false,
  className = '',
  type = 'button'
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 sm:gap-3 font-bold transition-all rounded-2xl border-2 relative";
  
  const variants = {
    primary: "bg-[#ff7380] text-white border-[#ff7380] hover:bg-[#ff5c6c] hover:border-[#ff5c6c] hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-[#c0424e] border-[#c0424e] hover:bg-[#c0424e] hover:text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl",
    outline: "bg-transparent text-white border-white hover:bg-white hover:text-[#c0424e] hover:scale-105 active:scale-95"
  };

  const sizes = {
    small: "px-3 py-2 text-xs sm:text-sm",
    medium: "px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base",
    large: "px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "";

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  const buttonContent = (
    <>
      <span className="tracking-tight capitalize">{children}</span>
      {showArrow && (
        <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full">
          <svg 
            width="10" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="none"
            className={variant === 'primary' ? 'text-[#ff7380]' : 'text-[#c0424e]'}
          >
            <path 
              d="M7 17L17 7M17 7H7M17 7V17" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </>
  );

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link to={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {buttonContent}
    </button>
  );
}
