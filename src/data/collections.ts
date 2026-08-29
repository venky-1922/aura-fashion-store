import { Collection } from "@/types";
import { img, PH } from "./images";

export const collections: Collection[] = [
  {
    id: "col-monochrome",
    slug: "monochrome-01",
    name: "Monochrome 01",
    tagline: "A study in restraint",
    description:
      "Our founding capsule — off-black and bone tones cut from heavyweight cotton, built for permanence rather than a season.",
    image: img(PH.collectionSpotlight, 1200),
    heroImage: img(PH.editorialWide, 1600),
  },
  {
    id: "col-mobility",
    slug: "mobility-lab",
    name: "Mobility Lab",
    tagline: "Engineered for motion",
    description:
      "Technical athleisure developed with four-way stretch fabrics for training, travel, and everything between.",
    image: img(PH.p6a, 1200),
    heroImage: img(PH.editorialWide2, 1600),
  },
  {
    id: "col-nightwalk",
    slug: "nightwalk",
    name: "Nightwalk",
    tagline: "Low light, high contrast",
    description:
      "Reflective trims and weighted jersey for the city after dark. Limited run, numbered pieces.",
    image: img(PH.p3a, 1200),
    heroImage: img(PH.brandStatement, 1600),
  },
];
