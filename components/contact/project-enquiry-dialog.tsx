'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ProjectEnquiryForm } from '@/components/contact/project-enquiry-form';
import { pushMeasurementEvent } from '@/components/analytics/measurement';

const ProjectEnquiryContext = createContext<(() => void) | null>(null);

export function ProjectEnquiryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setHasOpened(true);
    if (!dialogRef.current?.open) {
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      // HubSpot renders its CAPTCHA beside the dialog. Native modal top-layer
      // isolation hides that challenge; keep our page inert without hiding it.
      dialogRef.current?.show();
      setIsOpen(true);
      pushMeasurementEvent('open_project_enquiry', { form_name: 'sm_project_enquiry_v1' });
      closeButtonRef.current?.focus({ preventScroll: true });
      if (dialogRef.current) {
        dialogRef.current.scrollTop = 0;
        dialogRef.current.scrollLeft = 0;
      }
    }
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    if (window.location.hash === '#project-enquiry') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus({ preventScroll: true });
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#project-enquiry') {
        openDialog();
      }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [openDialog]);

  return (
    <ProjectEnquiryContext.Provider value={openDialog}>
      <div className="project-enquiry-background" inert={isOpen}>
        {children}
      </div>
      {isOpen ? <div className="project-enquiry-backdrop" aria-hidden="true" onClick={closeDialog} /> : null}
      <dialog
        className="project-enquiry-dialog"
        id="project-enquiry"
        ref={dialogRef}
        aria-labelledby="project-enquiry-dialog-title"
        closedby="closerequest"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            closeDialog();
          }
          if (event.key !== 'Tab') return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), iframe, [tabindex="0"]',
          )).filter((element) => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => {
          setIsOpen(false);
          if (window.location.hash === '#project-enquiry') {
            window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom
            ) {
              closeDialog();
            }
          }
        }}
      >
        <header className="project-enquiry-dialog-header">
          <p id="project-enquiry-dialog-title">Start a project</p>
          <button
            className="project-enquiry-dialog-close"
            type="button"
            ref={closeButtonRef}
            aria-label="Close project enquiry"
            onClick={closeDialog}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        {hasOpened ? <ProjectEnquiryForm /> : null}
      </dialog>
    </ProjectEnquiryContext.Provider>
  );
}

export function ProjectEnquiryTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const openDialog = useContext(ProjectEnquiryContext);

  if (!openDialog) {
    throw new Error('ProjectEnquiryTrigger must be used inside ProjectEnquiryProvider.');
  }

  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-controls="project-enquiry"
      onClick={openDialog}
    >
      {children}
    </button>
  );
}
