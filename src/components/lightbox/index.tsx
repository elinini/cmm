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
    const [showInfo, setShowInfo] = useState(false);

    const onClose = () => {
        setLightBox(null);
        setShowInfo(false);
    };

    const onShowInfo = () => {
        setShowInfo(!showInfo);
    };

    const formTwitterLink = (name: string) => {
        return `https://twitter.com/${name}`;
    };

    return (
        <div
            tabIndex={-1}
            onClick={() => onClose()}
            className="fixed overflow-y-auto overflow-x-hidden justify-center items-center h-full md:inset-0 bg-gray-800 bg-opacity-70"
        >
            <div className="flex justify-center items-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col justify-self items-center rounded-lg bg-black border-double border-2 border-white-500 opacity-100 w-9/10 h-[100vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t w-9/10 h-5/6">
                        <p className="text-xl font-semibold">{image?.title}</p>
                        <p
                            onClick={() => onClose()}
                            className="text-sm hover:underline"
                        >
                            close
                        </p>
                    </div>
                    {/* Image & annotation */}
                    <div className="flex flex-col px-4 justify-between items-center pt-2 h-7/8 max-h-9/10 w-9/10">
                        <img
                            className="max-h-[95%]"
                            src={image.url}
                            title={image?.title}
                        />
                        <div className="pt-2 pb-0 flex flex-col justify-center items-center">
                            {showInfo ? (
                                image?.artist ? (
                                    <>
                                        <a
                                            className="hover:underline text-xs"
                                            href={formTwitterLink(image.artist)}
                                        >
                                            Drawn by @{image.artist}
                                        </a>
                                        <p className="text-xs">
                                            {image?.notes ?? ""}
                                        </p>
                                        <p
                                            onClick={() => onShowInfo()}
                                            className="hover:underline text-xs"
                                        >
                                            less
                                        </p>
                                    </>
                                ) : (
                                    <p
                                        onClick={() => onShowInfo()}
                                        className="hover:underline text-xs"
                                    >
                                        less
                                    </p>
                                )
                            ) : (
                                <p
                                    onClick={() => onShowInfo()}
                                    className="hover:underline text-xs"
                                >
                                    more
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lightbox;