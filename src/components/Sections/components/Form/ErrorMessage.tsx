"use client";

import { AnimatePresence, motion } from "framer-motion";

export function ErrorMessage({ error }: { error: string | undefined }) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.span
          key={error}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-destructive"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
