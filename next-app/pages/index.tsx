    import CategoryTabs from "@/components/CategoryTabs";
import Videogrid from "@/components/Videogrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex-1 px-3 pb-3 w-full">
      <CategoryTabs />
      <Suspense fallback={<div>Loading videos...</div>}>
        <Videogrid />
      </Suspense>
    </main>
  );
}