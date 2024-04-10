type ButtonProps = {
  variant: "blue" | "gray" | "red";
  icon?: JSX.Element;
  position?: "left" | "right";
  children: string;
};

export default function ButtonSecondary({
  icon,
  position = "left",
  variant,
  children,
}: ButtonProps) {
  const buttonStyles = {
    blue: "text-accent-primary",
    gray: "text-gray",
    red: "text-red",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm transition-all duration-300 hover:scale-105 ${buttonStyles[variant]}`}
    >
      {icon && position === "left" && <span>{icon}</span>}
      {children}
      {icon && position === "right" && <span>{icon}</span>}
    </button>
  );
}
