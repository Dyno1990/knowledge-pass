import {
  Award,
  Building2,
  CheckCircle2,
  Dumbbell,
  Flag,
  HeartHandshake,
  Leaf,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const audiences = [
  { name: "e-Athlete", icon: Dumbbell, color: "text-blue-600", background: "bg-blue-50" },
  { name: "e-Coach", icon: Award, color: "text-green-600", background: "bg-green-50" },
  { name: "e-Referee", icon: Flag, color: "text-red-600", background: "bg-red-50" },
  { name: "e-Volunteer", icon: HeartHandshake, color: "text-purple-600", background: "bg-purple-50" },
  { name: "e-Administrator", icon: Building2, color: "text-orange-600", background: "bg-orange-50" },
];

const pillars = [
  {
    title: "Good Governance",
    icon: Scale,
    accent: "text-blue-700",
    background: "bg-blue-50",
    border: "border-blue-200",
    description: "Transparent, accountable and ethical leadership across athletic organisations.",
  },
  {
    title: "Human Rights & Integrity",
    icon: ShieldCheck,
    accent: "text-purple-700",
    background: "bg-purple-50",
    border: "border-purple-200",
    description: "Respect, safeguarding, equality, inclusion and integrity throughout athletics.",
  },
  {
    title: "Sustainability",
    icon: Leaf,
    accent: "text-green-700",
    background: "bg-green-50",
    border: "border-green-200",
    description: "Responsible practices that support the long-term development of the athletics community.",
  },
];

const topics = [
  "EU common values",
  "Non-discrimination",
  "Gender equality",
  "Ethical governance",
  "Safeguarding",
  "Inclusion",
  "Digitalisation",
  "Integrity",
  "Sustainable practices",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-300/10" />
          <div className="relative p-8 sm:p-12 lg:p-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Working Together – Succeeding Better
            </div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Building stronger athletics communities through practical learning
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-blue-50">
              The Working Together – Succeeding Better e-learning platform is designed as a practical capacity-building tool that supports the long-term development of athletic federations and their communities.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Learning for every role</h2>
              </div>
              <p className="text-lg leading-8 text-gray-600">
                The platform consists of five multilingual learning modules tailored to the main stakeholder groups in athletics, ensuring that every participant in the athletics ecosystem has access to relevant, role-specific educational content.
              </p>
            </div>
            <div className="rounded-2xl bg-blue-50 px-6 py-5 text-center lg:min-w-48">
              <p className="text-4xl font-extrabold text-blue-700">5</p>
              <p className="mt-1 font-semibold text-blue-900">Multilingual modules</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {audiences.map(({ name, icon: Icon, color, background }) => (
              <div key={name} className={`${background} rounded-xl p-5 text-center transition-transform hover:-translate-y-1`}>
                <Icon className={`mx-auto mb-3 h-8 w-8 ${color}`} />
                <p className="font-bold text-gray-900">{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Shared educational framework</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Three core pillars</h2>
            <p className="mx-auto mt-3 max-w-3xl text-lg leading-8 text-gray-600">
              The modules are based on the project&apos;s Development Strategy for European Athletic Federations and are structured around three connected areas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ title, icon: Icon, accent, background, border, description }) => (
              <article key={title} className={`${background} ${border} rounded-2xl border p-7 shadow-sm`}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className={`h-7 w-7 ${accent}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10">
            <div className="mb-5 flex items-center gap-3">
              <Target className="h-8 w-8 text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900">Practical and role-specific learning</h2>
            </div>
            <p className="text-lg leading-8 text-gray-600">
              Through interactive learning materials, practical examples, and real-life case studies, participants will gain knowledge on the application of EU common values, non-discrimination, gender equality, ethical governance, safeguarding, inclusion, digitalisation, integrity, and sustainable practices within athletics.
            </p>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              The content is adapted to the specific needs of each stakeholder group while maintaining a common educational framework across all modules.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 sm:p-10">
            <h3 className="mb-5 text-lg font-bold text-gray-900">Key learning areas</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 rounded-lg bg-white/80 px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 flex-none text-indigo-600" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-orange-600 text-white shadow-md">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-orange-700">Our main objective</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">Capacity that creates lasting impact</h2>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                The main objective of the e-learning platform is to strengthen the organisational and operational capacity of athletic federations by providing accessible, multilingual, non-formal learning opportunities that promote continuous professional and personal development.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                Ultimately, the platform aims to equip all relevant athletics stakeholders with the knowledge, skills, and practical tools necessary to contribute to more inclusive, well-governed, ethical, and sustainable federations, while creating greater development opportunities for the entire athletics community.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
