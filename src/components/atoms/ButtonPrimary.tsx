import Image, { StaticImageData } from "next/image";

type ButtonProps = {
  variant: "blue" | "white" | "gray" | "orange";
  icon?: StaticImageData;
  size?: number;
  alt?: string;
  position?: "left" | "right";
  children: string;
  onClick?: () => void;
};

export default function ButtonPrimary({
  variant,
  icon,
  size = 16,
  alt = "",
  position = "left",
  children,
  onClick,
}: ButtonProps) {
  const buttonStyles = {
    blue: "bg-accent-primary text-white",
    white: "bg-white text-accent-primary-dark border border-light",
    gray: "bg-gray text-white",
    orange: "bg-accent-secondary text-white",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-5 py-2 text-sm transition-all duration-300 hover:scale-[102%] hover:shadow-md ${buttonStyles[variant]}`}
      onClick={onClick}
    >
      {icon && position === "left" && (
        <span>
          <Image src={icon} width={size} height={size} alt={alt} />
        </span>
      )}
      {children}
      {icon && position === "right" && (
        <span>
          <Image src={icon} width={size} height={size} alt={alt} />
        </span>
      )}
    </button>
  );
}
