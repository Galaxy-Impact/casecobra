import React, { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FormItemProps {
  children: ReactNode;
  error?: string;
}

const variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    height: "24px",
    opacity: 100,
  },
};

const FormItem: FC<FormItemProps> = ({ children, error }) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <AnimatePresence>
        {error ? (
          <motion.small
            variants={variants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{
              duration: 0.2,
              ease: "easeOut",
              type: "tween",
            }}
            className="text-red-500 -mt-2 text-sm text-end"
          >
            {error}
          </motion.small>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default FormItem;
