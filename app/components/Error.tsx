export default function ErrorAlert({
  error,
  openError,
}: {
  error: string;
  openError: boolean;
}) {
  return (
    <div
      className={`${!openError && "opacity-0"} bg-red-600 w-fit rounded shadow-lg p-2 text-white text-center transition-opacity duration-300`}
    >
      {error}
    </div>
  );
}
