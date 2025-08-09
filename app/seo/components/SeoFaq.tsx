import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import Title from '../../components/Title'

// Array containing all the FAQ data
const faqData = [
  {
    value: 'item-1',
    question: 'What is SEO?',
    answer:
      "SEO, or Search Engine Optimization, is the practice of increasing the quantity and quality of traffic to your website through organic search engine results. At Jubutix, we craft tailored SEO strategies to improve your site's visibility and connect you with the right audience.",
  },
  {
    value: 'item-2',
    question: 'How does SEO work?',
    answer:
      'SEO works by optimizing your website for search engines like Google. This involves three core pillars: technical SEO (site structure), on-page SEO (content and keywords), and off-page SEO (backlinks and authority). Jubutix manages all these complex factors to ensure your website ranks higher than your competitors.',
  },
  {
    value: 'item-3',
    question: 'How long does SEO take to see results?',
    answer:
      "SEO is a long-term strategy. While some improvements can be seen within a few weeks, it typically takes 4-6 months to see significant results in rankings and traffic. With Jubutix, you're investing in sustainable growth that builds over time.",
  },
  {
    value: 'item-4',
    question: 'How much does it cost to implement an SEO campaign?',
    answer:
      "The cost of an SEO campaign varies depending on your business goals, industry competitiveness, and the scope of work. At Jubutix, we don't offer one-size-fits-all packages. Instead, we provide a custom quote after understanding your specific needs to ensure you get the best return on investment.",
  },
  {
    value: 'item-5',
    question: 'Can I do SEO myself?',
    answer:
      "While you can learn and implement basic SEO, it's a constantly evolving field that requires significant time, expertise, and specialized tools. Partnering with an agency like Jubutix allows you to focus on running your business while our experts handle the complexities of SEO to get you faster, better results.",
  },
  {
    value: 'item-6',
    question: 'Is SEO better than paid advertising (PPC)?',
    answer:
      'SEO and PPC (Pay-Per-Click) serve different purposes. SEO builds long-term organic traffic and credibility, while PPC offers immediate visibility for a cost. They work best together. Jubutix can help you develop an integrated digital strategy that leverages the strengths of both.',
  },
  {
    value: 'item-7',
    question: 'What are SEO best practices?',
    answer:
      'Key SEO best practices include creating high-quality, relevant content, ensuring your website is mobile-friendly and fast, building high-authority backlinks, and optimizing for user experience. Jubutix stays ahead of algorithm updates to ensure your strategy is always aligned with the latest best practices.',
  },
]

export function SeoFaq() {
  return (
    <section className='bg-primary '>
      <div className='container'>
        <Title title='Search Engine Optimization FAQs' subTitle='' h='text-white'/>

        <Accordion type='single' collapsible className='w-full'>
          {faqData.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value} className='border-b-gray-200'>
              <AccordionTrigger className='py-4 text-left text-lg font-medium text-gray-200 hover:no-underline'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='pb-4 text-base text-gray-400'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
