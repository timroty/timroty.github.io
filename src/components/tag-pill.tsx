import { getPillStyle } from "@/lib/pill-styles";

interface Props {
  text: string;
}

export default function TagPill({ text }: Props) {
  return (
    <div
      className={`rounded-sm border px-1 max-w-fit text-xs mt-3 mb-2 mr-2 ${getPillStyle(text)}`}
    >
      {text}
    </div>
  );
}
