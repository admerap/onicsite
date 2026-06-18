'use client';

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);

    const changeTo = useCallback((index: number) => {
        if (index === current) return;
        setFading(true);
        setTimeout(() => {
            setCurrent(index);
            setFading(false);
        }, 150);
    }, [current]);

    const prev = useCallback(() => changeTo((current - 1 + images.length) % images.length), [changeTo, current, images.length]);
    const next = useCallback(() => changeTo((current + 1) % images.length), [changeTo, current, images.length]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [prev, next]);

    if (!images.length) return null;

    return (
        <div className="space-y-4">
            <div className="relative group overflow-hidden rounded-lg">
                <Image
                    src={images[current]}
                    alt={`Product Image ${current + 1}`}
                    width={1000}
                    height={1000}
                    className={`w-full h-auto object-cover transition-all duration-150 group-hover:scale-105 ${fading ? "opacity-0" : "opacity-100"}`}
                />
                {images.length > 1 && (
                    <>
                        <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full select-none">
                            {current + 1} / {images.length}
                        </span>
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => changeTo(index)}
                            aria-label={`View image ${index + 1}`}
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all cursor-pointer ${
                                current === index
                                    ? "ring-2 ring-blue-500 opacity-100"
                                    : "opacity-50 hover:opacity-80"
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImages;
