import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">OPDMS</h3>
            <p className="text-sm">
              Office Performance & Delivery Management System for South Kolkata
              First Sub Division
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <p className="text-sm">
              South Kolkata First Sub Division
              <br />
              Department of Posts
              <br />
              Kolkata, West Bengal
              <br />
              Email: aspos.southkolkata1@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} India Post. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Built with Next.js • Timezone: Asia/Kolkata (IST)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
