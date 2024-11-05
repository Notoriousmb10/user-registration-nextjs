"use client";
import { DialogCard } from "../components/DialogCard";
import { UserDisplay } from "../components/UserDisplay";
export default function Home() {
  
  return (
    <div className="flex flex-col justify-center items-center gap-10 p-20">
      <div className="w-max">

      <DialogCard  />
      </div>
      <UserDisplay />
    </div>
  );
}
