"use client";

import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import data from "../../data/tiles.json";
import Lightbox, { Image } from "../lightbox";

function Grid() {
    const [images, setImages] = useState<Array<Image>>([]);
    const [filteredImages, setFilteredImages] = useState<Array<Image>>([]);

    const [size, setSize] = useState<number>(0);

    const [showFilters, setShowFilters] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const [allFilters, setAllFilters] = useState<Map<string, Set<string>>>(
        new Map(),
    );
    const [appliedFilters, setAppliedFilters] = useState<Array<string>>([]);

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

    const onFilterChange = () => {
        if (showFilters === true) {
            setFilteredImages(images);
        }
        setShowFilters(!showFilters);
        setShowAbout(false);
    };

    const onShowAbout = () => {
        setShowAbout(!showAbout);
        setShowFilters(false);
    };

    const selectExtremes = (all: boolean) => {
        document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => ((el as HTMLInputElement).checked = all));
        all ? setFilteredImages(images) : setFilteredImages([]);
        all
            ? setAppliedFilters(
                  Array.from(allFilters.values())
                      .map((v) => Array.from(v))
                      .reduce((a, b) => a.concat(b)),
              )
            : setAppliedFilters([]);
    };

    const applyFilter = (apply: string) => {
        let newFilters: Array<string> = appliedFilters;

        if (appliedFilters.includes(apply)) {
            newFilters = newFilters.filter((i) => i !== apply);
        } else {
            newFilters.push(apply);
        }

        const activeImgs: Array<Image> = [];

        images.forEach((image) => {
            const imgTags = image?.tags?.map((i) => i[1]);
            const intersection = imgTags?.filter((i) => newFilters.includes(i));
            if (intersection?.length === imgTags?.length) {
                activeImgs.push(image);
            }
        });
        setFilteredImages(activeImgs);
        setAppliedFilters(newFilters);
    };

    const buildFilters = () => {
        const filters = new Map<string, Set<string>>();
        const actFilters = new Set<string>();
        data.forEach((image) => {
            image.tags.forEach((tag) => {
                filters.set(
                    tag[0],
                    filters.get(tag[0])?.add(tag[1]) ??
                        new Set<string>().add(tag[1]),
                );
                actFilters.add(tag[1]);
            });
        });

        filters.forEach((v, k) => {
            const sorted = Array.from(v).sort();
            filters.set(k, new Set(sorted));
        });
        setAppliedFilters(Array.from(actFilters));
        setAllFilters(filters);
    };

    useEffect(() => {
        buildFilters();
        const imgs = data.sort(() => Math.random() - 0.5);
        setImages(imgs);
        setFilteredImages(imgs);
    }, []);

    useEffect(() => {
        setSize(filteredImages.length);
    }, [filteredImages]);

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-8">
            <h4 className="font-semibold text-5xl pb-5">
                koi&apos;s commission gallery
            </h4>
            <div className="justify-start flex items-center gap-5">
                <button
                    onClick={() => onFilterChange()}
                    className="hover:underline"
                >
                    filters
                </button>
                <button onClick={() => onRandom()} className="hover:underline">
                    surprise me!
                </button>
                <button
                    onClick={() => onShowAbout()}
                    className="hover:underline"
                >
                    about
                </button>
            </div>
            {showFilters && allFilters && (
                <div className=" border-double border-white border-2 p-2 m-2 rounded-lg flex flex-col align-center">
                    <div className="flex flex-row justify-between">
                        {Array.from(allFilters).map(([k, v]) => {
                            return (
                                <div className="px-5 py-2" key={k}>
                                    <p className="font-bold">{k}</p>
                                    <div
                                        className={
                                            v.size > 8
                                                ? "grid grid-cols-4 gap-x-3"
                                                : "grid grid-cols-1"
                                        }
                                    >
                                        {Array.from(v).map((i) => {
                                            return (
                                                <div
                                                    className="flex flex-row"
                                                    key={i}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        onChange={() =>
                                                            applyFilter(i)
                                                        }
                                                        key={i}
                                                        defaultChecked={true}
                                                    />
                                                    <p>&nbsp;{i}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-row justify-center">
                        <button
                            onClick={() => selectExtremes(true)}
                            className="hover:underline"
                        >
                            select all
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            onClick={() => selectExtremes(false)}
                            className="hover:underline"
                        >
                            clear all
                        </button>
                    </div>
                </div>
            )}
            {showAbout && (
                <div className="flex flex-row justify-between border-double border-white border-2 p-2 m-2 rounded-lg">
                    This gallery is SFW and shows personal commissions.
                    <br />
                    All artwork featured on this page was commissioned by me
                    (not drawn by me).
                    <br />
                    Please respect the wishes of the artists shown, and
                    don&apos;t repost/reproduce these images or use them for AI
                    training.
                    <br />
                    Thanks for looking!
                </div>
            )}
            <div className="justify-start flex items-center gap-5 pb-5">
                <p>{size} commissions displayed</p>
            </div>
            {filteredImages.length > 0 ? (
                <div className="2xl:columns-5 lg:columns-4 md:columns-3 sm:columns-1 space-y-5 gap-4">
                    {filteredImages.map((image) => {
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
            ) : (
                <div className="flex items-center text-center">
                    <p>There&apos;s nothing here...</p>
                </div>
            )}
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
