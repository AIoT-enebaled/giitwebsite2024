import React from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Smartphone, 
  Clock,
  CreditCard
} from 'lucide-react';

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative bg-dark-light rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 opacity-0 scale-90 animate-[fadeInScale_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors duration-300 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-400 mb-4">Payment Methods & Contact</h2>
          <p className="text-gray-300 text-lg">Choose your preferred payment method and get in touch with us</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mobile Money Section */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Smartphone className="h-8 w-8 text-green-500" />
                <h3 className="text-2xl font-semibold text-white">Mobile Money</h3>
              </div>
              <p className="text-gray-400">Fast, secure, and convenient payments</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 p-6 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">MTN</span>
                  </div>
                  <h4 className="font-semibold text-green-400 text-lg">MTN Mobile Money</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300"><strong>Number:</strong> +256791418501</p>
                  <p className="text-gray-400 text-sm">Quick and secure payments 24/7</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 p-6 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">AIR</span>
                  </div>
                  <h4 className="font-semibold text-red-400 text-lg">Airtel Money</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300"><strong>Merchant Code:</strong> 6708507</p>
                  <p className="text-gray-300"><strong>Direct Number:</strong> +256752067815</p>
                  <p className="text-gray-400 text-sm">Dual options for maximum flexibility</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
              <h5 className="font-semibold text-blue-400 mb-2">Payment Instructions</h5>
              <ol className="space-y-1 text-gray-300 text-sm">
                <li>1. Dial *165# (MTN) or *185# (Airtel)</li>
                <li>2. Select "Send Money" option</li>
                <li>3. Enter the number/merchant code</li>
                <li>4. Enter amount and confirm</li>
                <li>5. Send confirmation SMS to +256752067815</li>
              </ol>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Phone className="h-8 w-8 text-indigo-500" />
                <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
              </div>
              <p className="text-gray-400">Get in touch with our enrollment team</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-white font-medium">Primary Contact</p>
                  <p className="text-gray-300">+256752-067-815</p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300">geniusinstitute2024@gmail.com</p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg flex items-center gap-3">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-300">Kampala, Uganda</p>
                </div>
              </div>

              <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-indigo-400" />
                  <h4 className="font-semibold text-indigo-400">Office Hours</h4>
                </div>
                <div className="space-y-1 text-gray-300 text-sm">
                  <p><strong>Monday-Friday:</strong> 8:00 AM - 6:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
              <h5 className="font-semibold text-yellow-400 mb-2">Quick Enrollment Steps</h5>
              <ol className="space-y-1 text-gray-300 text-sm">
                <li>1. Choose your payment method above</li>
                <li>2. Make payment for your selected course</li>
                <li>3. Call or WhatsApp us with payment confirmation</li>
                <li>4. Receive enrollment confirmation within 2 hours</li>
                <li>5. Start your learning journey immediately!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/20">
          <h4 className="text-xl font-bold text-white mb-2">Ready to Start Learning?</h4>
          <p className="text-gray-300 mb-4">
            Choose your payment method and contact us today to begin your technology education journey!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+256752067815"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a 
              href="https://wa.me/256752067815"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Smartphone className="h-4 w-4" />
              WhatsApp
            </a>
            <a 
              href="mailto:geniusinstitute2024@gmail.com"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsModal;
