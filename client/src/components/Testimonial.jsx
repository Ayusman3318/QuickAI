import React from 'react';
import { assets } from '../assets/assets';

const cardsData = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Briar Martin',
        handle: '@neilstellar',
        date: 'April 20, 2025',
        review: 'QuickAI is incredible! I use it daily for content creation.',
        stars: 5
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Avery Johnson',
        handle: '@averywrites',
        date: 'May 10, 2025',
        review: 'The AI tools are powerful and easy to use.',
        stars: 4
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'Jordan Lee',
        handle: '@jordantalks',
        date: 'June 5, 2025',
        review: 'Best AI platform I have ever used!',
        stars: 5
    },
    {
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        name: 'Avery Johnson',
        handle: '@averywrites',
        date: 'May 10, 2025',
        review: 'Amazing features and excellent results.',
        stars: 5
    },
    {
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200',
        name: 'Liam Patel',
        handle: '@liamcodes',
        date: 'July 12, 2025',
        review: 'Clean interface and super fast. Love using QuickAI every day!',
        stars: 5
    },
    {
        image: 'https://i.pravatar.cc/200?u=isla_nguyen',
        name: 'Isla Nguyen',
        handle: '@islainnovates',
        date: 'July 18, 2025',
        review: 'Very impressed with the output quality. Definitely recommend.',
        stars: 4
    },
    {
        image: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?q=80&w=200',
        name: 'Noah Garcia',
        handle: '@noahwrites',
        date: 'July 20, 2025',
        review: 'QuickAI helped me boost productivity like never before!',
        stars: 5
    }
];

const StarRating = ({ rating }) => {
    return (
        <div className="flex gap-1 my-2">
            {[...Array(5)].map((_, index) => (
                <img 
                    key={index}
                    src={index < rating ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="w-4 h-4"
                />
            ))}
        </div>
    );
};

const Testimonial = () => {
    return (
        <div className="w-full py-16">
            {/* Add header section */}
            <div className="text-center mb-16">
                <h2 className="text-2xl font-bold mb-4">Trusted by 10k+ Quick Thinkers!</h2>
                <div className="flex items-center justify-center gap-2">
                    <img src={assets.user_group} alt="users" className="h-6" />
                    <p className="text-gray-600">Join our community, Quickly!</p>
                </div>
            </div>

            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }
                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {cardsData.map((card, index) => (
                        <div key={index} className="flex-none w-80 p-4">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <img src={card.image} alt={card.name} className="w-12 h-12 rounded-full" />
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-lg">{card.name}</h3>
                                        <p className="text-gray-500 text-sm">{card.handle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <StarRating rating={card.stars} />
                                    <span className="text-gray-400 text-sm">({card.stars}.0)</span>
                                </div>
                                <p className="text-gray-600 my-3 font-medium italic">
                                    "{card.review}"
                                </p>
                                <p className="text-gray-400 text-sm mt-4">{card.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-5 pb-10">
                    {cardsData.map((card, index) => (
                        <div key={`reverse-${index}`} className="flex-none w-80 p-4">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center">
                                    <img src={card.image} alt={card.name} className="w-12 h-12 rounded-full" />
                                    <div className="ml-3">
                                        <h3 className="font-semibold">{card.name}</h3>
                                        <p className="text-gray-500 text-sm">{card.handle}</p>
                                    </div>
                                </div>
                                <StarRating rating={card.stars} />
                                <p className="text-gray-600 my-3 font-medium italic">
                                    "{card.review}"
                                </p>
                                <p className="text-gray-400 text-sm">{card.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </div>
    );
};

export default Testimonial;