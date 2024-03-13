import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  value: TextRichTextItemResponse[];
}

export default function Text({ value }: Props) {
  if (!value) {
    return null;
  }

  return value.map((value: TextRichTextItemResponse) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    return (
      <span
        className={[
          bold ? "font-bold" : "",
          code
            ? "font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.25 rounded-sm"
            : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline" : "",
          text.link ? "italic underline" : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
}
