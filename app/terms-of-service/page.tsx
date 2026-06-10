"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfServicePage() {
  const lastUpdatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-charcoal-955 text-slate-800 dark:text-zinc-200">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="bg-white dark:bg-charcoal-900 border border-slate-200/60 dark:border-zinc-800/80 p-8 md:p-12 rounded-3xl shadow-sm space-y-8">
          
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-zinc-800 pb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-50">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 font-medium">
              Last Updated: {lastUpdatedDate}
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-zinc-300">
            
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">1. Acceptance of Terms</h2>
              <p>Welcome to <strong>Stupendous Interior</strong>.</p>
              <p>
                By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the website.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">2. About Our Website</h2>
              <p>
                <strong>Stupendous Interior</strong> operates a furniture and interior solutions catalogue website.
              </p>
              <p>
                The website is intended to provide information about our products and services and allow customers to submit quotation requests for products of interest.
              </p>
              <p>
                The website does not facilitate direct online purchases, payments, or order confirmations.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">3. Product Information</h2>
              <p>
                We strive to ensure that product descriptions, specifications, dimensions, images, and other information are accurate.
              </p>
              <p>However:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Product images are for illustrative purposes only.</li>
                <li>Actual colors, finishes, materials, and textures may vary.</li>
                <li>Product dimensions may vary slightly due to manufacturing tolerances.</li>
                <li>Product specifications may change without prior notice.</li>
              </ul>
              <p>
                <strong>Stupendous Interior</strong> does not guarantee that all product information will always be complete, current, or error-free.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">4. Quotation Requests</h2>
              <p>Customers may add products to the quotation cart and submit a quotation request.</p>
              <p>Submission of a quotation request:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Does not constitute a purchase.</li>
                <li>Does not guarantee product availability.</li>
                <li>Does not create a binding agreement between the customer and <strong>Stupendous Interior</strong>.</li>
                <li>Does not guarantee that a quotation will be issued.</li>
              </ul>
              <p>
                Our team may contact customers using the information provided to discuss pricing, availability, delivery, installation, and related matters.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3 bg-slate-50 dark:bg-zinc-805/20 p-5 rounded-2xl border border-slate-150 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">5. Pricing</h2>
              <p>Product prices are not displayed on the website.</p>
              <p>
                Pricing information is provided only through quotations issued by <strong>Stupendous Interior</strong>.
              </p>
              <p>All quotations are subject to:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1 text-slate-500 dark:text-zinc-400">
                <li>Product availability</li>
                <li>Applicable taxes</li>
                <li>Delivery charges</li>
                <li>Installation charges (if applicable)</li>
                <li>Quotation validity period</li>
              </ul>
              <p className="mt-2 text-xs">
                <strong>Stupendous Interior</strong> reserves the right to modify prices at any time before acceptance of a quotation.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">6. Product Availability</h2>
              <p>Product availability may change without notice.</p>
              <p>
                Submission of a quotation request does not reserve or guarantee availability of any product.
              </p>
              <p>
                <strong>Stupendous Interior</strong> reserves the right to discontinue products or modify product offerings at any time.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">7. User Responsibilities</h2>
              <p>By using this website, you agree to:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Provide accurate and truthful information.</li>
                <li>Use the website only for lawful purposes.</li>
                <li>Not attempt to disrupt, damage, or interfere with website operations.</li>
                <li>Not misuse quotation forms, contact forms, or communication channels.</li>
              </ul>
              <p>
                <strong>Stupendous Interior</strong> reserves the right to refuse service or restrict access to users who violate these terms.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">8. Intellectual Property</h2>
              <p>All content on this website, including but not limited to:</p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Logos, names and wordmarks</li>
                <li>Product images, catalogs and descriptions</li>
                <li>Layouts, templates and CSS designs</li>
                <li>Branding graphics and vectors</li>
              </ul>
              <p>
                is the property of <strong>Stupendous Interior</strong> or its respective licensors and is protected by applicable intellectual property laws.
              </p>
              <p className="text-xs text-slate-400">
                No content may be copied, reproduced, distributed, modified, or used without prior written permission.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">9. Third-Party Links</h2>
              <p>The website may contain links to third-party websites.</p>
              <p>
                <strong>Stupendous Interior</strong> is not responsible for the content, availability, security, or privacy practices of external websites.
              </p>
              <p>Accessing third-party websites is at the user's own risk.</p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">10. Disclaimer</h2>
              <p>The website and its contents are provided on an "as is" and "as available" basis.</p>
              <p>
                <strong>Stupendous Interior</strong> makes no warranties, express or implied, regarding:
              </p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Accuracy of information</li>
                <li>Website availability</li>
                <li>Product suitability for a particular purpose</li>
                <li>Freedom from technical errors or interruptions</li>
              </ul>
              <p className="text-xs text-slate-400">
                Users rely on website information at their own discretion.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, <strong>Stupendous Interior</strong> shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-sm pl-4 space-y-1.5 text-slate-500 dark:text-zinc-400">
                <li>Indirect or consequential losses</li>
                <li>Loss of profits or business opportunities</li>
                <li>Website downtime or interruptions</li>
                <li>Errors or omissions in website content</li>
                <li>Delays caused by third parties</li>
              </ul>
              <p className="text-xs text-slate-400">
                Our total liability, if any, shall be limited to the extent permitted under applicable law.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">12. Privacy</h2>
              <p>
                Your use of this website is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">13. Changes to These Terms</h2>
              <p>
                <strong>Stupendous Interior</strong> reserves the right to update or modify these Terms of Service at any time.
              </p>
              <p>Changes become effective immediately upon publication on this website.</p>
              <p className="text-sm">
                Continued use of the website after changes are posted constitutes acceptance of the revised Terms.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">14. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and interpreted in accordance with the laws of India.
              </p>
              <p>
                Any disputes arising from or relating to the use of this website shall be subject to the exclusive jurisdiction of the courts located in Imphal, Manipur.
              </p>
            </section>

            <hr className="border-slate-100 dark:border-zinc-800" />

            <section className="space-y-3 bg-slate-50 dark:bg-zinc-800/10 p-6 rounded-2xl border border-slate-150 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 font-serif">15. Contact Information</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us:
              </p>
              
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                <p><strong>Stupendous Interior</strong></p>
                <p>Kwakeithel Ningthemkol Near Maruti Suzuki Arena,</p>
                <p>Imphal West, Manipur, India - 795001</p>
                <p><strong>Email:</strong> <a href="mailto:info@stupendousinteriors.com" className="text-brand-red hover:underline">info@stupendousinteriors.com</a></p>
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
