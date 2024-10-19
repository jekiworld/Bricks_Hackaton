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
            des: "We use a motherboard to connect and allow communication between all the components of a computer, including the CPU, RAM, storage, and peripheral devices. It acts as the central hub that enables power distribution and data exchange across these parts.",
        },
        {
            imgSrc: "images/motherboard.png",
            title: "Motherboard",
            topic: "Motherboard",
            des: "A motherboard is the main circuit board in a computer that connects and allows communication between all the essential components, such as the CPU, RAM, storage devices, and other peripherals. It serves as the backbone of the system, providing slots and ports for expansion and functionality.",
            
        },
        {
            imgSrc: "images/img1.png",
            title: "Graphics Card",
            topic: "GPU",
            des: "A graphics card is a hardware component responsible for rendering images, videos, and animations on the computer’s display. It is crucial for gaming, video editing, and 3D rendering.",
           
        },
        {
            imgSrc: "images/oper.png",
            title: "RAM",
            topic: "RAM",
            des: "RAM (Random Access Memory) is a type of computer memory that can be accessed randomly and is used to store data temporarily while a computer is running.",
            
        },
        {
            imgSrc: "images/img5.png",
            title: "Motherboard",
            topic: "Motherboard5",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
           
        },
        {
            imgSrc: "images/img6.png",
            title: "Motherboard",
            topic: "Motherboard",
            des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.",
            
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
                                <div className="checkout" style={{ marginTop: "15px" }}>
                                    <button>OPEN 3D modal</button>
                                    <button className="open-chat-button">OPEN CHAT WITH {item.title}</button>
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












// import React, { useEffect, useRef, useState } from "react";
// import styles from "./Decomposed.css";
// import { ReactComponent as Right } from './icons/arrow-right.svg';
// import { ReactComponent as Left } from './icons/arrow-left.svg';

// const Decomposed = ({ uploadedItems }) => {
//     const [items, setItems] = useState([]); // Изначально массив пустой
//     const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки

//     useEffect(() => {
//         if (uploadedItems && uploadedItems.length > 0) {
//             setItems(prevItems => [...prevItems, ...uploadedItems]);
//         }
//     }, [uploadedItems]);

//     const nextButtonRef = useRef(null);
//     const prevButtonRef = useRef(null);
//     const carouselRef = useRef(null);
//     const listHTMLRef = useRef(null);
//     const backButtonRef = useRef(null);
//     const [unAcceppClick, setUnAcceppClick] = useState(null);

//     const showSlider = (type) => {
//         if (!nextButtonRef.current || !prevButtonRef.current) return;

//         setIsLoading(true); // Начало загрузки

//         nextButtonRef.current.style.pointerEvents = "none";
//         prevButtonRef.current.style.pointerEvents = "none";

//         carouselRef.current.classList.remove("next", "prev");
//         const items = listHTMLRef.current.children;

//         if (type === "next") {
//             listHTMLRef.current.appendChild(items[0]);
//             carouselRef.current.classList.add("next");
//         } else {
//             listHTMLRef.current.prepend(items[items.length - 1]);
//             carouselRef.current.classList.add("prev");
//         }

//         clearTimeout(unAcceppClick);
//         setUnAcceppClick(
//             setTimeout(() => {
//                 nextButtonRef.current.style.pointerEvents = "auto";
//                 prevButtonRef.current.style.pointerEvents = "auto";
//                 setIsLoading(false); // Конец загрузки
//             }, 2000) // Длительность загрузки
//         );
//     };

//     return (
//         <div className="Decomposed">
//             <div className="carousel" ref={carouselRef}>
//                 {isLoading ? ( // Если состояние загрузки активно, показываем спиннер
//                     <div className="loading-spinner">
//                         Loading...
//                     </div>
//                 ) : (
//                     <div className="list" ref={listHTMLRef}>
//                         {items.length > 0 ? items.map((item, index) => (
//                             <div className="item" key={index}>
//                                 <img src={item.imgSrc} alt={item.title} />
//                                 <div className="introduce">
//                                     <div className="title">{item.title}</div>
//                                     <div className="topic">{item.topic}</div>
//                                     <div className="des">{item.des}</div>
//                                     <button className="seeMore"> OPEN 3D MODEL &#8599;</button>
//                                 </div>
//                             </div>
//                         )) : (
//                             <div>No items to display</div> // Показать, если нет элементов
//                         )}
//                     </div>
//                 )}
//                 <div className="arrows">
//                     <button id="prev" ref={prevButtonRef} onClick={() => showSlider("prev")}>
//                         <Left width="15" height="15" />
//                     </button>
//                     <button id="next" ref={nextButtonRef} onClick={() => showSlider("next")}>
//                         <Right width="15" height="15" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Decomposed;
