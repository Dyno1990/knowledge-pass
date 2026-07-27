import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Sports Certification Platform, you accept and agree to be
                bound by the terms and provision of this agreement. If you do not agree to these
                terms, please do not use this platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Platform</h2>
              <p className="text-gray-700 mb-4">
                The Sports Certification Platform is designed to provide educational content and
                certification programs for sports professionals. Users must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate information when using the platform</li>
                <li>Complete questionnaires honestly and without assistance</li>
                <li>Use certificates only for legitimate professional purposes</li>
                <li>Not share or distribute platform content without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Certification Validity</h2>
              <p className="text-gray-700 mb-4">
                Certificates issued through this platform represent successful completion of the
                questionnaire for the respective module. These certifications are designed for
                educational purposes and professional development.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, including questions, explanations, and platform design, is the property
                of Sports Certification Platform. Users may not reproduce, distribute, or create
                derivative works without explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting user privacy. Any data collected through the platform
                will be used solely for certification purposes and platform improvement. We do not
                sell or share personal information with third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                The Sports Certification Platform and its creators shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from your
                use of or inability to use the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective
                immediately upon posting to the platform. Continued use of the platform after changes
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact</h2>
              <p className="text-gray-700">
                For questions about these terms and conditions, please contact us through our contact
                page or via email at terms@sportscertification.com
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">Last Updated: April 27, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
