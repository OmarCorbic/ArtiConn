import React from "react";

interface Props extends React.PropsWithChildren {
  hideModal: any;
}

const Modal = ({ hideModal, children }: Props) => {
  return (
    <div
      onClick={hideModal}
      id="modalBackground"
      className="fixed left-0 top-0 z-[9997] flex h-full w-full items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
    >
      <div className="rounded-md bg-white p-5">{children}</div>
    </div>
  );
};

export default Modal;
