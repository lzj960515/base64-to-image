"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getBase64ImagePrefix, getFileInfoFromBase64 } from "@/lib/utils";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

export default function Home() {
  const [base64, setBase64] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [fileInfo, setFileInfo] = useState({
    mimeType: "",
    extension: "",
    size: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (base64) {
      const img = new window.Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        const info = getFileInfoFromBase64(base64);
        setFileInfo(info);
      };
      img.src = base64;
    }
  }, [base64]);

  return (
    <main className="flex flex-col items-start justify-start w-2/3 gap-2 p-24">
      <h1 style={{ fontSize: "2em" }}>Base64 to Image</h1>
      <Textarea
        id="base64Str"
        ref={textareaRef}
        placeholder="Type your base64 here."
      />
      <Button
        onClick={() => {
          const base64Value = textareaRef.current?.value || "";
          const prefix = getBase64ImagePrefix(base64Value);
          setBase64(`${prefix}${base64Value}`);
        }}
      >
        Decode Base64 to Image
      </Button>
      {base64 && (
        <>
          <Image
            src={base64}
            alt="base64 to image"
            width={imageSize.width}
            height={imageSize.height}
          />
          <div>
            <h2>
              <strong>File Info</strong>
            </h2>
            <p>
              Resolution: {imageSize.width}×{imageSize.height}
            </p>
            <p>MIME type: {fileInfo.mimeType}</p>
            <p>Extension: {fileInfo.extension}</p>
            <p>Size: {fileInfo.size}</p>
            <p>
              Download:{" "}
              <a
                href={base64}
                download="image.png"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                image.{fileInfo.extension}
              </a>
            </p>
          </div>
        </>
      )}
    </main>
  );
}
