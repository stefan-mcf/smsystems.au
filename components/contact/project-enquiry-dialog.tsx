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

const ProjectEnquiryContext = createContext<(() => void) | null>(null);

export function ProjectEnquiryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hasOpened, setHasOpened] = useState(false);

  const openDialog = useCallback(() => {
    setHasOpened(true);
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
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
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
      >
        <header className="project-enquiry-dialog-header">
          <p id="project-enquiry-dialog-title">Start a project</p>
          <button className="project-enquiry-dialog-close" type="button" onClick={closeDialog}>
            Close
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
