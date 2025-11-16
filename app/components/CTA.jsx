import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-indigo text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-indigo-100 mb-8">
          Join 44 offices already using OPDMS for daily performance tracking
        </p>
        <Link
          href="/login"
          className="btn bg-white text-indigo-900 hover:bg-gray-100 btn-lg inline-flex items-center">
          Access Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
