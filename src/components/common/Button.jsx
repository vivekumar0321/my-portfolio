// src/components/common/Button.jsx
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    className = '',
    icon,
    disabled = false,
    ...props
}) => {
    const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

    if (href) {
        if (href.startsWith('#')) {
            return (
                <a href={href} className={classes} {...props}>
                    {icon && <span className="btn-icon">{icon}</span>}
                    {children}
                </a>
            );
        }
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
                {icon && <span className="btn-icon">{icon}</span>}
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;