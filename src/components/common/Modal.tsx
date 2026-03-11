import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
}

/**
 * Base Modal component — a centered overlay card.
 *
 * Design decision (from the Figma):
 * - Modals in DevTime cannot be closed by clicking the backdrop
 * - They can only be closed via an explicit button inside
 * So unlike daily-chirp, we intentionally do NOT close on backdrop click.
 *
 * Usage:
 *   <Modal isOpen={isDuplicateLoginOpen}>
 *     <p>Some message</p>
 *     <Button onClick={handleClose}>Confirm</Button>
 *   </Modal>
 */
function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null

  return (
    // Backdrop — fixed overlay, blocks interaction with the page
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal card */}
      <div className="bg-white rounded-xl shadow-xl p-6 w-[340px] flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

export default Modal
