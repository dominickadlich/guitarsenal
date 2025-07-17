'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

function PhotoLightbox({ photo, API_BASE_URL}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
        <img 
            alt={photo.name} 
            src={`${API_BASE_URL}${photo.image}`} 
            className="aspect-square w-full object-cover sm:rounded-lg" 
            onClick={() => setOpen(true)}
        />
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-6xl max-h-[95vh] sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              <div className="sm:flex sm:items-start">
                <img 
                    alt={photo.name}
                    src={`${API_BASE_URL}${photo.image}`}
                    className="w-[80vw] h-[80vh] object-contain sm:rounded-lg"
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default PhotoLightbox;