import { MessageCircle, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {/* WhatsApp Contact */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="text-gray-700">WhatsApp us on</span>
            <a
              href="https://wa.me/919773603818"
              className="text-blue-500 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91-9773603818
            </a>
          </div>

          {/* Email Contact */}
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Email us on</span>
            <a href="mailto:dummy@gmail.com" className="text-cyan-500 hover:text-cyan-600 transition-colors">
              dummy@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
