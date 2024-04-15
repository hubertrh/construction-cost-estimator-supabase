type DividerProps = {
  color?: "light" | "dark";
};

export default function Divider({ color = "dark" }: DividerProps) {
  if (color === "dark") {
    return <div className="my-5 h-px w-full bg-background-dark" />;
  }

  return <div className="my-5 h-px w-full bg-background-light" />;
}
