export const AdBox = ({ title = "AD" }: { title?: string }) => {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px dashed #374151",
        borderRadius: 8,
        padding: "12px 16px",
        color: "#9ca3af",
        fontSize: "0.8rem",
        textAlign: "center",
      }}
    >
      {title}
      <div style={{ fontSize: "0.7rem" }}>（広告が入ります）</div>
    </div>
  );
};
