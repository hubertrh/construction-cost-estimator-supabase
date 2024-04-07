"use client";

interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  position?: "left" | "right";
  variant?: "primary" | "secondary";
}


const Button: React.FC<ButtonProps> = ({ text, icon, position, variant = "primary" }) => {
  const iconPosition = icon ? position || "left" : null;

  const buttonStyle =
    variant === "primary"
      ? "bg-accent-primary text-white border-none"
      : "bg-white text-accent-primary-dark border border-accent-primary";

  return (
    <button
      className={`inline-flex items-center gap-2 py-2 px-3 cursor-pointer rounded-md ${buttonStyle}`}
    >
      {iconPosition === "left" && icon}
      <span>{text}</span>
      {iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
