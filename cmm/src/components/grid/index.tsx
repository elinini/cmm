"use client";

import React, { useEffect, useState } from "react";
import data from "../../data/tiles.json";
import Lightbox, { Image } from "../lightbox";
import LazyLoad from "react-lazy-load";

function Grid() {
    const [images, setImages] = useState<Array<Image>>([]);

    const [size, setSize] = useState<number>(0);

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
        setImages(data.sort((_) => 0.5 - Math.random()));
        setSize(data.length);
    }, []);

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-8">
            <h4 className="font-semibold text-5xl pb-5">commissions by koi</h4>
            <div className="justify-start flex items-center gap-5">
                {/* <button>filters</button> */}
                <button onClick={() => onRandom()} className="hover:underline">
                    surprise me!
                </button>
            </div>
            <div className="justify-start flex items-center gap-5 pb-5">
                <p>{size} commissions displayed</p>
            </div>
            <div className="columns-4 space-y-4 gap-4 place-items-start">
                {images.map((image) => {
                    return (
                        <LazyLoad offset={500}>
                            <div
                                className="flex h-min w-full object-cover"
                                key={`${image.id}`}
                                onClick={() => onClick(image)}
                            >
                                <img src={image.url} />
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
