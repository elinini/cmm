"use client";

import React, { useState } from "react";

export interface Image {
    id: number;
    url: string;
    title?: string;
    alt?: string;
    notes?: string;
    artist?: string;
    tags?: Array<Array<string>>;
}

interface IProps {
    image: Image;
    setLightBox: React.Dispatch<React.SetStateAction<Image | null | undefined>>;
}

function Lightbox({ image, setLightBox }: IProps) {
    const onClose = () => {
        setLightBox(null);
    };

    const formTwitterLink = (name: string) => {
        return `https://twitter.com/${name}`;
    };

    return (
        <div
            tabIndex={-1}
            onClick={() => onClose()}
            className="inset-0 fixed overflow-y-auto overflow-x-hidden justify-center items-center w-[100vw] h-[100vh] bg-gray-800 bg-opacity-70"
        >
            <div className="flex justify-center items-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col justify-self items-center rounded-lg bg-black border-double border-2 border-white-500 opacity-100 w-[90wh] h-[100vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b rounded-t w-[100%] h-5/6">
                        <p className="text-xl font-semibold">{image?.title}</p>
                        <p
                            onClick={() => onClose()}
                            className="text-sm hover:underline"
                        >
                            close
                        </p>
                    </div>
                    {/* Image & annotation */}
                    <div className="flex flex-col px-4 justify-center items-center pt-2 h-7/8 max-h-9/10 w-9/10">
                        <img
                            className="max-h-[95vh]"
                            src={image.url}
                            title={image?.title}
                        />
                    </div>
                    <div className="p-2 pb-5 flex flex-col justify-center items-center text-center">
                        {image?.artist && (
                            <>
                                <a
                                    className="hover:underline text-xs"
                                    href={formTwitterLink(image.artist)}
                                >
                                    Drawn by @{image.artist}
                                </a>
                                <p className="text-xs">{image?.notes ?? ""}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lightbox;
