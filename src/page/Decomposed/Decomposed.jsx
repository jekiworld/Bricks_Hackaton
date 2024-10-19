import React, { useEffect, useRef, useState } from "react";
import styles from "./Decomposed.css";
import { ReactComponent as Right } from './icons/arrow-right.svg';
import { ReactComponent as Left } from './icons/arrow-left.svg';
import { useNavigate } from "react-router-dom";

const Decomposed = ({items, handleObjectUrl}) => {
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
    const carouselRef = useRef(null);
    const listHTMLRef = useRef(null);
    const backButtonRef = useRef(null);
    const [unAcceppClick, setUnAcceppClick] = useState(null);

    const navigate = useNavigate();  // Add this

    

    const showSlider = (type) => {
        // Ensure refs are available before proceeding
        if (!nextButtonRef.current || !prevButtonRef.current || !carouselRef.current || !listHTMLRef.current) return;
    
        // Disable button clicks temporarily
        nextButtonRef.current.style.pointerEvents = "none";
        prevButtonRef.current.style.pointerEvents = "none";
    
        // Remove any existing animation classes
        carouselRef.current.classList.remove("next", "prev");
    
        // Get the items in the list and ensure it has children
        const items = listHTMLRef.current.children;
        if (!items || items.length === 0) return;  // Add this check to avoid manipulating an empty list
    
        // Perform the sliding logic
        if (type === "next") {
            // Append the first item to the end of the list
            listHTMLRef.current.appendChild(items[0]);
            carouselRef.current.classList.add("next");
        } else {
            // Prepend the last item to the start of the list
            listHTMLRef.current.prepend(items[items.length - 1]);
            carouselRef.current.classList.add("prev");
        }
    
        // Re-enable button clicks after 2 seconds
        clearTimeout(unAcceppClick);
        setUnAcceppClick(
            setTimeout(() => {
                nextButtonRef.current.style.pointerEvents = "auto";
                prevButtonRef.current.style.pointerEvents = "auto";
            }, 2000)
        );
    };

    useEffect(() => {
        // Ensure refs are available before attaching event listeners
        if (nextButtonRef.current && prevButtonRef.current && backButtonRef.current) {
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
                // Ensure refs still exist before removing listeners
                if (nextButtonRef.current) {
                    nextButtonRef.current.removeEventListener("click", handleNextClick);
                }
                if (prevButtonRef.current) {
                    prevButtonRef.current.removeEventListener("click", handlePrevClick);
                }
                seeMoreButtons.forEach((button) =>
                    button.removeEventListener("click", handleSeeMoreClick)
                );
                if (backButtonRef.current) {
                    backButtonRef.current.removeEventListener("click", handleBackClick);
                }
            };
        }
    }, [unAcceppClick]);

    const handleOpen3DModal = (object) => {
        handleObjectUrl(object);
        navigate("/3d");  // Navigate to /3d after handling object URL
    };

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
                            <img src={`http://192.168.0.127:8000${item.imgSrc}`} alt={item.title} />
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
                                    <button onClick={() => handleOpen3DModal(item.object)}>OPEN 3D modal</button>
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
