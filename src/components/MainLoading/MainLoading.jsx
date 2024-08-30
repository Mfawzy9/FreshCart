import React from "react";

export default function MainLoading() {
  return (
    <>
      <div className="loading fixed inset-0 flex justify-center items-center m-[0!important] bg-black z-50">
        <span className="loader" />
      </div>
    </>
  );
}
