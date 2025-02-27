
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-anime-gray mb-6">
                  At Vexora, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-2">Personal Data</h3>
                <p className="text-anime-gray mb-4">
                  When you register with our site or subscribe to our newsletter, we may ask for your email address, name, and other personal details. This information is collected only with your consent and is used to provide and improve our services to you.
                </p>
                
                <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
                <p className="text-anime-gray mb-6">
                  We may also collect information on how the website is accessed and used. This usage data may include information such as your computer's Internet Protocol address (IP address), browser type, pages visited, time spent on those pages, and other diagnostic data.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">3. Use of Data</h2>
                <p className="text-anime-gray mb-2">Vexora uses the collected data for various purposes:</p>
                <ul className="list-disc pl-6 mb-6 text-anime-gray space-y-2">
                  <li>To provide and maintain our website</li>
                  <li>To notify you about changes to our website</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our website</li>
                  <li>To monitor the usage of our website</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
                <p className="text-anime-gray mb-6">
                  Cookies are files with a small amount of data which may include an anonymous unique identifier. We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">5. Security of Data</h2>
                <p className="text-anime-gray mb-6">
                  The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">6. Service Providers</h2>
                <p className="text-anime-gray mb-6">
                  We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, perform website-related services, or assist us in analyzing how our website is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
                <p className="text-anime-gray mb-6">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-anime-gray">
                  If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
