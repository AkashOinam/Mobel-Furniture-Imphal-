"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  const lastUpdatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-charcoal-950 text-slate-800 dark:text-zinc-200">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="bg-white dark:bg-charcoal-900 border border-slate-200/60 dark:border-zinc-800/80 p-8 md:p-12 rounded-3xl shadow-sm space-y-8">
          
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-50">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 font-medium">
              Last Updated: {lastUpdatedDate}
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-300">
            
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Introduction</h2>
              <p>
                Welcome to <strong>Stupendous Interior</strong>. We value your privacy and are committed to protecting the personal information you share with us.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, browse our products, or submit a quotation request.
              </p>
              <p>
                By using our website, you agree to the practices described in this Privacy Policy.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Information We Collect</h2>
              <p>We may collect the following information when you interact with our website:</p>
              
              <div className="space-y-3 pl-4 border-l-2 border-brand-red/30">
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-sm">Personal Information</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-slate-500 dark:text-zinc-400">
                    <li>Full Name</li>
                    <li>Phone Number</li>
                    <li>Email Address (if provided)</li>
                    <li>Delivery or Project Address (if provided)</li>
                    <li>Information submitted through quotation request or contact forms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-sm">Product Enquiry Information</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-slate-500 dark:text-zinc-400">
                    <li>Products added to your quotation cart</li>
                    <li>Product preferences and enquiry details</li>
                    <li>Additional notes or requirements submitted with your request</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-sm">Technical Information</h3>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-slate-500 dark:text-zinc-400">
                    <li>IP Address</li>
                    <li>Browser Type</li>
                    <li>Device Information</li>
                    <li>Operating System</li>
                    <li>Website Usage Data</li>
                    <li>Cookies and Similar Technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Respond to quotation requests and enquiries</li>
                <li>Contact you regarding products you have selected</li>
                <li>Provide pricing, availability, and product information</li>
                <li>Arrange consultations, delivery discussions, or installation services where applicable</li>
                <li>Improve our products, services, and website experience</li>
                <li>Maintain website security and prevent misuse</li>
                <li>Comply with applicable legal obligations</li>
              </ul>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3 bg-slate-50 dark:bg-zinc-800/20 p-5 rounded-2xl border border-slate-150 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Quotation-Based Service</h2>
              <p>
                <strong>Stupendous Interior</strong> operates as a product catalogue and quotation platform.
              </p>
              <p className="text-sm">
                Products displayed on this website are provided for informational purposes. Product prices are not displayed online. Customers may add products to a quotation cart and submit a quotation request.
              </p>
              <p className="text-sm">
                Submission of a quotation request does not constitute a purchase, order confirmation, or binding agreement. Our team will review the request and contact the customer with pricing and availability information.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Payment Information</h2>
              <p>
                We do not collect, process, or store payment card details, banking information, or online payment credentials through this website.
              </p>
              <p>
                Any payment arrangements, if applicable, are handled separately through approved business processes.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Cookies</h2>
              <p>Our website may use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Improve website functionality</li>
                <li>Remember user preferences</li>
                <li>Analyze website traffic and performance</li>
                <li>Enhance the browsing experience</li>
              </ul>
              <p className="text-xs text-slate-400 mt-2">
                Users may disable cookies through their browser settings; however, certain website features may not function properly.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Sharing of Information</h2>
              <p>We do not sell, rent, or trade personal information to third parties.</p>
              <p>Information may be shared only with:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Authorized employees and sales representatives</li>
                <li>Customer support personnel</li>
                <li>Delivery and logistics partners when required</li>
                <li>Government authorities or regulatory bodies when legally required</li>
              </ul>
              <p className="text-xs text-slate-400">
                All reasonable efforts are made to ensure that such parties handle information securely and responsibly.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Data Security</h2>
              <p>
                We implement appropriate administrative, technical, and physical safeguards to protect personal information from unauthorized access, disclosure, alteration, or destruction.
              </p>
              <p>
                While we strive to protect your information, no internet transmission or electronic storage system can be guaranteed to be completely secure.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Data Retention</h2>
              <p>We retain personal information only for as long as necessary to:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Respond to enquiries and quotation requests</li>
                <li>Provide customer support</li>
                <li>Meet legal, accounting, and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Your Rights</h2>
              <p>Subject to applicable laws, you may request:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of personal information where legally permissible</li>
                <li>Withdrawal of consent for future communications</li>
              </ul>
              <p className="text-xs text-slate-400">
                Requests may be submitted using the contact information provided below.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Third-Party Links</h2>
              <p>
                Our website may contain links to external websites. We are not responsible for the content, security, or privacy practices of third-party websites.
              </p>
              <p>
                Users are encouraged to review the privacy policies of any external websites they visit.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Children's Privacy</h2>
              <p>
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
              <p>
                If we become aware that personal information has been collected from a child, we will take reasonable steps to delete such information.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Changes to This Privacy Policy</h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time.
              </p>
              <p>
                Any changes will be posted on this page with an updated revision date. Continued use of the website after changes are posted constitutes acceptance of the revised Privacy Policy.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3 bg-slate-50 dark:bg-zinc-800/10 p-6 rounded-2xl border border-slate-150 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">Contact Us</h2>
              <p>
                If you have any questions regarding this Privacy Policy or our handling of personal information, please contact us:
              </p>
              
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                <p><strong>Stupendous Interior</strong></p>
                <p>Kwakeithel Ningthemkol Near Maruti Suzuki Arena,</p>
                <p>Imphal West, Manipur, India - 795001</p>
                <p><strong>Email:</strong> <a href="mailto:info@mobelimphal.com" className="text-brand-red hover:underline">info@mobelimphal.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+916009905233" className="text-brand-red hover:underline">+91 6009905233</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
