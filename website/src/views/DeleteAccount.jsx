import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LegalPage.css";

export default function DeleteAccount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-hero">
        <Link to="/" className="legal-hero__back">
          ← Back to Home
        </Link>
        <span className="legal-hero__badge">Data Management</span>
        <h1 className="legal-hero__title">Delete Account & Data Deletion Policy</h1>
        <p className="legal-hero__meta">Last updated May 22, 2026</p>
      </header>

      <div className="legal-body">
        <aside className="legal-toc">
          <h2 className="legal-toc__heading">Table of Contents</h2>
          <ul className="legal-toc__list" style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "0.5rem" }}>
            <li className="legal-toc__item"><a href="#section-overview">1. OVERVIEW</a></li>
            <li className="legal-toc__item"><a href="#section-in-app">2. HOW TO DELETE IN-APP</a></li>
            <li className="legal-toc__item"><a href="#section-manual">3. MANUAL DELETION REQUEST</a></li>
            <li className="legal-toc__item"><a href="#section-data-clearance">4. HOW DATA IS CLEARED</a></li>
            <li className="legal-toc__item"><a href="#section-retention">5. DATA RETENTION & BACKUPS</a></li>
            <li className="legal-toc__item"><a href="#section-contact">6. CONTACT SUPPORT</a></li>
          </ul>
        </aside>

        <article className="legal-article">
          <section id="section-overview">
            <h2>1. OVERVIEW</h2>
            <p>
              At Thoughts, we deeply respect your privacy and believe you should have complete control over your personal data. 
              If you decide to stop using the Thoughts application, you have the absolute right to delete your account 
              and wipe all associated information from our platform. 
            </p>
            <p>
              This document outlines how you can initiate account deletion, either directly from the mobile app or 
              manually through our support team, and provides transparent details on how all your data is permanently cleared 
              from our systems.
            </p>
            <p style={{ fontWeight: "600", color: "#e11d48" }}>
              ⚠️ IMPORTANT: Account deletion is permanent and irreversible. Once your account is deleted, it cannot be 
              restored, and you will lose access to your username, profile history, and all published content.
            </p>
          </section>

          <section id="section-in-app">
            <h2>2. HOW TO DELETE IN-APP (RECOMMENDED)</h2>
            <p>
              The fastest and most secure way to delete your account and all associated data is directly through the Thoughts 
              mobile app. This process instantly triggers our backend cascade deletion system.
            </p>
            <p>To delete your account in the app, follow these simple steps:</p>
            <ul style={{ margin: "1rem 0" }}>
              <li><strong>Open Settings:</strong> Launch the Thoughts app on your device, navigate to your <strong>Profile Tab</strong> (bottom-right corner), and tap the <strong>Settings (Gear Icon)</strong> in the top-right corner.</li>
              <li><strong>Find Delete Account:</strong> Scroll down to the bottom of the Settings menu to locate the account management section.</li>
              <li><strong>Initiate Deletion:</strong> Tap on the red <strong>"Delete Account"</strong> button.</li>
              <li><strong>Confirm Decision:</strong> A security dialog will appear, warning you that this action cannot be undone. Read the warning carefully and tap <strong>"Delete"</strong> to confirm.</li>
              <li><strong>Automatic Logout:</strong> Once confirmed, the app will securely delete your account, wipe local tokens, and return you to the login screen.</li>
            </ul>
          </section>

          <section id="section-manual">
            <h2>3. MANUAL DELETION REQUEST</h2>
            <p>
              If you have already uninstalled the Thoughts mobile application, no longer have access to your device, 
              or signed up via a third-party login provider (such as Google OAuth) and wish to request account deletion manually, 
              we are happy to process this for you.
            </p>
            <p>To submit a manual request:</p>
            <ul style={{ margin: "1rem 0" }}>
              <li>Send an email to our support team at <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a>.</li>
              <li>Use the subject line: <strong>"Account Deletion Request - [Your Username]"</strong>.</li>
              <li>You <strong>must</strong> send the email from the email address associated with your Thoughts account. Please include your username and full name inside the email to help us locate your record.</li>
            </ul>
            <p>
              For security and verification purposes, our team will review the request and may ask for confirmation to ensure 
              the request is coming from the true account owner. Once verified, the account will be deleted and all data 
              cleared within <strong>48 to 72 hours</strong>. We will send a final email confirmation once deletion is complete.
            </p>
          </section>

          <section id="section-data-clearance">
            <h2>4. HOW DATA IS CLEARED (CASCADING PURGE)</h2>
            <p>
              When you delete your account (whether in-app or via a manual request), our system performs a comprehensive 
              <strong>cascading deletion</strong>. This ensures that no orphaned data, logs, or linkages remain in our production systems. 
              Here is exactly how all categories of your data are cleared from our databases:
            </p>
            
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Data Category</th>
                    <th>Deletion Action</th>
                    <th>System Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Profile Info & Credentials</strong><br />Full Name, Username, Bio, Email, Password</td>
                    <td>Permanently erased. The primary user document is completely deleted from our database.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Polls Created</strong><br />Questions, option lists, and poll metadata</td>
                    <td>All polls you created are deleted in their entirety, removing all related questions and structures.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Votes Cast</strong><br />Your votes on other users' polls</td>
                    <td>Your voting choices are permanently scrubbed and pulled from all existing polls, correcting the poll data arrays.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Likes & Reactions</strong><br />Likes and timestamps on all posts/polls</td>
                    <td>Your likes are permanently pulled and removed from all polls and items, ensuring complete dissociation.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Social Connections</strong><br />Followers and Following associations</td>
                    <td>Your user ID is automatically pulled from the "followers" and "following" arrays of all other users.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Follow Requests</strong><br />Sent or received pending requests</td>
                    <td>All pending, accepted, or rejected follow request records related to your user ID are purged.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Notifications</strong><br />Sent and received notification history</td>
                    <td>All real-time and historical notification documents where you were the sender or recipient are deleted.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                  <tr>
                    <td><strong>Auth & Push Tokens</strong><br />SecureStore keys and FCM tokens</td>
                    <td>All device push registration tokens are deleted from the server, and local SecureStore session keys are deleted from your mobile device.</td>
                    <td><span className="badge--yes" style={{ backgroundColor: "#ef4444", color: "#ffffff" }}>PURGED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p style={{ marginTop: "1rem" }}>
              Our cascade delete design guarantees that absolutely no trace of your social activity (polls, votes, follows, likes) 
              remains linked to your identity or anywhere on the Thoughts platform.
            </p>
          </section>

          <section id="section-retention">
            <h2>5. DATA RETENTION & BACKUPS</h2>
            <p>
              Once account deletion is processed, your data is immediately removed from all live, active application servers 
              and operational databases. This means your profile and content are completely invisible to other users instantly.
            </p>
            <p>
              For security, fraud prevention, compliance, and disaster recovery purposes, we maintain secure, encrypted, and isolated 
              system backups. 
            </p>
            <ul style={{ margin: "1rem 0" }}>
              <li>Backups are only accessed in critical situations to recover system integrity.</li>
              <li>Data in these backups cannot be restored to active production servers individually.</li>
              <li>All backup snapshots are subject to strict automated lifecycle rules and are completely overwritten and destroyed on a <strong>30-day rolling basis</strong>.</li>
            </ul>
            <p>
              Therefore, within 30 days of your request, your personal data will be completely deleted from our backup archives 
              as well, leaving no trace on any of our infrastructure.
            </p>
          </section>

          <section id="section-contact">
            <h2>6. CONTACT SUPPORT</h2>
            <p>
              If you have any questions, concerns, or feedback regarding this policy or how your data is handled during 
              the deletion process, feel free to contact us at any time. Our team is dedicated to safeguarding your rights.
            </p>
            
            <div className="legal-contact-box">
              <p><strong>Thoughts Support Team</strong></p>
  
              <p>Email: <a href="mailto:thoughtsapp.support@gmail.com">thoughtsapp.support@gmail.com</a></p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
