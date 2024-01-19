"use client";

import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import data from "../../data/tiles.json";
import Lightbox, { Image } from "../lightbox";


function Grid() {
    const [images, setImages] = useState<Array<Image>>([]);

    const [size, setSize] = useState<number>(0);

    const [showFilters, setShowFilters] = useState(false);

    const [lightBox, setLightBox] = useState<Image | null>();

    const onClick = (image: Image) => {
        setLightBox(image);
    };

    const onRandom = () => {
        const rInt = Math.floor(Math.random() * size);
        setLightBox(images[rInt]);
    };

    const toTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        setImages(data.sort(() => Math.random() - 0.5));
        setSize(data.length);
    }, []);

    const onFilterChange = () => {
        setShowFilters(!showFilters);
    };

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-8">
            <h4 className="font-semibold text-5xl pb-5">commissions by koi</h4>
            <div className="justify-start flex items-center gap-5">
                <button
                    onClick={() => onFilterChange()}
                    className="hover:underline"
                >
                    filters
                </button>
                {showFilters && (
                    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        hi
                    </div>
                )}
                <button onClick={() => onRandom()} className="hover:underline">
                    surprise me!
                </button>
            </div>
            <div className="justify-start flex items-center gap-5 pb-5">
                <p>{size} commissions displayed</p>
            </div>
            <div className="2xl:columns-5 lg:columns-4 md:columns-3 sm:columns-1 space-y-5 gap-4 place-items-start">
                {images.map((image) => {
                    return (
                        <LazyLoad offset={200} key={`${image.id}`}>
                            <div
                                className="flex h-min w-full object-cover"
                                onClick={() => onClick(image)}
                            >
                                <img src={image.url} loading="lazy" />
                            </div>
                        </LazyLoad>
                    );
                })}
            </div>
            {lightBox && (
                <Lightbox image={lightBox} setLightBox={setLightBox} />
            )}
            <p className="pt-10 hover:underline" onClick={() => toTop()}>
                Back to top?
            </p>
        </section>
    );
}

export default Grid;
