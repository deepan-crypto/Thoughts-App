import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LegalPage.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-hero">
        <Link to="/" className="legal-hero__back">
          ← Back to Home
        </Link>
        <span className="legal-hero__badge">Privacy Policy</span>
        <h1 className="legal-hero__title">Privacy Policy</h1>
        <p className="legal-hero__meta">Last updated May 11, 2026</p>
      </header>

      <div className="legal-body">
        <aside className="legal-toc">
          <h2 className="legal-toc__heading">Table of Contents</h2>
          <ul className="legal-toc__list">
            <li className="legal-toc__item"><a href="#section-1">1. WHAT INFORMATION DO WE COLLECT?</a></li>
            <li className="legal-toc__item"><a href="#section-2">2. HOW DO WE PROCESS YOUR INFORMATION?</a></li>
            <li className="legal-toc__item"><a href="#section-3">3. WHAT LEGAL BASES DO WE RELY ON?</a></li>
            <li className="legal-toc__item"><a href="#section-4">4. WHEN AND WITH WHOM DO WE SHARE?</a></li>
            <li className="legal-toc__item"><a href="#section-5">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
            <li className="legal-toc__item"><a href="#section-6">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
            <li className="legal-toc__item"><a href="#section-7">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
            <li className="legal-toc__item"><a href="#section-8">8. DO WE COLLECT FROM MINORS?</a></li>
            <li className="legal-toc__item"><a href="#section-9">9. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
            <li className="legal-toc__item"><a href="#section-10">10. CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
            <li className="legal-toc__item"><a href="#section-11">11. DO US RESIDENTS HAVE SPECIFIC RIGHTS?</a></li>
            <li className="legal-toc__item"><a href="#section-12">12. DO OTHER REGIONS HAVE SPECIFIC RIGHTS?</a></li>
            <li className="legal-toc__item"><a href="#section-13">13. DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
            <li className="legal-toc__item"><a href="#section-14">14. HOW CAN YOU CONTACT US ABOUT THIS?</a></li>
            <li className="legal-toc__item"><a href="#section-15">15. HOW CAN YOU REVIEW, UPDATE, OR DELETE DATA?</a></li>
          </ul>
        </aside>

        <article className="legal-article">
          <p>
            This Privacy Notice for Thoughts ("we," "us," or "our"), describes how and 
            why we might access, collect, store, use, and/or share ("process") your 
            personal information when you use our services ("Services"), including when 
            you:
          </p>
          <ul>
            <li>Download and use our mobile application (Thoughts), or any other application of ours that links to this Privacy Notice</li>
            <li>Use Thoughts. A social platform where users can create polls and other users can vote and engage with them.</li>
            <li>Engage with us in other related ways, including any marketing or events</li>
          </ul>
          <p>
            Questions or concerns? Reading this Privacy Notice will help you 
            understand your privacy rights and choices. We are responsible for making 
            decisions about how your personal information is processed. If you do not 
            agree with our policies and practices, please do not use our Services. If you 
            still have any questions or concerns, please contact us 
            at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a>.
          </p>

          <section style={{ marginTop: "2rem" }}>
            <h2>SUMMARY OF KEY POINTS</h2>
            <p>
              This summary provides key points from our Privacy Notice, but you can 
              find out more details about any of these topics by clicking the link 
              following each key point or by using our table of contents below to find 
              the section you are looking for.
            </p>
            <p>
              <strong>What personal information do we process?</strong> When you visit, use, or 
              navigate our Services, we may process personal information depending on 
              how you interact with us and the Services, the choices you make, and the 
              products and features you use. Learn more about personal information you 
              disclose to us.
            </p>
            <p>
              <strong>Do we process any sensitive personal information?</strong> Some of the 
              information may be considered "special" or "sensitive" in certain jurisdictions, 
              for example your racial or ethnic origins, sexual orientation, and religious 
              beliefs. We do not process sensitive personal information.
            </p>
            <p>
              <strong>Do we collect any information from third parties?</strong> We do not collect any 
              information from third parties.
            </p>
            <p>
              <strong>How do we process your information?</strong> We process your information to 
              provide, improve, and administer our Services, communicate with you, for 
              security and fraud prevention, and to comply with law. We may also process 
              your information for other purposes with your consent. We process your 
              information only when we have a valid legal reason to do so. Learn more 
              about how we process your information.
            </p>
            <p>
              <strong>In what situations and with which parties do we share personal 
              information?</strong> We may share information in specific situations and with 
              specific third parties. Learn more about when and with whom we share your 
              personal information.
            </p>
            <p>
              <strong>How do we keep your information safe?</strong> We have 
              adequate organizational and technical processes and procedures in place to 
              protect your personal information. However, no electronic transmission over 
              the internet or information storage technology can be guaranteed to be 100% 
              secure, so we cannot promise or guarantee that hackers, cybercriminals, or 
              other unauthorized third parties will not be able to defeat our security and 
              improperly collect, access, steal, or modify your information. Learn more 
              about how we keep your information safe.
            </p>
            <p>
              <strong>What are your rights?</strong> Depending on where you are located geographically, 
              the applicable privacy law may mean you have certain rights regarding your 
              personal information. Learn more about your privacy rights.
            </p>
            <p>
              <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights 
              is by submitting a data subject access request, or by contacting us. We will 
              consider and act upon any request in accordance with applicable data 
              protection laws.
            </p>
            <p>
              Want to learn more about what we do with any information we 
              collect? Review the Privacy Notice in full.
            </p>
          </section>

          <section id="section-1">
            <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
            <h3>Personal information you disclose to us</h3>
            <p><em>In Short: We collect personal information that you provide to us.</em></p>
            <p>
              We collect personal information that you voluntarily provide to us when 
              you register on the Services, express an interest in obtaining information 
              about us or our products and Services, when you participate in activities on 
              the Services, or otherwise when you contact us.
            </p>
            <p>
              Personal Information Provided by You. The personal information that we 
              collect depends on the context of your interactions with us and the Services, 
              the choices you make, and the products and features you use. The personal 
              information we collect may include the following:
            </p>
            <ul>
              <li>names</li>
              <li>email addresses</li>
              <li>usernames</li>
              <li>passwords</li>
              <li>contact preferences</li>
              <li>contact or authentication data</li>
            </ul>
            <p>Sensitive Information. We do not process sensitive information.</p>
            <p>
              Social Media Login Data. We may provide you with the option to register 
              with us using your existing social media account details, like your Facebook, 
              X, or other social media account. If you choose to register in this way, we will 
              collect certain profile information about you from the social media provider, as 
              described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
            </p>
            <p>
              Application Data. If you use our application(s), we also may collect the 
              following information if you choose to provide us with access or 
              permission:
            </p>
            <ul>
              <li>Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.</li>
            </ul>
            <p>
              This information is primarily needed to maintain the security and operation of 
              our application(s), for troubleshooting, and for our internal analytics and 
              reporting purposes.
            </p>
            <p>
              All personal information that you provide to us must be true, complete, and 
              accurate, and you must notify us of any changes to such personal 
              information.
            </p>
            <h3>Google API</h3>
            <p>
              Our use of information received from Google APIs will adhere to Google API 
              Services User Data Policy, including the Limited Use requirements.
            </p>
          </section>

          <section id="section-2">
            <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
            <p><em>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</em></p>
            <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
            <ul>
              <li>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
              <li>To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.</li>
              <li>To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
              <li>To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
              <li>To fulfill and manage your orders. We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
              <li>To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
              <li>To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
              <li>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
            </ul>
          </section>

          <section id="section-3">
            <h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</h2>
            <p><em>In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em></p>
            <p><strong>If you are located in the EU or UK, this section applies to you.</strong></p>
            <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
            <ul>
              <li>Consent. We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about withdrawing your consent.</li>
              <li>Performance of a Contract. We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
              <li>Legitimate Interests. We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to: Understand how our users use our products and services so we can improve user experience.</li>
              <li>Legal Obligations. We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
              <li>Vital Interests. We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
            </ul>
            <p><strong>If you are located in Canada, this section applies to you.</strong></p>
            <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
            <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
            <ul>
              <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
              <li>For investigations and fraud detection and prevention</li>
              <li>For business transactions provided certain conditions are met</li>
              <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
              <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
              <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
              <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
              <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
              <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
              <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
              <li>If the information is publicly available and is specified by the regulations</li>
              <li>We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments</li>
            </ul>
          </section>

          <section id="section-4">
            <h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
            <p><em>In Short: We may share information in specific situations described in this section and/or with the following third parties.</em></p>
            <p>We may need to share your personal information in the following situations:</p>
            <ul>
              <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li>Other Users. When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. If you interact with other users of our Services and register for our Services through a social network (such as Facebook), your contacts on the social network will see your name, profile photo, and descriptions of your activity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.</li>
            </ul>
          </section>

          <section id="section-5">
            <h2>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
            <p><em>In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em></p>
            <p>
              Our Services offer you the ability to register and log in using your third-party 
              social media account details (like your Facebook or X logins). Where you 
              choose to do this, we will receive certain profile information about you from 
              your social media provider. The profile information we receive may vary 
              depending on the social media provider concerned, but will often include your 
              name, email address, friends list, and profile picture, as well as other 
              information you choose to make public on such a social media platform.
            </p>
            <p>
              We will use the information we receive only for the purposes that are 
              described in this Privacy Notice or that are otherwise made clear to you on 
              the relevant Services. Please note that we do not control, and are not 
              responsible for, other uses of your personal information by your third-party 
              social media provider. We recommend that you review their privacy notice to 
              understand how they collect, use, and share your personal information, and 
              how you can set your privacy preferences on their sites and apps.
            </p>
          </section>

          <section id="section-6">
            <h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            <p><em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>
            <p>
              We will only keep your personal information for as long as it is necessary for 
              the purposes set out in this Privacy Notice, unless a longer retention period is 
              required or permitted by law (such as tax, accounting, or other legal 
              requirements). No purpose in this notice will require us keeping your personal 
              information for longer than the period of time in which users have an account 
              with us.
            </p>
            <p>
              When we have no ongoing legitimate business need to process your personal 
              information, we will either delete or anonymize such information, or, if this is 
              not possible (for example, because your personal information has been 
              stored in backup archives), then we will securely store your personal 
              information and isolate it from any further processing until deletion is possible.
            </p>
          </section>

          <section id="section-7">
            <h2>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            <p><em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
            <p>
              We have implemented appropriate and reasonable technical 
              and organizational security measures designed to protect the security of any 
              personal information we process. However, despite our safeguards and 
              efforts to secure your information, no electronic transmission over the Internet 
              or information storage technology can be guaranteed to be 100% secure, so 
              we cannot promise or guarantee that hackers, cybercriminals, or 
              other unauthorized third parties will not be able to defeat our security and 
              improperly collect, access, steal, or modify your information. Although we will 
              do our best to protect your personal information, transmission of personal 
              information to and from our Services is at your own risk. You should only 
              access the Services within a secure environment.
            </p>
          </section>

          <section id="section-8">
            <h2>8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
            <p><em>In Short: We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.</em></p>
            <p>
              We do not knowingly collect, solicit data from, or market to children under 18 
              years of age or the equivalent age as specified by law in your jurisdiction, nor 
              do we knowingly sell such personal information. By using the Services, you 
              represent that you are at least 18 or the equivalent age as specified by law in 
              your jurisdiction or that you are the parent or guardian of such a minor and 
              consent to such minor dependent’s use of the Services. If we learn that 
              personal information from users less than 18 years of age or the equivalent 
              age as specified by law in your jurisdiction has been collected, we will 
              deactivate the account and take reasonable measures to promptly delete 
              such data from our records. If you become aware of any data we may have 
              collected from children under age 18 or the equivalent age as specified by 
              law in your jurisdiction, please contact us 
              at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a>.
            </p>
          </section>

          <section id="section-9">
            <h2>9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            <p><em>In Short: Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em></p>
            <p>
              In some regions (like the EEA, UK, Switzerland, and Canada), you have 
              certain rights under applicable data protection laws. These may include the 
              right (i) to request access and obtain a copy of your personal information, (ii) 
              to request rectification or erasure; (iii) to restrict the processing of your 
              personal information; (iv) if applicable, to data portability; and (v) not to be 
              subject to automated decision-making. If a decision that produces legal or 
              similarly significant effects is made solely by automated means, we will inform 
              you, explain the main factors, and offer a simple way to request human 
              review. In certain circumstances, you may also have the right to object to the 
              processing of your personal information. You can make such a request by 
              contacting us by using the contact details provided in the section "HOW CAN 
              YOU CONTACT US ABOUT THIS NOTICE?" below.
            </p>
            <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
            <p>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority.</p>
            <p>If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner.</p>
            <p>
              <strong>Withdrawing your consent:</strong> If we are relying on your consent to process 
              your personal information, which may be express and/or implied consent 
              depending on the applicable law, you have the right to withdraw your consent 
              at any time. You can withdraw your consent at any time by contacting us by 
              using the contact details provided in the section "HOW CAN YOU CONTACT 
              US ABOUT THIS NOTICE?" below.
            </p>
            <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
            <p>
              <strong>Opting out of marketing and promotional communications:</strong> You can 
              unsubscribe from our marketing and promotional communications at any time 
              by clicking on the unsubscribe link in the emails that we send, or by 
              contacting us using the details provided in the section "HOW CAN YOU 
              CONTACT US ABOUT THIS NOTICE?" below. You will then be removed from 
              the marketing lists. However, we may still communicate with you — for 
              example, to send you service-related messages that are necessary for the 
              administration and use of your account, to respond to service requests, or for 
              other non-marketing purposes.
            </p>
            <h3>Account Information</h3>
            <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
            <ul>
              <li>Log in to your account settings and update your user account.</li>
            </ul>
            <p>
              Upon your request to terminate your account, we will deactivate or delete 
              your account and information from our active databases. However, we may 
              retain some information in our files to prevent fraud, troubleshoot problems, 
              assist with any investigations, enforce our legal terms and/or comply with 
              applicable legal requirements.
            </p>
            <p>
              If you have questions or comments about your privacy rights, you may 
              email us at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a>.
            </p>
          </section>

          <section id="section-10">
            <h2>10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
            <p>
              Most web browsers and some mobile operating systems and mobile 
              applications include a Do-Not-Track ("DNT") feature or setting you can 
              activate to signal your privacy preference not to have data about your online 
              browsing activities monitored and collected. At this stage, no uniform 
              technology standard for recognizing and implementing DNT signals has 
              been finalized. As such, we do not currently respond to DNT browser signals 
              or any other mechanism that automatically communicates your choice not to 
              be tracked online. If a standard for online tracking is adopted that we must 
              follow in the future, we will inform you about that practice in a revised version 
              of this Privacy Notice.
            </p>
            <p>
              California law requires us to let you know how we respond to web browser 
              DNT signals. Because there currently is not an industry or legal standard 
              for recognizing or honoring DNT signals, we do not respond to them at this 
              time.
            </p>
          </section>

          <section id="section-11">
            <h2>11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p><em>In Short: If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</em></p>
            <h3>Categories of Personal Information We Collect</h3>
            <p>
              The table below shows the categories of personal information we have 
              collected in the past twelve (12) months. The table includes illustrative 
              examples of each category and does not reflect the personal information we 
              collect from you. For a comprehensive inventory of all personal information 
              we process, please refer to the section "WHAT INFORMATION DO WE COLLECT?"
            </p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Examples</th>
                    <th>Collected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A. Identifiers</td>
                    <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>B. Personal information as defined in the law</td>
                    <td>Name, contact information, education, employment, employment history, and financial information</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>C. Protected classification</td>
                    <td>Gender, age, date of birth, race and ethnicity, national origin, marital status</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>D. Commercial information</td>
                    <td>Transaction information, purchase history, financial details, and payment</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>E. Biometric information</td>
                    <td>Fingerprints and voiceprints</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>F. Internet or other similar network activity</td>
                    <td>Browsing history, search history, online behavior, interest data, and interactions with our and other</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>G. Geolocation data</td>
                    <td>Device location</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>H. Audio, electronic, sensory, or similar</td>
                    <td>Images and audio, video or call recordings created in connection with</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>I. Professional or employment-related information</td>
                    <td>Business contact details in order to provide you our Services at a business level or job title, work history, and</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>J. Education Information</td>
                    <td>Student records and directory information</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>K. Inferences drawn from collected personal information</td>
                    <td>Inferences drawn from any of the collected personal information listed above to create a profile or summary</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                  <tr>
                    <td>L. Sensitive personal Information</td>
                    <td>Sensitive personal details</td>
                    <td><span className="badge--no">NO</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
            <ul>
              <li>Receiving help through our customer support channels;</li>
              <li>Participation in customer surveys or contests; and</li>
              <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
            </ul>
            <h3>Sources of Personal Information</h3>
            <p>Learn more about the sources of personal information we collect in "WHAT INFORMATION DO WE COLLECT?"</p>
            <h3>How We Use and Share Personal Information</h3>
            <p>Learn more about how we use your personal information in the section, "HOW DO WE PROCESS YOUR INFORMATION?"</p>
            <p><strong>Will your information be shared with anyone else?</strong></p>
            <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"</p>
            <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.</p>
            <p>We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.</p>
            <h3>Your Rights</h3>
            <p>You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
            <ul>
              <li>Right to know whether or not we are processing your personal data</li>
              <li>Right to access your personal data</li>
              <li>Right to correct inaccuracies in your personal data</li>
              <li>Right to request the deletion of your personal data</li>
              <li>Right to obtain a copy of the personal data you previously shared with us</li>
              <li>Right to non-discrimination for exercising your rights</li>
              <li>Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California’s privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
            </ul>
            <p>Depending upon the state where you live, you may also have the following rights:</p>
            <ul>
              <li>Right to access the categories of personal data being processed (as permitted by applicable law, including the privacy law in Minnesota)</li>
              <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in California, Delaware, and Maryland)</li>
              <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in Minnesota and Oregon)</li>
              <li>Right to obtain a list of third parties to which we have sold personal data (as permitted by applicable law, including the privacy law in Connecticut)</li>
              <li>Right to review, understand, question, and depending on where you live, correct how personal data has been profiled (as permitted by applicable law, including the privacy law in Connecticut and Minnesota)</li>
              <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including the privacy law in California)</li>
              <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including the privacy law in Florida)</li>
            </ul>
            <h3>How to Exercise Your Rights</h3>
            <p>
              To exercise these rights, you can contact us by submitting a data subject 
              access request, by emailing us at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a>, or by 
              referring to the contact details at the bottom of this document.
            </p>
            <p>Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.</p>
            <h3>Request Verification</h3>
            <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.</p>
            <p>If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.</p>
            <h3>Appeals</h3>
            <p>
              Under certain US state data protection laws, if we decline to take action 
              regarding your request, you may appeal our decision by emailing us 
              at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a>. We will inform you in writing of any 
              action taken or not taken in response to the appeal, including a written 
              explanation of the reasons for the decisions. If your appeal is denied, you 
              may submit a complaint to your state attorney general.
            </p>
            <h3>California "Shine The Light" Law</h3>
            <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</p>
          </section>

          <section id="section-12">
            <h2>12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <p><em>In Short: You may have additional rights based on the country you reside in.</em></p>
            <h3>Australia and New Zealand</h3>
            <p>We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020 (Privacy Act).</p>
            <p>This Privacy Notice satisfies the notice requirements defined in both Privacy Acts, in particular: what personal information we collect from you, from which sources, for which purposes, and other recipients of your personal information.</p>
            <p>If you do not wish to provide the personal information necessary to fulfill their applicable purpose, it may affect our ability to provide our services, in particular:</p>
            <ul>
              <li>offer you the products or services that you want</li>
              <li>respond to or help with your requests</li>
              <li>manage your account with us</li>
              <li>confirm your identity and protect your account</li>
            </ul>
            <p>At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"</p>
            <p>If you believe we are unlawfully processing your personal information, you have the right to submit a complaint about a breach of the Australian Privacy Principles to the Office of the Australian Information Commissioner and a breach of New Zealand's Privacy Principles to the Office of New Zealand Privacy Commissioner.</p>
            <h3>Republic of South Africa</h3>
            <p>At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"</p>
            <p>If you are unsatisfied with the manner in which we address any complaint with regard to our processing of personal information, you can contact the office of the regulator, the details of which are:</p>
            <p>
              <strong>The Information Regulator (South Africa)</strong><br />
              General enquiries: <a href="mailto:enquiries@inforegulator.org.za">enquiries@inforegulator.org.za</a><br />
              Complaints (complete POPIA/PAIA form 5): <a href="mailto:PAIAComplaints@inforegulator.org.za">PAIAComplaints@inforegulator.org.za</a> &amp; <a href="mailto:POPIAComplaints@inforegulator.org.za">POPIAComplaints@inforegulator.org.za</a>
            </p>
          </section>

          <section id="section-13">
            <h2>13. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            <p><em>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
            <p>
              We may update this Privacy Notice from time to time. The updated version 
              will be indicated by an updated "Revised" date at the top of this Privacy 
              Notice. If we make material changes to this Privacy Notice, we may notify you 
              either by prominently posting a notice of such changes or by directly sending 
              you a notification. We encourage you to review this Privacy Notice frequently 
              to be informed of how we are protecting your information.
            </p>
          </section>

          <section id="section-14">
            <h2>14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            <p>If you have questions or comments about this notice, you may email us at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a> or contact us by post at:</p>
            <div className="legal-contact-box">
              <p><strong>Thoughts</strong></p>
              <p>26c/1a, Kamaraj Nagar, 3rd Mile</p>
              <p>Tuticorin, Tamil Nadu 628008</p>
              <p>India</p>
            </div>
          </section>

          <section id="section-15">
            <h2>15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
            <p>
              Based on the applicable laws of your country or state of residence in the US, 
              you may have the right to request access to the personal information we 
              collect from you, details about how we have processed it, correct 
              inaccuracies, or delete your personal information. You may also have the right 
              to withdraw your consent to our processing of your personal information. 
              These rights may be limited in some circumstances by applicable law. To 
              request to review, update, or delete your personal information, please fill out 
              and submit a data subject access request.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
