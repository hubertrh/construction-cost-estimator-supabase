import { ScrollArea } from "@/components/ui/scroll-area";

type QuoteNoteParagraphsProps = {
  text: string;
};

export default function QuoteNoteParagraphs({
  text,
}: QuoteNoteParagraphsProps) {
  let paragraphs = text.split("\n").filter(Boolean);

  return (
    <ScrollArea className="h-max max-h-56 w-full">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mr-2 text-pretty text-xs text-gray-600">
          {paragraph.trim()}
        </p>
      ))}
    </ScrollArea>
  );
}
