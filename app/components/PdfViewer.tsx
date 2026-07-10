import { useEffect, useState } from "react";

export function PdfViewer({ dataUrl, style, className }: { dataUrl: string; style?: React.CSSProperties; className?: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let activeUrl: string | null = null;
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        activeUrl = URL.createObjectURL(blob);
        setBlobUrl(activeUrl);
      });
    return () => {
      if (activeUrl) URL.revokeObjectURL(activeUrl);
    };
  }, [dataUrl]);

  if (!blobUrl) return <div style={{ fontSize: "10px", color: "#64748b", ...style }} className={className}>Loading PDF...</div>;

  return (
    <iframe src={`${blobUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} style={{ border: "none", ...style }} className={className} title="PDF Viewer" />
  );
}
