import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ConfirmationModal = ({
  open,
  onClose,
  children,
}: ConfirmationModalProps) => {
  return (
    <section id="confirmation-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center ${
          open ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`

        flex flex-col justify-between items-center bg-foreground p-8 transition-all rounded-md
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover-text-gray-600 cursor-pointer"
          >
            <FiX />
          </button>

          {children}
        </div>
      </motion.div>
    </section>
  );
};

export default ConfirmationModal;
