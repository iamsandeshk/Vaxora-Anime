
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const Terms = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-anime-purple/10 text-anime-purple rounded-full text-sm font-medium mb-3">
                Legal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
              <p className="text-lg text-anime-gray max-w-2xl mx-auto">
                Last updated: February 25, 2024
              </p>
            </motion.div>

            <motion.div
              className="glass-card rounded-xl p-6 md:p-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                <p className="text-anime-gray mb-6">
                  These Terms and Conditions constitute a legally binding agreement made between you and Vexora. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
                <p className="text-anime-gray mb-6">
                  Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights. The Content and Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">3. User Representations</h2>
                <p className="text-anime-gray mb-2">By using the Site, you represent and warrant that:</p>
                <ul className="list-disc pl-6 mb-6 text-anime-gray space-y-2">
                  <li>You have the legal capacity and you agree to comply with these Terms;</li>
                  <li>You are not a minor in the jurisdiction in which you reside;</li>
                  <li>You will not access the Site through automated or non-human means;</li>
                  <li>You will not use the Site for any illegal or unauthorized purpose;</li>
                  <li>Your use of the Site will not violate any applicable law or regulation.</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">4. Prohibited Activities</h2>
                <p className="text-anime-gray mb-2">You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:</p>
                <ul className="list-disc pl-6 mb-6 text-anime-gray space-y-2">
                  <li>Systematically retrieve data to create a collection, compilation, database, or directory without written permission from us.</li>
                  <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information.</li>
                  <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                  <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
                  <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                  <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                  <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
                  <li>Upload or transmit viruses, Trojan horses, or other material that interferes with any party's uninterrupted use and enjoyment of the Site.</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">5. User Generated Contributions</h2>
                <p className="text-anime-gray mb-6">
                  The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Any Contribution you transmit to the Site will be treated as non-confidential and non-proprietary.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">6. Disclaimer</h2>
                <p className="text-anime-gray mb-6">
                  THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">7. Limitations of Liability</h2>
                <p className="text-anime-gray mb-6">
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
                <p className="text-anime-gray mb-6">
                  These Terms shall be governed by and defined following the laws of [your country/state]. Vexora and yourself irrevocably consent that the courts of [your country/state] shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-anime-gray mb-6">
                  We reserve the right, in our sole discretion, to make changes or modifications to these Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms, and you waive any right to receive specific notice of each such change.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-anime-gray">
                  In order to resolve a complaint regarding the Site or for more information concerning these Terms, please contact us at:
                </p>
                <ul className="text-anime-gray mt-2 space-y-1">
                  <li><strong>Owner:</strong> Sandesh K</li>
                  <li><strong>Email:</strong> <a href="mailto:try.sandeshk@gmail.com" className="text-anime-purple hover:underline">try.sandeshk@gmail.com</a></li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Terms;
