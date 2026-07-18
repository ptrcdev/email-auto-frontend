import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-slate-400 text-sm">Effective as of 2026-07-18</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 text-sm leading-relaxed">

          <p>
            These terms and conditions apply to the AMICUS app for web browsers, together with any
            related services operated by AzulLogic (collectively, the "Application"). AzulLogic
            is hereby referred to as the "Service Provider".
          </p>
          <p>
            By downloading or using the Application, you agree to these Terms and Conditions. You
            should read them carefully before using the Application.
          </p>

          <Section title="License to use the Application">
            <p>
              Subject to your compliance with these Terms, the Service Provider grants you a limited,
              non-exclusive, non-transferable, revocable license to install and use the Application on
              a computer for personal or internal business purposes. You may not reproduce, distribute,
              modify, create derivative works from, reverse engineer, decompile, or disassemble the
              Application, except as and only to the extent that such activity is expressly permitted
              by applicable law.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              The Service Provider retains all intellectual property rights in the Application,
              including its code, design, trademarks, service marks, trade names, logos, and branding
              (the "IP"). Nothing in these Terms grants you any license or right to use the Service
              Provider's trademarks, logos, or branding for any purpose. You agree not to remove,
              alter, or obscure any copyright, trademark, or other proprietary notices displayed in or
              on the Application.
            </p>
          </Section>

          <Section title="Termination">
            <p>
              The Service Provider may suspend your access to the Application or services if you
              materially breach these Terms. The Service Provider will provide you with written notice
              of the breach and, where the breach is capable of cure, you will have 14 days from
              receipt of notice to remedy the breach. If you fail to cure the breach within that
              period, the Service Provider may terminate your access.
            </p>
            <p>
              The Service Provider may suspend or terminate your access immediately without notice if
              you violate applicable law, infringe intellectual property rights, or engage in activity
              that could cause harm to other users or the Service Provider.
            </p>
            <p>
              Upon termination, your right to use the Application will end and you must delete all
              copies from your devices.
            </p>
            <p>
              By accessing and using this Application, you represent that you are legally permitted to
              use it in your jurisdiction. You must be at least 16 years of age (the age of digital
              consent in your jurisdiction) to use the Application. If you are below 16, a parent or
              legal guardian must review and accept these Terms on your behalf.
            </p>
            <p>
              Unauthorized copying, modification of the Application, any part of the Application, or
              the Service Provider's trademarks is strictly prohibited. Any attempts to extract the
              source code of the Application, translate the Application into other languages, or create
              derivative versions are not permitted. All trademarks, copyrights, database rights, and
              other intellectual property rights related to the Application remain the property of the
              Service Provider.
            </p>
          </Section>

          <Section title="User-Generated Content and Acceptable Use">
            <p>
              If this Application allows users to post, share, or upload content, you agree not to
              post content that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Is illegal or violates third-party intellectual property rights (copyright, trademark, patents)</li>
              <li>Is abusive, threatening, harassing, defamatory, or hate speech</li>
              <li>Contains discrimination or incitement to violence or illegal activity</li>
              <li>Is spam, phishing, or contains malware</li>
              <li>Violates the privacy or personal data rights of others</li>
              <li>Is misleading, false, or deceptive</li>
              <li>Contains explicit violence or sexual content (unless age-gated appropriately)</li>
            </ul>
            <p>The Service Provider reserves the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Remove or disable access to content that violates these guidelines</li>
              <li>Suspend or terminate accounts of users who repeatedly violate these guidelines</li>
              <li>Cooperate with law enforcement if illegal content is reported</li>
              <li>Moderate, filter, or hide content that violates these Terms, applicable law, or the guidelines set out above</li>
            </ul>
            <p>
              Content submitted through the Application may be visible to other users or to the
              public, depending on how the Application functions.
            </p>
            <p>
              If you believe content violates these Terms, infringes your rights, or is unlawful, you
              may report it to the Service Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              . The report should include enough information for the Service Provider to identify the
              content, evaluate the complaint, and contact you if follow-up is required.
            </p>
            <p>
              Where the Application provides such features, you may also report content, block other
              users, or mute notifications directly through the Application's interface. The Service
              Provider will review in-app reports with the same standards described in these Terms.
            </p>
            <p>
              The Service Provider may review reported content, request additional information where
              necessary, remove or restrict access to content, and take action against the responsible
              account where appropriate. Users affected by moderation decisions may contact the Service
              Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>{' '}
              to request further review. The Service Provider will respond to appeals within a
              reasonable period and provide the reasons for any upheld moderation decision, subject to
              applicable law.
            </p>
            <p>
              By submitting User-Generated Content you grant the Service Provider a non-exclusive,
              worldwide, royalty-free license to use, reproduce, distribute, prepare derivative works
              of, display and perform the content in connection with the Application and the Service
              Provider's business. This license does not grant the Service Provider the right to sell
              or sublicense your content to third parties independently of the Application. You
              represent and warrant that you own or control all rights in the content you post and that
              use of the content does not violate these Terms or applicable law.
            </p>
            <p>
              Your content may include personal data. Processing of personal data related to
              User-Generated Content is governed by the Privacy Policy. Do not post personal data of
              others without their consent.
            </p>
            <p>
              The Service Provider is dedicated to ensuring that the Application is as beneficial and
              efficient as possible. As such, they reserve the right to modify the Application or
              charge for their services at any time and for any reason. The Service Provider assures
              you that any charges for the Application or its services will be clearly communicated
              to you.
            </p>
            <p>
              The Application stores and processes personal data that you have provided to the Service
              Provider in order to provide the Service. It is your responsibility to maintain the
              security of your computer and access to the Application.
            </p>
            <p>
              Please be aware that the Service Provider does not assume responsibility for certain
              aspects. Some functions of the Application require an active internet connection. The
              Service Provider cannot be held responsible if the Application does not function at full
              capacity due to lack of access to the internet or if you have exhausted your data
              allowance.
            </p>
            <p>
              If you are using the Application, please be aware that your internet service provider's
              agreement terms still apply. Consequently, you may incur charges from your internet
              provider for data usage during the use of the Application. By using the Application, you
              accept responsibility for any such charges.
            </p>
            <p>
              Similarly, the Service Provider cannot always assume responsibility for your usage of
              the application. For instance, it is your responsibility to ensure that your device
              remains charged. If your device runs out of battery and you are unable to access the
              Service, the Service Provider cannot be held responsible.
            </p>
            <p>
              Nothing in these Terms shall limit any rights you have under applicable consumer
              protection laws that cannot be lawfully excluded.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, the Service Provider shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but not
              limited to lost profits, data loss, or business interruption, even if advised of the
              possibility of such damages.
            </p>
            <p>However, the Service Provider retains full liability for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Death or personal injury caused by negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
              <li>Any other liability that cannot be excluded or limited under applicable law</li>
            </ul>
            <p>
              To the fullest extent permitted by law, the total liability of the Service Provider for
              any claim shall not exceed the amount paid by you to the Service Provider for the
              Application in the 12 months preceding the claim, or the minimum amount that must be
              paid under applicable law, whichever is greater. If the Application is provided free of
              charge, this means the Service Provider's liability is limited to the minimum amount
              permitted by applicable law.
            </p>
            <p>
              The Service Provider accepts no liability for any loss, direct or indirect, that you
              experience as a result of relying entirely on third-party information provided through
              this Application, or for inaccuracies in content provided by third parties.
            </p>
          </Section>

          <Section title="Indemnification">
            <p>
              To the fullest extent permitted by law, you agree to indemnify and hold harmless the
              Service Provider, its affiliates, officers, directors, employees and agents from and
              against any claims, liabilities, damages, losses and expenses, including reasonable
              legal fees, arising out of or directly related to your breach of these Terms or your
              intentional misuse of the Application, including User-Generated Content you submit in
              violation of these Terms.
            </p>
            <p>
              This indemnification does not apply to claims arising from the Service Provider's own
              negligence, breach of these Terms, or violation of applicable law. In jurisdictions where
              consumer indemnification is restricted by law, this clause shall be limited to the
              maximum extent permitted.
            </p>
            <p>
              The Application incorporates Artificial Intelligence (AI) technologies to provide
              certain features or services. By using the Application, you acknowledge and agree that
              AI may be used to process data and deliver functionalities. The Service Provider ensures
              that all AI usage complies with applicable laws and is designed to benefit the user
              experience.
            </p>
            <p>
              The Service Provider may wish to update the application at some point. The application
              is currently available as per the requirements for the operating system (and for any
              additional systems they decide to extend the availability of the application to) may
              change, and you will need to download the updates if you want to continue using the
              application. The Service Provider does not guarantee that it will always update the
              application so that it is relevant to you and/or compatible with the particular operating
              system version installed on your device. You should accept updates when offered; if you
              choose not to, the Service Provider may cease to support earlier versions and the
              Application may not function properly. The Service Provider may also wish to cease
              providing the application and may terminate its use at any time without providing
              termination notice to you. Unless they inform you otherwise, upon any termination, (a)
              the rights and licenses granted to you in these terms will end; (b) you must cease using
              the application, and (if necessary) delete it from your device.
            </p>
          </Section>

          <Section title="Governing Law and Jurisdiction">
            <p>
              These Terms and Conditions are governed by the laws of the jurisdiction in which the
              Service Provider is established, excluding conflict of law rules, except to the extent
              mandatory consumer protection laws provide otherwise.
            </p>
            <p>
              Any dispute arising out of or relating to these Terms will be brought before the courts
              that have jurisdiction under applicable law. Nothing in this clause limits any rights you
              may have to bring a claim in a court that is competent under mandatory law.
            </p>
          </Section>

          <Section title="DSA Compliance (Digital Services Act)">
            <p>
              If the Application is an intermediary service as defined under the Digital Services Act
              (Regulation (EU) 2022/2065, "DSA"), the following provisions apply in addition to the
              terms above.
            </p>
            <p>
              <strong className="text-slate-200">Point of Contact:</strong> The Service Provider
              maintains a single point of contact for direct communication with EU authorities and
              recipients of the service, reachable at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              . Where the Service Provider is established outside the European Union, a legal
              representative in the EU has been designated in accordance with Article 13 of the DSA.
            </p>
            <p>
              <strong className="text-slate-200">Content Moderation and Statement of Reasons:</strong>{' '}
              When the Service Provider restricts access to content, suspends or terminates an
              account, or otherwise limits the availability of the Application's features, a clear and
              specific statement of reasons will be provided to the affected user, in accordance with
              Article 17 of the DSA.
            </p>
            <p>
              <strong className="text-slate-200">Notice and Action:</strong> Users and third parties
              may submit notices of allegedly illegal content through the contact details provided in
              these Terms. The Service Provider will process notices promptly, diligently, and without
              automated decision-making where the circumstances require human review, in accordance
              with Article 16 of the DSA.
            </p>
            <p>
              <strong className="text-slate-200">Out-of-Court Dispute Settlement:</strong> Disputes
              regarding content moderation decisions may be submitted to an out-of-court dispute
              settlement body certified in accordance with Article 21 of the DSA. The Service Provider
              will engage with such bodies in good faith. Use of out-of-court dispute settlement does
              not affect your right to seek judicial remedy under applicable law.
            </p>
            <p>
              <strong className="text-slate-200">Transparency Reporting:</strong> The Service Provider
              publishes periodic transparency reports covering content moderation activities, in
              accordance with Article 24 of the DSA. Reports are made available upon request at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              .
            </p>
            <p>
              These DSA provisions apply to the extent that the Application qualifies as an
              intermediary service under the DSA and do not replace or limit any rights or obligations
              under applicable consumer protection or data protection law.
            </p>
          </Section>

          <Section title="Severability">
            <p>
              If any provision of these Terms and Conditions is held to be invalid, illegal, or
              unenforceable by a court of competent jurisdiction, such provision shall be modified to
              the minimum extent necessary to make it valid and enforceable, and the remaining
              provisions of these Terms shall remain in full force and effect.
            </p>
          </Section>

          <Section title="Entire Agreement">
            <p>
              These Terms and Conditions, together with the Privacy Policy, constitute the entire
              agreement between you and the Service Provider concerning your use of the Application,
              superseding any prior agreements or understandings.
            </p>
          </Section>

          <Section title="Changes to These Terms and Conditions">
            <p>
              The Service Provider may periodically update their Terms and Conditions. Therefore, you
              are advised to review this page regularly for any changes. The Service Provider will
              notify you of any changes by posting the new Terms and Conditions on this page.
            </p>
            <p>
              Previous versions of these Terms and Conditions will be maintained and made available
              upon request by contacting the Service Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              .
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions or suggestions about the Terms and Conditions, please do not
              hesitate to contact the Service Provider at{' '}
              <a href="mailto:info@azullogic.com" className="text-blue-400 hover:text-blue-300">
                info@azullogic.com
              </a>
              .
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
          © 2026 AzulLogic · AMICUS
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
