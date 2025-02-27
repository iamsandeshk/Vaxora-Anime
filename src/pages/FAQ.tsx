
import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ data
const faqData = [
  {
    question: "What is Vexora?",
    answer: "Vexora is a comprehensive platform dedicated to anime content, providing information about the latest series, episode updates, and resources for anime enthusiasts of all levels."
  },
  {
    question: "When does Solo Leveling Episode 9 release?",
    answer: "Solo Leveling Episode 9 is scheduled to release on Saturday, March 1st at 10:00 PM. You can find the exact countdown on our homepage."
  },
  {
    question: "How can I contact the site owner?",
    answer: "You can contact Sandesh K, the owner of Vexora, via email at try.sandeshk@gmail.com for any inquiries, suggestions, or feedback."
  },
  {
    question: "Where can I legally watch anime?",
    answer: "We encourage supporting the anime industry by watching on legal streaming platforms such as Crunchyroll, Funimation, Netflix, and Hulu. You can find more information on our Anime Source page."
  },
  {
    question: "Do you provide anime downloads?",
    answer: "No, Vexora does not host or provide downloads for anime content. We are an informational resource that directs users to legal streaming platforms."
  },
  {
    question: "How often is the site updated with new content?",
    answer: "We strive to update our content regularly, particularly around new episode releases and anime announcements. Major updates typically occur weekly, with smaller updates happening more frequently."
  },
  {
    question: "Can I suggest an anime to be featured on the site?",
    answer: "Absolutely! We welcome suggestions from our community. Please use the contact email to send your recommendations, and we'll consider featuring them in our upcoming content."
  },
  {
    question: "Do you have a community Discord or forum?",
    answer: "Yes, we have a Discord community where fans can discuss anime, share recommendations, and get the latest updates. You can find the link to join on our About Us page."
  },
  {
    question: "How can I stay updated on new releases?",
    answer: "You can subscribe to our newsletter for regular updates, follow us on social media, or join our Discord community. All these options will keep you informed about new episodes, releases, and site content."
  },
  {
    question: "Is the content on Vexora suitable for all ages?",
    answer: "While we strive to maintain a family-friendly environment, anime covers a wide range of genres and themes, some of which may not be suitable for younger audiences. We recommend parental guidance and checking age ratings for specific anime titles."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
                Support
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-anime-gray max-w-2xl mx-auto">
                Find answers to common questions about Vexora and our content
              </p>
            </motion.div>

            <motion.div
              className="space-y-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {faqData.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="glass-card rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <button
                    className="w-full flex justify-between items-center p-5 text-left"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={openIndex === index}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <div className="text-anime-purple">
                      {openIndex === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 pt-0 text-anime-gray">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="glass-card rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-anime-gray mb-6 max-w-2xl mx-auto">
                If you couldn't find the answer to your question, feel free to reach out to us directly.
              </p>
              <a 
                href="mailto:try.sandeshk@gmail.com" 
                className="bg-anime-purple text-white px-6 py-3 rounded-full hover:bg-anime-purple/90 transition-colors inline-block"
              >
                Contact Support
              </a>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default FAQ;
