type ButtonProps = {
  variant: "blue" | "white" | "gray" | "orange";
  icon?: JSX.Element;
  position?: "left" | "right";
  children: string;
};

export default function ButtonPrimary({
  icon,
  position = "left",
  variant,
  children,
}: ButtonProps) {
  const buttonStyles = {
    blue: "bg-accent-primary text-white",
    white: "bg-white text-accent-primary-dark border border-accent-primary",
    gray: "bg-gray text-white",
    orange: "bg-accent-secondary text-white",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm transition-all duration-300 hover:scale-[102%] hover:shadow-md ${buttonStyles[variant]}`}
    >
      {icon && position === "left" && <span>{icon}</span>}
      {children}
      {icon && position === "right" && <span>{icon}</span>}
    </button>
  );
}
