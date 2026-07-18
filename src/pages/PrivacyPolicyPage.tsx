import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Effective as of 2026-07-18</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">

          <p>
            This privacy policy is applicable to the AMICUS app for web browsers, together with any
            related services operated by AzulLogic (collectively, the "Application"). AzulLogic
            is hereinafter referred to as the "Service Provider".
          </p>

          <Section title="Data Controller Information">
            <p>AzulLogic acts as the Data Controller responsible for the processing of your personal data.</p>
            <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 space-y-1">
              <p><span className="text-slate-400">Company:</span> AzulLogic</p>
              <p><span className="text-slate-400">Address:</span> R. Martinhal, Sagres</p>
              <p>
                <span className="text-slate-400">Email:</span>{' '}
                <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                  info@azullogic.com
                </a>
              </p>
            </div>
            <p>
              For data protection inquiries and to exercise your GDPR rights, please contact the Data
              Controller using the contact information above.
            </p>
          </Section>

          <Section title="What information does the Application obtain and how is it used?">
            <p>
              The Application and related services acquire the information you supply when you
              download, access, or register for the service. Registration with the Service Provider is
              not mandatory. However, you might not be able to use some of the features offered by the
              service unless you register.
            </p>
            <p>
              The Service Provider may also use the information you provide to send important
              information, required notices, and, where permitted by law, marketing communications.
            </p>
          </Section>

          <Section title="Legal basis for processing your personal data">
            <p>
              Where the GDPR applies, the Service Provider relies on one or more lawful bases to
              process your personal data, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-200">Contract performance:</strong> processing necessary
                to provide the Application or fulfil a contract with you.
              </li>
              <li>
                <strong className="text-slate-200">Consent:</strong> where you have given explicit
                consent to processing, including for marketing, analytics, or optional features. You
                may withdraw consent at any time without affecting processing that occurred before
                withdrawal.
              </li>
              <li>
                <strong className="text-slate-200">Legitimate interests:</strong> where processing is
                necessary for the Service Provider's specific legitimate interests, such as maintaining
                network and information security, preventing fraud and abuse, or improving the
                Application's core functionality through analytics, provided those interests are not
                overridden by your data protection rights or fundamental freedoms.
              </li>
              <li>
                <strong className="text-slate-200">Legal obligation:</strong> to comply with laws or
                government requests.
              </li>
            </ul>
          </Section>

          <Section title="Cookies and similar technologies">
            <p>
              The Application or its third-party SDKs may use cookies, SDKs, pixels, and similar
              technologies to support functionality, analytics, and service delivery. Where required by
              law, the Service Provider will obtain your consent before using non-essential tracking
              technologies.
            </p>
          </Section>

          <Section title="Automated decision-making and profiling">
            <p>
              If the Application uses automated decision-making, including profiling, that produces
              legal effects concerning you or similarly significantly affects you, you have the right
              to request human review, express your point of view, and contest the decision.
              Information about the logic involved and the likely consequences of that processing will
              be provided where required by law.
            </p>
          </Section>

          <Section title="What information does the Application collect automatically?">
            <p>
              In addition, the Application may collect certain information automatically, including,
              but not limited to, the type of computer you use, your device's unique identifier (e.g.,
              IP address or browser fingerprint), the IP address of your computer, your operating
              system, the type of web browser you use, and information about the way you use the
              Application.
            </p>
          </Section>

          <Section title="Does the Application collect precise real time location information of the device?">
            <p>
              This Application does not gather precise information about the location of your computer.
            </p>
          </Section>

          <Section title="Does the Application use Artificial Intelligence (AI) technologies?">
            <p>
              The Application uses Artificial Intelligence (AI) technologies to enhance user experience
              and provide certain features. The AI components may process user data in the following
              ways:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-200">Personalized Content:</strong> AI may analyze your
                usage patterns to deliver content tailored to your preferences and behavior.
              </li>
              <li>
                <strong className="text-slate-200">Recommendations:</strong> AI may suggest features,
                services, or content based on your interactions within the Application.
              </li>
              <li>
                <strong className="text-slate-200">Automated Functionalities:</strong> Certain app
                features may be powered by AI to automate tasks or improve efficiency.
              </li>
              <li>
                <strong className="text-slate-200">Data Protection:</strong> All AI processing is
                performed in accordance with this privacy policy and applicable laws, ensuring your
                data is handled securely and responsibly.
              </li>
            </ul>
          </Section>

          <Section title="Do third parties see and/or have access to information obtained by the Application?">
            <p>
              Only aggregated, anonymized data is periodically transmitted to external services to aid
              the Service Provider in improving the Application and their service. The Service Provider
              may share your information with third parties in the ways that are described in this
              privacy statement.
            </p>
          </Section>

          <Section title="International Data Transfers">
            <p>
              The Service Provider or its third-party service providers may transfer personal data
              outside the European Economic Area (EEA). Where such transfers occur, the Service
              Provider will use an appropriate transfer mechanism required by GDPR Chapter V:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Adequacy decisions by the European Commission</li>
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>
                Other safeguards or derogations recognized under GDPR Chapter V, including consent
                where legally permitted
              </li>
            </ul>
            <p>
              Countries outside the EEA may not provide the same level of data protection as the EEA.
              Where required by law, the Service Provider will apply appropriate safeguards and obtain
              any consent required for the transfer.
            </p>
            <p>
              The Service Provider may disclose User Provided and Automatically Collected Information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                as required by law, such as to comply with a subpoena, or similar legal process;
              </li>
              <li>
                when they believe in good faith that disclosure is necessary to protect their rights,
                protect your safety or the safety of others, investigate fraud, or respond to a
                government request;
              </li>
              <li>
                with their trusted services providers who work on their behalf, do not have an
                independent use of the information the Service Provider discloses to them, and have
                agreed to adhere to the rules set forth in this privacy statement.
              </li>
            </ul>
            <p>
              Where the GDPR applies, the Service Provider enters into Data Processing Agreements
              (DPAs) with third-party service providers that process personal data on its behalf, as
              required by Article 28 of the GDPR.
            </p>
          </Section>

          <Section title="What are my opt-out rights?">
            <p>
              You can stop further collection of information from your device by ceasing to use the
              website. Ceasing to use will stop the website from collecting data from your device, but
              it does not automatically delete information that has already been transmitted to the
              Service Provider or to third parties.
            </p>
            <p>
              To request deletion of your personal data, withdraw consent, or exercise any of your
              rights, contact the Service Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              .
            </p>
          </Section>

          <Section title="What is the data retention policy and how can you manage your information?">
            <p>
              The Service Provider retains personal data based on its necessity for the stated
              purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-200">User Provided Data:</strong> Retained for the
                duration of your use of the Application plus 12 months thereafter, unless longer
                retention is required by law.
              </li>
              <li>
                <strong className="text-slate-200">Automatically Collected Data:</strong> Retained for
                up to 24 months from collection, unless longer retention is required for legal
                compliance or security purposes.
              </li>
              <li>
                <strong className="text-slate-200">Aggregated and Anonymized Data:</strong> Retained
                indefinitely as it no longer identifies you.
              </li>
              <li>
                <strong className="text-slate-200">Data required for legal compliance:</strong>{' '}
                Retained as long as required by applicable law.
              </li>
            </ul>
            <p>
              You have the right to request deletion of your personal data at any time, except where
              retention is required by law. If you'd like the Service Provider to delete User Provided
              Data that you have provided via the Application, please contact them at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>{' '}
              and they will respond within the time required by applicable law. Please note that some
              User Provided Data may be required in order for the Application to function properly.
            </p>
          </Section>

          <Section title="Data Deletion">
            <p>
              You can request deletion of your personal data or account by contacting the Service
              Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              . The Service Provider will process your request within the timeframes required by
              applicable law.
            </p>
            <p>
              Upon verification of your identity, the Service Provider will delete your personal data
              from its systems, except where retention is required for legal compliance or legitimate
              business purposes.
            </p>
          </Section>

          <Section title="How does the Application address children's privacy?">
            <p>
              The Application is not intended for children under 16 years of age, or where a higher
              age of digital consent is established under applicable law. The Service Provider does not
              knowingly solicit data from children or market the Application to them.
            </p>
            <p>
              The Service Provider does not knowingly collect personally identifiable information from
              children. The Service Provider encourages all children to never submit any personally
              identifiable information through the Application and/or Services. The Service Provider
              encourages parents and legal guardians to monitor their children's Internet usage and to
              help enforce this Policy by instructing their children never to provide personally
              identifiable information through the Application and/or Services without their
              permission. If you have reason to believe that a child has provided personally
              identifiable information to the Service Provider through the Application and/or Services,
              please contact the Service Provider so that they will be able to take the necessary
              actions. If you are under 16 years of age, or where a higher age of digital consent is
              established by applicable law, your parent or guardian must provide consent on your
              behalf where permitted by law.
            </p>
          </Section>

          <Section title="How is your information kept secure?">
            <p>
              The Service Provider is committed to safeguarding the confidentiality of your
              information. The Service Provider implements physical, electronic, and procedural
              safeguards to protect information it processes and maintains. For example, access is
              limited to authorized employees and contractors who need to know that information to
              operate, develop, or improve the Application. However, no security system can prevent
              all potential security breaches.
            </p>
          </Section>

          <Section title="Data Breach Notification">
            <p>
              In the event of a personal data breach that poses a risk to your rights and freedoms,
              the Service Provider will notify the relevant supervisory authority within 72 hours of
              becoming aware of the breach, as required by applicable law. Where the breach is likely
              to result in a high risk to your rights and freedoms, the Service Provider will also
              notify you without undue delay, providing information about the nature of the breach, the
              categories of data affected, and the measures taken or proposed to address the breach.
            </p>
          </Section>

          <Section title="How will you be informed of changes to this Privacy Policy?">
            <p>
              The Service Provider may update this Privacy Policy from time to time. The Service
              Provider will notify you of material changes by posting the updated Privacy Policy with
              an effective date. Where required by law, the Service Provider will seek your consent to
              material changes before they take effect.
            </p>
            <p>
              Previous versions of this Privacy Policy will be maintained and made available upon
              request by contacting the Service Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              .
            </p>
          </Section>

          <Section title="What are your GDPR data protection rights?">
            <p>Under the GDPR, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-200">Right of Access:</strong> You can request access to
                your personal data.
              </li>
              <li>
                <strong className="text-slate-200">Right to Rectification:</strong> You can request
                correction of inaccurate data.
              </li>
              <li>
                <strong className="text-slate-200">Right to Erasure:</strong> You can request deletion
                of your personal data (the "right to be forgotten").
              </li>
              <li>
                <strong className="text-slate-200">Right to Restrict Processing:</strong> You can
                request that the Data Controller limits how they use your data.
              </li>
              <li>
                <strong className="text-slate-200">Right to Data Portability:</strong> You can request
                a copy of your data in a structured, commonly used, machine-readable format.
              </li>
              <li>
                <strong className="text-slate-200">Right to Object:</strong> You can object to
                processing based on legitimate interests. You have an absolute right to object to
                processing for direct marketing purposes at any time.
              </li>
              <li>
                <strong className="text-slate-200">Right to Withdraw Consent:</strong> Where
                processing is based on your consent, you can withdraw it at any time. Withdrawal is as
                simple as toggling preferences in the Application's settings or contacting the Data
                Controller.
              </li>
              <li>
                <strong className="text-slate-200">Rights Regarding Automated Decision-Making:</strong>{' '}
                You have rights related to automated decisions that affect you.
              </li>
            </ul>
            <p>
              If you believe your data protection rights have been violated, you have the right to
              lodge a complaint with your local Data Protection Authority. Contact details for each
              country's Data Protection Authority can be found at{' '}
              <a
                href="https://edpb.ec.europa.eu/about-edpb/members_en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                edpb.ec.europa.eu
              </a>
              .
            </p>
            <p>
              If you are located in the United Kingdom, you may contact the Information Commissioner's
              Office at{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                ico.org.uk
              </a>
              .
            </p>
          </Section>

          <Section title="What are your California privacy rights (CCPA/CPRA)?">
            <p>
              If you are a resident of California, the California Consumer Privacy Act (CCPA) and the
              California Privacy Rights Act (CPRA) provide you with additional rights regarding your
              personal information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-200">Right to Know:</strong> You can request disclosure
                of the categories and specific pieces of personal information the Service Provider has
                collected about you.
              </li>
              <li>
                <strong className="text-slate-200">Right to Delete:</strong> You can request deletion
                of personal information the Service Provider has collected from you, subject to certain
                exceptions.
              </li>
              <li>
                <strong className="text-slate-200">Right to Correct:</strong> You can request
                correction of inaccurate personal information.
              </li>
              <li>
                <strong className="text-slate-200">Right to Opt-Out:</strong> You can opt out of the
                sale or sharing of your personal information for cross-context behavioral advertising.
              </li>
              <li>
                <strong className="text-slate-200">Right to Limit Use of Sensitive Personal Information:</strong>{' '}
                You can limit the use of your sensitive personal information to essential purposes.
              </li>
              <li>
                <strong className="text-slate-200">Right to Non-Discrimination:</strong> The Service
                Provider will not discriminate against you for exercising any of your CCPA/CPRA rights.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact the Service Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              . The Service Provider will verify your request using the information you provide and
              respond within the timeframes required by law. You may designate an authorized agent to
              make a request on your behalf.
            </p>
          </Section>

          <Section title="How do you give your consent?">
            <p>
              Where processing is based on consent, you provide that consent by affirmatively opting
              in to the relevant feature or action. You may withdraw consent at any time without
              affecting processing carried out before withdrawal. Processing based on other lawful
              bases, including contract performance, legitimate interests, or legal obligations, is
              carried out as described above.
            </p>
          </Section>

          <Section title="How can you contact the Data Controller?">
            <p>
              If you have any questions regarding privacy while using the Application, or have
              questions about the practices, please contact the Service Provider via email at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              .
            </p>
            <p>
              To request deletion of your personal data or to exercise any of your rights, contact the
              Service Provider using the details provided above. The Service Provider will respond
              within one month of receiving your request, extendable by up to two months where
              necessary due to the complexity or volume of requests, as permitted by applicable law.
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
          © 2026 Patricia Almeida · AMICUS
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
