'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { Download, X, Link2 } from 'lucide-react'

interface QRCodeModalProps {
  url: string
  onClose: () => void
}

export function QRCodeModal({ url, onClose }: QRCodeModalProps) {
  const download = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'snapurl-qr.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div
      className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-dark-700 rounded-4xl shadow-2xl w-full max-w-xs animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mesh-gradient px-6 pt-6 pb-8 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-lg">QR Code</h3>
          <p className="text-xs text-white/50 mt-1 break-all line-clamp-2">{url}</p>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center gap-5 px-6 py-6 -mt-6">
          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-4">
            <QRCodeCanvas
              id="qr-canvas"
              value={url}
              size={200}
              level="H"
              includeMargin={false}
              fgColor="#09090F"
            />
          </div>

          <button
            onClick={download}
            className="w-full flex items-center justify-center gap-2 py-3 bg-brand-gradient text-white rounded-2xl text-sm font-semibold hover:opacity-90 shadow-glow-sm hover:shadow-glow transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  )
}
