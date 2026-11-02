import type { SocialImageModel } from "@/lib/social-image";

interface Props {
  model: SocialImageModel;
}

export default function SocialImage({ model }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgb(243, 240, 232)",
        color: "rgb(32, 36, 31)",
        padding: "68px 76px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "rgb(93, 109, 87)",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 44,
            height: 5,
            display: "flex",
            background: "rgb(102, 119, 95)",
            borderRadius: 999,
          }}
        />
        Writing
      </div>

      <div
        style={{
          maxWidth: 1020,
          display: "flex",
          fontSize: model.fontSize,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.08,
          maxHeight: 330,
          overflow: "hidden",
          wordBreak: "break-all",
        }}
      >
        {model.title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: "2px solid rgb(215, 213, 203)",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", color: "rgb(104, 112, 102)" }}>
          {model.publishDate ?? ""}
        </div>
        <div style={{ display: "flex", fontWeight: 700 }}>Tim Roty</div>
      </div>
    </div>
  );
}
