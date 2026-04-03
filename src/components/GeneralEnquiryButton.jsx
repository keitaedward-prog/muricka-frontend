import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

function GeneralEnquiryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gold text-deep-cobalt px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
      >
        General Enquiry
      </button>
      <EnquiryModal isOpen={open} onClose={() => setOpen(false)} isGeneral={true} />
    </>
  );
}

export default GeneralEnquiryButton;