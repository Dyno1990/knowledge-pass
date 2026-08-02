import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Purpose and Scope",
    content: "This Digital Educational Modules have been developed with the financial support of the European Commission. Its primary purpose is to support the objectives defined within the framework of “Working Together – Succeeding Better” project, focusing on transnational collaboration on education for all relevant athletics stakeholders.",
  },
  {
    title: "2. Permitted Use",
    content: "Use of the content – whether in whole or in part – is strictly limited to activities that directly contribute to the realization of the project’s objectives. Any other use, including but not limited to commercial exploitation, adaptation, reproduction, distribution, or derivative works, is prohibited unless explicitly authorized in writing by the Project Coordinator.",
  },
  {
    title: "3. Intellectual Property and Attribution",
    content: "All materials, including textual content, graphics, concepts, and structure of the modules, remain the intellectual property of the Project Consortium. Proper attribution to the project and acknowledgment of the European Commission’s support must be maintained in all permitted uses.",
  },
  {
    title: "4. Unauthorized Use and Liability",
    content: "Any unauthorized use of the content, concept, or module – whether partial or in full – without the explicit consent of the Project Consortium, may result in the user being held accountable before the European Commission and other relevant authorities. This includes violations involving misrepresentation, misuse, or redistribution.",
  },
  {
    title: "5. Modifications and Updates",
    content: "The Project Consortium reserves the right to modify or update the module and its terms of use at any time without prior notice. Users are encouraged to refer to the latest version of these Terms & Conditions prior to use.",
  },
  {
    title: "6. Disclaimer",
    content: "While every effort has been made to ensure the accuracy and relevance of the content, the Project Consortium assumes no liability for any errors, omissions, or interpretations made by third parties. Users are responsible for ensuring their use of the module aligns with applicable local and international laws and policies.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>

          <div className="prose max-w-none">
            {sections.map((section) => (
              <section key={section.title} className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-700 leading-7">{section.content}</p>
              </section>
            ))}

            <div className="mt-10 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg p-6">
              <p className="text-gray-800 leading-7 font-medium">
                Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
