import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  QrCode as QrIcon, 
  Download, 
  Copy, 
  Check, 
  Globe, 
  FileJson, 
  ShieldCheck,
  RefreshCw,
  FileCode
} from 'lucide-react';
import type { MenuData } from '../../types/menu';
import { generateSignedToken, getSignedMenuUrl } from '../../lib/tokenGenerator';
import { downloadStandaloneHtmlFile, downloadPackageFiles } from '../../lib/htmlGenerator';

interface QrExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuData;
  token?: string;
  onRotateToken?: () => Promise<string>;
  onExportJson: () => void;
}

export const QrExportModal: React.FC<QrExportModalProps> = ({
  isOpen,
  onClose,
  menuData,
  token: initialToken,
  onRotateToken,
  onExportJson,
}) => {
  const [activeToken, setActiveToken] = useState<string>(initialToken || generateSignedToken());
  const [baseUrl, setBaseUrl] = useState<string>('https://bookmydineqr.vercel.app');
  const [signedUrl, setSignedUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (initialToken) {
      setActiveToken(initialToken);
    }
  }, [initialToken]);

  useEffect(() => {
    const url = getSignedMenuUrl(menuData.slug, activeToken, baseUrl);
    setSignedUrl(url);
  }, [menuData.slug, activeToken, baseUrl]);

  useEffect(() => {
    if (isOpen && signedUrl) {
      generateQrCode();
    }
  }, [isOpen, signedUrl, menuData.theme.primaryColor, menuData.theme.bgColor]);

  const generateQrCode = async () => {
    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, signedUrl, {
          width: 320,
          margin: 2,
          color: {
            dark: menuData.theme.primaryColor || '#000000',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'H',
        });
        setQrDataUrl(canvasRef.current.toDataURL('image/png'));
      }
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-${menuData.slug || 'menu'}.png`;
    link.click();
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(signedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRotate = async () => {
    if (onRotateToken) {
      const newToken = await onRotateToken();
      setActiveToken(newToken);
    } else {
      setActiveToken(generateSignedToken());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn text-slate-900">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700 rounded-xl text-white shadow-sm">
              <QrIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Token QR Security Suite & Export</h2>
              <p className="text-xs text-slate-500">Generate tokenized QR codes & production HTML packages</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-stone-200/60 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Left Column: QR Code Canvas & Downloads */}
            <div className="flex flex-col items-center justify-center bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="p-4 bg-white rounded-2xl shadow-md border border-stone-200 flex items-center justify-center relative">
                <canvas ref={canvasRef} className="w-56 h-56 rounded-lg" />
              </div>

              <div className="w-full space-y-2">
                <button
                  onClick={handleDownloadQr}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> Download QR Code Image (PNG)
                </button>

                <button
                  onClick={() => downloadStandaloneHtmlFile(menuData)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <FileCode className="w-4 h-4 text-emerald-400" /> Export Production index.html
                </button>
              </div>
            </div>

            {/* Right Column: Security Token & Signed URL Details */}
            <div className="space-y-4">
              
              {/* Base Domain Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-700" />
                  Production Domain Base URL:
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://bookmyslot.in"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>

              {/* Signed URL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Secure Signed QR URL (Token Protected):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={signedUrl}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="p-2 bg-white hover:bg-stone-100 text-slate-700 rounded-xl text-xs font-bold border border-stone-200 shadow-sm shrink-0"
                    title="Copy URL"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 64-char Signed Token Details & Rotation */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" /> 64-Char Crypto Signed Token:
                  </span>
                  <button
                    onClick={handleRotate}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-sm"
                    title="Rotate Token & Invalidate Legacy Links"
                  >
                    <RefreshCw className="w-3 h-3 text-emerald-700" /> Rotate Token
                  </button>
                </div>
                <p className="text-[10px] font-mono bg-white p-2 rounded-lg border border-emerald-200 break-all text-slate-800">
                  {activeToken}
                </p>
                <p className="text-[10px] text-emerald-800">
                  🔒 Direct URL access without this token returns <code className="font-bold">403 Forbidden</code>.
                </p>
              </div>

              {/* Download Package Action Box */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-emerald-700" /> Export Complete Production Package:
                </div>
                <p className="text-[11px] text-slate-600">
                  Generates standalone HTML5 file, CSS theme stylesheet, vanilla JS interactive engine, and Schema.org JSON-LD data.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => downloadPackageFiles(menuData)}
                    className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download All Files
                  </button>

                  <button
                    onClick={onExportJson}
                    className="py-2 px-3 bg-white hover:bg-stone-100 text-slate-800 border border-stone-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <FileJson className="w-3.5 h-3.5 text-slate-600" /> JSON
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-stone-100 text-slate-700 border border-stone-200 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Close Suite
          </button>
        </div>

      </div>
    </div>
  );
};
