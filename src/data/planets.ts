export interface Planet {
  id: string;
  name: string;
  moons: number;
  image: string;
  description: string[];
  footnotes: string[];
}

export const PLANETS_INTRO = {
  title: "About the planets",
  description:
    "The planets in the Tokorel Universe are unique. Learn about each one and return frequently as we continue to update or astrological observations! This page is updated weekly.",
};

export const PLANETS: Planet[] = [
  {
    id: "khizara",
    name: "Khizara",
    moons: 2,
    image: "/images/planets/khizara.png",
    description: [
      "Khizara is the second planet in a 6 planet solar system. It's green sea gives it a unique emerald appearance from space, and it's landmass which is an incomplete circle around the equator makes it recognizable instantly. Khizarans use knives to settle disputes instead of other weapons because using a knife is personal.",
    ],
    footnotes: [
      "The warrior inhabitants have been have occupied this planet for more than 27 centuries.",
      "Tokorel fragment H-75C  World Historical Society",
    ],
  },
  {
    id: "tokorel",
    name: "Tokorel",
    moons: 0,
    image: "/images/planets/tokorel.png",
    description: [
      "Tokorel was settled by Tokor and his followers 200 years ago. When Tokor was exiled from Khizara, he, his family (at least the ones who survived the Great Battling), and his followers, escaped the planet searching for a new home where they could live freely and without persecution.",
      "They thrived on Tokorel and their powers of emotional control developed into something many feared. Living mostly in isolation, The Tokorellans weren't well known in the galaxy. Slowly, some Tokorellans left, venturing out into space and claiming to be Khizarans in an effort to be more accepted.",
    ],
    footnotes: [
      "This is a rare photograph of Tokorel preserved for history.",
      "Tokorel fragment H-37A  World Historical Society",
    ],
  },
];
