import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        src="/loading.svg"
        alt="Loading..."
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
}
