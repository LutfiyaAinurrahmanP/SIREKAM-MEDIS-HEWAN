import { forwardRef, useState } from "react";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  showShortcut?: boolean;
  shortcut?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal";
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      placeholder = "Search data...",
      value,
      onChange,
      onSubmit,
      onKeyDown,
      className = "",
      inputClassName = "",
      icon,
      disabled = false,
      autoFocus = false,
      size = "md",
      variant = "default",
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const searchValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSubmit?.(searchValue);
      }
      onKeyDown?.(e);
    };

    // Size variants
    const sizeClasses = {
      sm: "h-9 py-2 pl-10 pr-12 text-xs",
      md: "h-11 py-2.5 pl-12 pr-14 text-sm",
      lg: "h-12 py-3 pl-14 pr-16 text-base",
    };

    // Icon size variants
    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    // Icon position variants
    const iconPositions = {
      sm: "left-3",
      md: "left-4",
      lg: "left-5",
    };

    // Variant styles
    const variantClasses = {
      default:
        "rounded-lg border border-gray-200 bg-transparent shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:focus:border-brand-800",
      minimal:
        "rounded-lg border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:bg-white/[0.05] dark:focus:bg-white/[0.08]",
    };

    const defaultIcon = (
      <svg
        className={`fill-gray-500 dark:fill-gray-400 ${iconSizes[size]}`}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
          fill=""
        />
      </svg>
    );

    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="relative">
          <span
            className={`absolute -translate-y-1/2 pointer-events-none top-1/2 ${iconPositions[size]}`}
          >
            {icon || defaultIcon}
          </span>

          <input
            ref={ref}
            type="text"
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            className={`
              ${sizeClasses[size]}
              ${variantClasses[variant]}
              w-full text-gray-800 placeholder:text-gray-400 focus:outline-hidden
              dark:text-white/90 dark:placeholder:text-white/30
              disabled:opacity-50 disabled:cursor-not-allowed
              ${inputClassName}
            `}
          />
        </div>
      </form>
    );
  }
);

Search.displayName = "Search";

export default Search;
