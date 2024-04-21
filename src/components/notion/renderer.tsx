import Image from "next/image";
import Text from "./text";

export function renderBlock(block: any) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p className="text-md my-3">
          <Text value={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1 className="text-4xl font-bold my-4">
          <Text value={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-2xl font-bold my-4">
          <Text value={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-xl font-bold my-3">
          <Text value={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return (
        <ul className="list-disc pl-6">
          {value.children.map((child: any) => renderBlock(child))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="list-decimal pl-6">
          {value.children.map((child: any) => renderBlock(child))}
        </ol>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <Text value={value.rich_text} />
          {value.children && renderNestedList(block)}
        </li>
      );
    case "divider":
      return <hr key={id} />;
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure className="flex flex-col justify-center items-center my-5">
          <Image src={src} alt={caption} className="max-h-96" />
          {caption && (
            <figcaption className="text-xs mt-2">{caption}</figcaption>
          )}
        </figure>
      );
    }
    case "table": {
      return (
        <div className="overflow-x-auto">
          <table className="table-auto border">
            <tbody>
              {block.children?.map((child: any, index: any) => {
                const RowElement =
                  value.has_column_header && index === 0 ? "th" : "td";
                return (
                  <tr key={child.id}>
                    {child.table_row?.cells?.map((cell: any, i: number) => (
                      <RowElement
                        className="border px-3 py-1.5"
                        key={`${cell.plain_text}-${i}`}
                      >
                        <Text value={cell} />
                      </RowElement>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
}

export function renderNestedList(blocks: any) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return <ol>{value.children.map((block: any) => renderBlock(block))}</ol>;
  }

  return <ul>{value.children.map((block: any) => renderBlock(block))}</ul>;
}
