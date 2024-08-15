import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-dvh p-4 flex flex-col items-center">
      <SignUp />
    </div>
  );
}
