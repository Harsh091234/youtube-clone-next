import HistoryContent from "@/components/HistoryContent";
import React, { Suspense, useEffect, useState } from "react";

const index = () => {
  return (
    <main className="max-sm:w-full flex-1 p-3 sm:p-6 ">
      <div className="max-sm:w-full  max-w-4xl">
        <h1 className="text-2xl font-bold mb-3  sm:mb-6">Watch history</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <HistoryContent />
        </Suspense>
      </div>
    </main>
  );
};

export default index;