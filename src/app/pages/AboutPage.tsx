import { Info, Award, Target, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                The Sports Certification Platform is dedicated to advancing sports professionalism
                through accessible, comprehensive, and high-quality certification programs. We believe
                that every sports professional deserves the opportunity to validate their knowledge,
                enhance their skills, and advance their careers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <Award className="w-10 h-10 text-blue-600 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Professional Certifications
                  </h3>
                  <p className="text-gray-700">
                    Comprehensive certification programs across five key sports roles, with the
                    flexibility to expand to additional specializations.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <Target className="w-10 h-10 text-green-600 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Expert-Designed Content
                  </h3>
                  <p className="text-gray-700">
                    Questions and explanations developed by experienced sports professionals to ensure
                    practical, real-world relevance.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <Sparkles className="w-10 h-10 text-purple-600 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Interactive Learning
                  </h3>
                  <p className="text-gray-700">
                    Detailed feedback for every answer helps reinforce learning and provides guidance
                    for improvement.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <Users className="w-10 h-10 text-orange-600 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Community Growth
                  </h3>
                  <p className="text-gray-700">
                    Join a growing community of certified sports professionals committed to excellence
                    and continuous improvement.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Programs</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Sports Coach Certification</h3>
                  <p className="text-gray-700">
                    For professionals focused on athlete development, team management, and coaching
                    excellence.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Sports Referee Certification</h3>
                  <p className="text-gray-700">
                    For officials committed to fair play, rule enforcement, and game management.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Athletic Trainer Certification</h3>
                  <p className="text-gray-700">
                    For sports medicine professionals specializing in injury prevention, treatment, and
                    rehabilitation.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Sports Manager Certification</h3>
                  <p className="text-gray-700">
                    For administrators handling facility management, event planning, and sports
                    operations.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Sports Analyst Certification</h3>
                  <p className="text-gray-700">
                    For data professionals using analytics to inform decisions and improve performance.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>
                    <strong>Flexible and Accessible:</strong> Complete certifications at your own
                    pace, anytime, anywhere.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>
                    <strong>Immediate Feedback:</strong> Learn from detailed explanations for every
                    question.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>
                    <strong>Expandable Platform:</strong> New roles and specializations are regularly
                    added.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span>
                    <strong>Professional Recognition:</strong> Certificates to showcase your
                    expertise and commitment.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Us Today</h2>
              <p className="text-gray-700 mb-4">
                Whether you're just starting your career in sports or looking to validate years of
                experience, our certification programs provide the recognition and knowledge you need
                to succeed. Start your certification journey today and join thousands of sports
                professionals advancing their careers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
