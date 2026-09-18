"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose max-w-none prose-p:leading-8 prose-li:leading-8 prose-img:rounded-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              alt={props.alt ?? ""}
              className="mx-auto h-auto max-w-full md:max-w-3xl rounded-md"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
