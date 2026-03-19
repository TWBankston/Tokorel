export interface LoreEntry {
  id: string;
  title: string;
  image: string;
  description: string[];
  attribution?: string;
}

export const LORE_INTRO = {
  title: "Get to know Tokorellan History",
  description:
    "Historians have been gather artifacts and historical information over the years and have just decided to share these items with the public. You are among the first toes what they have discovered. Check back weekly for new and amazing additions and discoveries!",
};

export const LORE_ENTRIES: LoreEntry[] = [
  {
    id: "prophecy-fragment",
    title: "Tokorel Fragment H-17A",
    image: "/images/lore/prophecy-scroll.png",
    description: [
      "Incredibly well preserved scroll found during an excavation at the Fourth Cornerstone by archaeologist Linsora Anselm. Located with numerous other artifacts from Tokor the first, it's assumed that this scroll was written by Tokor and was a portion of his second dream resulting in the second prophecy. Scholars are still attempting to interpret the meaning of the fragment, but it's hoped when other fragments are discovered, the entire prophecy will be revealed.",
    ],
    attribution: "Tokorel fragment H-17A  TAS Division",
  },
  {
    id: "book-of-prophetess",
    title: "Book of the Prophetess",
    image: "/images/lore/book-of-prophetess.png",
    description: [
      "This is a representation of the Book of the Prophetess.",
      "While only a few have actually seen the book, it's said that only one person can read the text as it appears in time of need. Even those standing nearby can only see blank pages. Historians record that Tokor left the book hidden in the pocket of an urn which was found while excavating Hakai. The urn was one of many recovered by Gordek, an enemy of the state, and Ralain, a native of Hakai (deceased).",
      "The artifacts recovered from Hakai were examined by Linsora Anselm, who found the book.",
    ],
    attribution: "Used with permission from the Tokorel National Archives",
  },
  {
    id: "brachen-discovery",
    title: "Brachen Discovery",
    image: "/images/lore/ghoranth-ruins.png",
    description: [
      "One of our most recent, and exciting discoveries is the ancient ruins found on Brachen. These are the oldest remains to date and we feel they may have belonged to the Ghoranth. Mysteriously vanishing approximately 200 years ago, the Ghoranth were the original occupants of Brachen. We only know the fragments recorded by Tokor and his encounter with them, but with this discovery we will hopefully learn more about this mysterious race of beings.",
      "Initial observations show that the Ghoranth may have been much larger than we originally thought. We'll post more as the discoveries are released!",
    ],
  },
];

export const LORE_HERO_IMAGE = "/images/lore/prophecy-fragment.png";
