import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          </div>

          <p className="text-gray-700 text-lg mb-8">
            Have questions about our certification programs? We're here to help! Reach out to us
            through any of the methods below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">info@sportscertification.com</p>
              <p className="text-gray-700">support@sportscertification.com</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-700">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-600 mt-2">Mon-Fri, 9AM-5PM EST</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700">123 Sports Avenue</p>
              <p className="text-gray-700">Athletic City, AC 12345</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Inquiry about certification program"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How long does it take to complete a certification?
                </h3>
                <p className="text-gray-700">
                  Each certification consists of 10 questions and can typically be completed in 20-30
                  minutes, depending on your pace and the time spent reviewing explanations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are the certifications recognized professionally?
                </h3>
                <p className="text-gray-700">
                  Our certifications are designed for professional development and educational
                  purposes. They demonstrate your knowledge and commitment to sports professionalism.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I retake a certification?</h3>
                <p className="text-gray-700">
                  Yes! You can retake any certification program at any time to refresh your knowledge
                  or improve your understanding.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Will you add more certification programs?
                </h3>
                <p className="text-gray-700">
                  Absolutely! We're continuously developing new certification programs for additional
                  sports roles and specializations. Stay tuned for updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
