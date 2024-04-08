import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBase64ImagePrefix(base64: string): string {
  const prefix: { [key: string]: string } = {
    "/9j/": "data:image/jpeg;base64,", // JPEG
    iVBORw: "data:image/png;base64,", // PNG
    R0lGOD: "data:image/gif;base64,", // GIF
    UklGRg: "data:image/webp;base64,", // WebP
    Qk02U: "data:image/bmp;base64,", // BMP
    yvJG0: "data:image/tiff;base64,", // TIFF
    AAAOB: "data:image/ico;base64,", // ICO
    SUkqA: "data:image/svg+xml;base64,", // SVG
  };

  for (let key in prefix) {
    if (base64.startsWith(key)) {
      return prefix[key];
    }
  }

  return "";
}

export function getFileInfoFromBase64(base64: string) {
  // 获取文件大小
  const length = base64.length;
  const size = (length - 814) / 1.37;
  const fileSize = (size / 1024).toFixed(2) + " KB";

  // 获取MIME类型
  const mimeType = base64.match(
    /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
  )?.[1];

  // 获取文件扩展名
  const extension = mimeType?.split("/")[1];

  return {
    size: fileSize,
    mimeType: mimeType || "",
    extension: extension || "",
  };
}
