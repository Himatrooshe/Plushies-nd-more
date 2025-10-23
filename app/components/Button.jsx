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
  const baseStyles = "inline-flex items-center justify-center gap-3 font-bold transition-all rounded-full border-2 relative";
  
  const variants = {
    primary: "bg-[#c0424e] text-white border-white hover:bg-[#a0353f] hover:scale-105",
    secondary: "bg-white text-[#c0424e] border-[#c0424e] hover:bg-[#c0424e] hover:text-white hover:scale-105",
    outline: "bg-transparent text-white border-white hover:bg-white hover:text-[#c0424e] hover:scale-105"
  };

  // Layer stroke styles - #D57B65 outer stroke above white border
  const layerStrokeStyles = "before:absolute before:inset-[-4px] before:rounded-full before:border-2 before:border-[#D57B65] before:pointer-events-none";

  const sizes = {
    small: "px-4 py-1.5 text-[13px]",
    medium: "px-6 py-3 text-[15px]",
    large: "px-8 py-4 text-[17px]"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "";

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${layerStrokeStyles} ${disabledStyles} ${className}`;

  const buttonContent = (
    <>
      <span className="tracking-tight capitalize">{children}</span>
      {showArrow && (
        <div className="flex items-center justify-center w-[24px] h-[24px] bg-white rounded-full">
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none"
            className={variant === 'primary' ? 'text-[#c0424e]' : 'text-[#c0424e]'}
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
      <Link href={href} className={buttonClasses}>
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

