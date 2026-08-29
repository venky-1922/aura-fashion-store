import { Category } from "@/types";
import { img, PH } from "./images";

export const categories: Category[] = [
  {
    id: "cat-men",
    slug: "men",
    name: "Men",
    description: "Tailored performance essentials built for movement.",
    image: img(PH.catMen, 1000),
    gender: "men",
  },
  {
    id: "cat-women",
    slug: "women",
    name: "Women",
    description: "Sculpted silhouettes engineered for everyday edge.",
    image: img(PH.catWomen, 1000),
    gender: "women",
  },
  {
    id: "cat-footwear",
    slug: "footwear",
    name: "Footwear",
    description: "Sneakers and trainers designed for the street.",
    image: img(PH.catFootwear, 1000),
    gender: "unisex",
  },
  {
    id: "cat-accessories",
    slug: "accessories",
    name: "Accessories",
    description: "Finishing pieces — bags, caps, and more.",
    image: img(PH.catAccessories, 1000),
    gender: "unisex",
  },
];
