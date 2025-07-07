import { Slack, Mail, Github, Calendar, Twitter, Database } from "lucide-react";

export default function IntegrationsMarquee() {
  const integrations = [
    { name: "Slack", icon: <Slack className="h-8 w-8" /> },
    { name: "Gmail", icon: <Mail className="h-8 w-8" /> },
    { name: "GitHub", icon: <Github className="h-8 w-8" /> },
    { name: "Calendar", icon: <Calendar className="h-8 w-8" /> },
    { name: "Twitter", icon: <Twitter className="h-8 w-8" /> },
    { name: "Database", icon: <Database className="h-8 w-8" /> },
    // Add more as needed
  ];

  return (
    <section id="integrations" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Connect with your favorite tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Seamlessly integrate with popular applications and services to create powerful automation workflows
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {integrations.concat(integrations).map((integration, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center space-y-2 p-4 min-w-[120px]"
              >
                <div className="text-gray-600">{integration.icon}</div>
                <span className="text-base font-medium text-gray-700">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}