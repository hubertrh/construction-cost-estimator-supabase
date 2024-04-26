import { ScrollArea } from "@/components/ui/scroll-area";

type QuoteNoteParagraphsProps = {
  text: string;
  variant: "measurement" | "included" | "excluded";
};

export default function QuoteNoteParagraphs({
  text,
  variant,
}: QuoteNoteParagraphsProps) {
  const regex = variant === "measurement" ? /(C\d+ )/ : /(\d+ )/;

  console.log(text);
  console.log(typeof text);

  let paragraphs = text.split(regex).filter(Boolean);
  let htmlParagraphs: string[] = [];
  let includeNext = false;

  for (let part of paragraphs) {
    // Check if the current part matches the 'C[number] ' pattern
    if (regex.test(part)) {
      // If the next part needs this as prefix, remember it
      includeNext = true;
    } else {
      // If this is part of the text, prepend the last seen 'C[number] ' if needed
      if (includeNext) {
        part = paragraphs[paragraphs.indexOf(part) - 1] + part;
        includeNext = false; // Reset the flag after using it
      }
      // Wrap the text in <p> tags and add to the array
      htmlParagraphs.push(part.trim());
    }
  }

  return (
    <ScrollArea className="h-56 w-full">
      {htmlParagraphs.map((paragraph, index) => (
        <p key={index} className="mr-2 text-pretty text-xs text-gray-600">
          {paragraph}
        </p>
      ))}
    </ScrollArea>
  );
}
