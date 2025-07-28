"use client";

interface LessonContentProps {
  content: string | null;
}

export function LessonContent({ content }: LessonContentProps) {
  if (!content) {
    return (
      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            What is Automation?
          </h2>
          <p className="mb-4">
            Automation refers to the process of using technology to perform
            tasks without human intervention. This can include simple actions
            like sending automated emails or complex workflows like managing
            customer support with AI-powered chatbots.
          </p>

          <p className="mb-3">
            In the context of software, automation is often powered by:
          </p>
          <ul className="list-disc ml-6 space-y-1 mb-6">
            <li>Scripts and code (e.g., Python)</li>
            <li>APIs (to connect different platforms)</li>
            <li>Workflow tools (like Zapier or Make)</li>
            <li>Bots and AI systems</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Why It Matters
          </h2>
          <ol className="list-decimal ml-6 space-y-3 mb-6">
            <li>
              <strong>Saves Time.</strong> Automating repetitive tasks frees up
              time for higher-value activities. For example, instead of manually
              copying data from one app to another, a script can do it in
              seconds.
            </li>
            <li>
              <strong>Improves Accuracy.</strong> Automation reduces the risk of
              human error. Data entry, calculations, and file transfers can all
              be handled more precisely by machines.
            </li>
            <li>
              <strong>Scalability.</strong> Unlike manual work, automated
              systems can scale quickly — serving 10 or 10,000 users with the
              same effort.
            </li>
            <li>
              <strong>Consistency.</strong> Automated tasks happen the same way
              every time, ensuring consistent results — whether it&apos;s
              sending invoices or analyzing data.
            </li>
            <li>
              <strong>Competitive Advantage.</strong> Businesses that adopt
              automation early can operate faster, cheaper, and smarter —
              staying ahead in the market.
            </li>
          </ol>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Real-World Examples
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Marketing Automation</strong> – Auto-send personalized
              emails based on user behavior.
            </li>
            <li>
              <strong>Customer Support Bots</strong> – Answer common questions
              instantly 24/7.
            </li>
            <li>
              <strong>Finance Automation</strong> – Generate monthly financial
              reports using spreadsheets + APIs.
            </li>
            <li>
              <strong>Daily Task Automation</strong> – Automatically back up
              files, rename folders, or scrape data.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
