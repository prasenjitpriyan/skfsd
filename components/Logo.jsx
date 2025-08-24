import { Building2 } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center bg-black dark:bg-white rounded-full p-4">
      <Link href={'/'}>
        <Building2 className="h-10 w-10 text-white dark:text-black" />
      </Link>
    </div>
  );
};

export default Logo;
