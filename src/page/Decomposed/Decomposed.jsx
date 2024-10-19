import React, { useEffect, useRef, useState } from "react";
import styles from "./Decomposed.css";
import { ReactComponent as Right } from './icons/arrow-right.svg';
import { ReactComponent as Left } from './icons/arrow-left.svg';


const Decomposed = () => {
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
    const carouselRef = useRef(null);
    const listHTMLRef = useRef(null);
    const backButtonRef = useRef(null);
    const [unAcceppClick, setUnAcceppClick] = useState(null);

    const items = [
        {
            imgSrc: "images/img1.png",
            title: "Motherboard",
            topic: "Motherboard1",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            specifications: [
                { label: "Used Time", value: "6 hours" },
                { label: "Charging port", value: "Type-C" },
                { label: "Compatible", value: "Android" },
                { label: "Bluetooth", value: "5.3" },
                { label: "Controlled", value: "Touch" }
            ]
        },
        {
            imgSrc: "images/img2.png",
            title: "Motherboard",
            topic: "Motherboard2",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            specifications: [
                { label: "Used Time", value: "6 hours" },
                { label: "Charging port", value: "Type-C" },
                { label: "Compatible", value: "Android" },
                { label: "Bluetooth", value: "5.3" },
                { label: "Controlled", value: "Touch" }
            ]
        },
        {
            imgSrc: "images/img3.png",
            title: "Motherboard",
            topic: "Motherboard3",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            specifications: [
                { label: "Used Time", value: "6 hours" },
                { label: "Charging port", value: "Type-C" },
                { label: "Compatible", value: "Android" },
                { label: "Bluetooth", value: "5.3" },
                { label: "Controlled", value: "Touch" }
            ]
        },
        {
            imgSrc: "images/img4.png",
            title: "Motherboard",
            topic: "Motherboard4",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            specifications: [
                { label: "Used Time", value: "6 hours" },
                { label: "Charging port", value: "Type-C" },
                { label: "Compatible", value: "Android" },
                { label: "Bluetooth", value: "5.3" },
                { label: "Controlled", value: "Touch" }
            ]
        },
        {
            imgSrc: "images/img5.png",
            title: "Motherboard",
            topic: "Motherboard5",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            specifications: [
                { label: "Used Time", value: "6 hours" },
                { label: "Charging port", value: "Type-C" },
                { label: "Compatible", value: "Android" },
                { label: "Bluetooth", value: "5.3" },
                { label: "Controlled", value: "Touch" }
            ]
        },
        {
            imgSrc: "images/img6.png",
            title: "Motherboard",
            topic: "Motherboard",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            specifications: [
                { label: "Used Time", value: "6 hours" },
                { label: "Charging port", value: "Type-C" },
                { label: "Compatible", value: "Android" },
                { label: "Bluetooth", value: "5.3" },
                { label: "Controlled", value: "Touch" }
            ]
        }
    ];

    const showSlider = (type) => {
        if (!nextButtonRef.current || !prevButtonRef.current) return;

        nextButtonRef.current.style.pointerEvents = "none";
        prevButtonRef.current.style.pointerEvents = "none";

        carouselRef.current.classList.remove("next", "prev");
        const items = listHTMLRef.current.children;

        if (type === "next") {
            listHTMLRef.current.appendChild(items[0]);
            carouselRef.current.classList.add("next");
        } else {
            listHTMLRef.current.prepend(items[items.length - 1]);
            carouselRef.current.classList.add("prev");
        }

        clearTimeout(unAcceppClick);
        setUnAcceppClick(
            setTimeout(() => {
                nextButtonRef.current.style.pointerEvents = "auto";
                prevButtonRef.current.style.pointerEvents = "auto";
            }, 2000)
        );
    };

    useEffect(() => {
        const handleNextClick = () => showSlider("next");
        const handlePrevClick = () => showSlider("prev");
        const handleSeeMoreClick = () => {
            carouselRef.current.classList.remove("next", "prev");
            carouselRef.current.classList.add("showDetail");
        };
        const handleBackClick = () => {
            carouselRef.current.classList.remove("showDetail");
        };

        nextButtonRef.current.addEventListener("click", handleNextClick);
        prevButtonRef.current.addEventListener("click", handlePrevClick);

        const seeMoreButtons = document.querySelectorAll(".seeMore");
        seeMoreButtons.forEach((button) =>
            button.addEventListener("click", handleSeeMoreClick)
        );

        backButtonRef.current.addEventListener("click", handleBackClick);

        return () => {
            nextButtonRef.current.removeEventListener("click", handleNextClick);
            prevButtonRef.current.removeEventListener("click", handlePrevClick);
            seeMoreButtons.forEach((button) =>
                button.removeEventListener("click", handleSeeMoreClick)
            );
            backButtonRef.current.removeEventListener("click", handleBackClick);
        };
    }, [unAcceppClick]);

    return (
        <div className="Decomposed">
            <header>
                <nav>
                    <a href="">Home</a>
                    <a href="">Info</a>
                    <a href="">Contact</a>
                </nav>
            </header>
            <div className="carousel" ref={carouselRef}>
                <div className="list" ref={listHTMLRef}>
                    {items.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.imgSrc} alt={item.title} />
                            <div className="introduce">
                                <div className="title">DESIGN SLIDER</div>
                                <div className="topic">{item.topic}</div>
                                <div className="des">{item.des}</div>
                                <button className="seeMore"> OPEN 3D MODEL &#8599;</button>
                            </div>
                            <div className="detail">
                                <div className="title">{item.title}</div>
                                <div className="des">{item.des}</div>
                                <div className="specifications">
                                    {item.specifications.map((spec, specIndex) => (
                                        <div key={specIndex}>
                                            <p>{spec.label}</p>
                                            <p>{spec.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="checkout">
                                    <button>BACK</button>
                                    <button>OPEN CHAT WITH {item.title}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="arrows">
                    <button id="prev" ref={prevButtonRef}>
                        <Left width="15" height="15" />
                    </button>
                    <button id="next" ref={nextButtonRef}>
                        <Right width="15" height="15" />
                    </button>
                    <button id="back" ref={backButtonRef}>
                        See All Components&#8599;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Decomposed;
