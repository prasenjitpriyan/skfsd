'use client';

import { motion } from 'framer-motion';
import { ModeToggle } from './toggle';

export default function ModeToggleMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute top-4 right-4">
      <ModeToggle />
    </motion.div>
  );
}
