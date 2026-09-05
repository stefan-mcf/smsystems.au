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
  const [hasOpened, setHasOpened] = useState(false);

  const openDialog = useCallback(() => {
    setHasOpened(true);
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
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
      {children}
      <dialog
        className="project-enquiry-dialog"
        id="project-enquiry"
        ref={dialogRef}
        aria-labelledby="project-enquiry-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => {
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
