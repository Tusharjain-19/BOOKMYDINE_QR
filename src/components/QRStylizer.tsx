"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";

interface QRStylizerProps {
  value: string;
  logoUrl?: string;
  brandColor?: string;
  accentColor?: string;
  dotStyle?: "square" | "rounded" | "dots";
  cornerStyle?: "square" | "rounded" | "classy";
  frameType?: "none" | "banner" | "table-tent";
  frameText?: string;
  tableNumber?: string;
}

export default function QRStylizer({
  value,
  logoUrl,
  brandColor = "#2563EB",
  accentColor = "#F59E0B",
  dotStyle = "square",
  cornerStyle = "square",
  frameType = "none",
  frameText = "SCAN TO VIEW MENU",
  tableNumber = "",
}: QRStylizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!value) return;

    QRCode.toDataURL(
      value,
      {
        width: 300,
        margin: 2,
        color: {
          dark: brandColor || "#000000",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H",
      },
      (err, url) => {
        if (err) {
          console.error("Failed to generate QR code", err);
          return;
        }
        setQrDataUrl(url);
      }
    );
  }, [value, brandColor]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `menu-qr-${tableNumber ? `table-${tableNumber}` : "stand"}.png`;
    a.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-3xl w-full max-w-md shadow-sm">
      {/* Frame Preview Container */}
      <div
        className={`w-full flex flex-col items-center justify-center transition-all p-6 rounded-2xl bg-white border border-slate-100 shadow-md ${
          frameType === "table-tent"
            ? "border-t-8"
            : ""
        }`}
        style={{
          borderTopColor: frameType === "table-tent" ? brandColor : undefined,
        }}
      >
        {/* Table Tent Header */}
        {frameType === "table-tent" && (
          <div className="text-center mb-4 space-y-1">
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: brandColor }}
            >
              {tableNumber ? `Table #${tableNumber}` : "Reserved Table"}
            </span>
            <h4 className="text-lg font-black text-slate-900 mt-2">
              {frameText || "SCAN FOR DIGITAL MENU"}
            </h4>
          </div>
        )}

        {/* Banner Strip Header */}
        {frameType === "banner" && (
          <div
            className="w-full py-2 text-center text-xs font-black uppercase text-white rounded-lg mb-4 shadow-xs"
            style={{ backgroundColor: brandColor }}
          >
            {frameText || "SCAN TO VIEW MENU"}
          </div>
        )}

        {/* QR Code Canvas / Image Display */}
        <div className="relative p-4 bg-white rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code"
              className={`w-48 h-48 object-contain transition-all ${
                dotStyle === "rounded"
                  ? "rounded-2xl"
                  : dotStyle === "dots"
                  ? "rounded-3xl p-1"
                  : ""
              }`}
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-slate-400">
              <QrCode className="h-12 w-12 animate-pulse" />
            </div>
          )}

          {logoUrl && qrDataUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full p-1 border border-slate-200 shadow-md flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Banner Strip Footer */}
        {frameType === "banner" && (
          <p className="text-[10px] text-slate-400 font-semibold mt-3">
            Powered by BookMyDine
          </p>
        )}
      </div>

      {/* Action Download Button */}
      <button
        onClick={handleDownload}
        disabled={!qrDataUrl}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
      >
        <Download className="h-4 w-4 text-emerald-400" />
        <span>Download QR Code Image</span>
      </button>
    </div>
  );
}
