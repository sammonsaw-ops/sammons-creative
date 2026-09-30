export type PhotoEntry = {
  src: string;
  alt: string;
};

export type PhotoSection = {
  id: string;
  title: string;
  subtitle?: string;
  logo?: string;
  images: PhotoEntry[];
};

export type PhotoGallery = {
  id: string;
  kind: "photo";
  title: string;
  subtitle?: string;
  intro?: string;
  cover: string;
  sections: PhotoSection[];
};

export type DesignProject = {
  title: string;
  description: string;
  images: string[];
};

export type DesignSection = {
  id: string;
  title: string;
  subtitle?: string;
  logo?: string;
  trailingLogo?: string;
  intro?: string;
  projects: DesignProject[];
};

export type DesignGallery = {
  id: string;
  kind: "design";
  title: string;
  subtitle?: string;
  intro?: string;
  cover: string;
  sections: DesignSection[];
};

export type ComingSoonGallery = {
  id: string;
  kind: "coming-soon";
  title: string;
  subtitle?: string;
  intro?: string;
};

export type Gallery = PhotoGallery | DesignGallery | ComingSoonGallery;

const aflAtlanticImages = [
  "game-1-09.jpg",
  "game-1-41.jpg",
  "game-2-29.jpg",
  "game-2-43.jpg",
  "game-2-61.jpg",
  "game-3-013.jpg",
  "game-3-036.jpg",
  "game-3-062.jpg",
  "game-3-067.jpg",
  "game-3-078.jpg",
  "game-3-092.jpg",
  "game-3-099.jpg",
  "game-3-100.jpg",
  "game-3-109.jpg",
  "img-0473.jpg",
  "img-0629.jpg",
  "img-1107.jpg",
  "img-1312.jpg",
  "img-1370.jpg",
  "img-1396.jpg",
  "img-1502.jpg",
  "img-1547.jpg",
  "img-1720.jpg",
  "img-1764.jpg",
  "img-1768.jpg",
  "img-1882.jpg",
  "img-2058.jpg",
  "img-2392.jpg",
  "img-5653.jpg",
  "img-6208.jpg",
  "img-6758.jpg",
  "img-6763.jpg",
  "img-6833.jpg",
  "img-7615-2.jpg",
  "img-7702.jpg",
  "img-7908.jpg",
  "img-7998.jpg",
  "img-8097.jpg",
  "img-8100.jpg",
].map((file) => ({
  src: `/galleries/sports/${file}`,
  alt: "AFL Atlantic",
}));

const ecgaaImages = [
  "img-2155.jpg",
  "img-2160.jpg",
  "img-2164.jpg",
  "img-2590.jpg",
  "img-2810.jpg",
  "img-2900.jpg",
  "img-2963.jpg",
  "img-2964.jpg",
  "img-2983.jpg",
  "img-3226.jpg",
  "img-3342.jpg",
  "img-3427.jpg",
  "img-3777.jpg",
  "img-3880.jpg",
  "img-4165.jpg",
  "img-4249.jpg",
  "img-4269.jpg",
  "img-4378.jpg",
  "img-4535.jpg",
  "img-4690.jpg",
  "img-4710.jpg",
  "img-4853.jpg",
  "img-4905.jpg",
  "img-4934.jpg",
  "img-5035.jpg",
  "img-5055.jpg",
  "img-5076.jpg",
  "img-5158.jpg",
  "img-5200.jpg",
  "img-5276.jpg",
  "img-5308.jpg",
  "img-5552.jpg",
  "img-5741.jpg",
  "img-5908.jpg",
  "img-7870.jpg",
  "img-8181.jpg",
  "img-8657.jpg",
  "img-8771.jpg",
  "img-9592.jpg",
].map((file) => ({
  src: `/galleries/sports/ecgaa/${file}`,
  alt: "Eastern Canada GAA",
}));

const gaaCanadaImages = [
  "img-3521wbg-8x12.jpg",
  "img-3885-wm-8x12.jpg",
  "img-3975-wm-8x12.jpg",
  "img-4011-wm-8x12.jpg",
  "img-4070-wm-8x12.jpg",
  "img-4129-wm-8x12.jpg",
  "img-4199-wm-8x12.jpg",
  "img-4571-wm-8x12.jpg",
  "img-4827-wm-8x12.jpg",
  "img-5002-wm-8x12.jpg",
  "img-5071-wm-8x12.jpg",
  "img-5127-wm-8x12.jpg",
  "img-5239-wm-8x12.jpg",
  "img-5540-wm-8x12.jpg",
  "img-5747-wm-8x12.jpg",
  "img-5817-wm-8x12.jpg",
  "img-5908-wm-8x12.jpg",
  "img-6495-wm-8x12.jpg",
  "img-6507-wm-8x12.jpg",
  "img-6525-wm-8x12.jpg",
  "img-6599-wm-8x12.jpg",
  "img-6649-wm-8x12.jpg",
  "img-6661-wm-8x12.jpg",
  "img-6851-wm-8x12.jpg",
  "img-6876-wm-8x12.jpg",
  "img-6890-wm-8x12.jpg",
  "img-6900-wm-8x12.jpg",
  "img-6902-wm-8x12.jpg",
  "img-6904-wm-8x12.jpg",
  "img-6909-wm-8x12.jpg",
  "img-6971-wm-8x12.jpg",
  "img-6977-wm-8x12.jpg",
  "img-7024-wm-8x12.jpg",
  "img-7037-wm-8x12.jpg",
  "img-7167-wm-8x12.jpg",
  "img-7187-wm-8x12.jpg",
  "img-7214-wm-8x12.jpg",
  "img-7224-wm-8x12.jpg",
  "img-7252-8x12.jpg",
].map((file) => ({
  src: `/galleries/sports/gaa-canada/${file}`,
  alt: "GAA Canada",
}));

const sports: PhotoGallery = {
  id: "sports",
  kind: "photo",
  title: "Sports Photography",
  cover: "/galleries/sports/game-1-09.jpg",
  sections: [
    {
      id: "afl-atlantic",
      title: "AFL Atlantic",
      logo: "/sections/sports/afl-atlantic.png",
      images: aflAtlanticImages,
    },
    {
      id: "ecgaa",
      title: "Eastern Canada Gaelic Athletic Association (ECGAA)",
      logo: "/sections/sports/ecgaa.jpg",
      images: ecgaaImages,
    },
    {
      id: "gaa-canada",
      title: "GAA Canada",
      logo: "/sections/sports/gaa-canada.png",
      images: gaaCanadaImages,
    },
  ],
};

const bannerCampaignProjects: DesignProject[] = [
  { title: "4-H Nova Scotia", description: "Custom banner design.", images: ["/galleries/graphic-design/4-h-nova-scotia.png"] },
  { title: "Alberta Playwrights' Network Society", description: "Custom banner design.", images: ["/galleries/graphic-design/alberta-playwrights-network-society.jpg"] },
  { title: "Aldergrove Parent Advisory Association", description: "Custom banner design.", images: ["/galleries/graphic-design/aldergrove-parent-advisory-association.png"] },
  { title: "Amherst Fire Fighters Association", description: "Custom banner design.", images: ["/galleries/graphic-design/amherst-fire-fighters-association.png"] },
  { title: "Annie L. Gaetz Parent Association", description: "Custom banner design.", images: ["/galleries/graphic-design/annie-l-gaetz-parent-association.png"] },
  { title: "Arctic Slope Community Foundation", description: "Custom banner design.", images: ["/galleries/graphic-design/arctic-slope-community-foundation-inc.png"] },
  { title: "Balanced Outdoor Learning & Discovery Society", description: "Custom banner design.", images: ["/galleries/graphic-design/balanced-outdoor-learning-discovery-society.png"] },
  { title: "Behaviour Therapy and Learning Centre", description: "Custom banner design.", images: ["/galleries/graphic-design/behaviour-therapy-and-learning-centre-ltd.png"] },
  { title: "Brevard Beachside Impact", description: "Custom banner design.", images: ["/galleries/graphic-design/brevard-beachside-impact.png"] },
  { title: "Calgary Blues Music Association", description: "Custom banner design.", images: ["/galleries/graphic-design/calgary-blues-music-association.png"] },
  { title: "Camp Bickell on Chapman Lake", description: "Custom banner design.", images: ["/galleries/graphic-design/camp-bickell-on-chapman-lake-est-1939.png"] },
  { title: "Canadian Anesthesia Research Foundation", description: "Custom banner design.", images: ["/galleries/graphic-design/canadian-anesthesia-research-foundation-2.png"] },
  { title: "Cochrane Recreational Hockey League", description: "Custom banner design.", images: ["/galleries/graphic-design/cochrane-recreational-hockey-league.png"] },
  { title: "Darts Alberta — The Alberta Darts Organization", description: "Custom banner design.", images: ["/galleries/graphic-design/darts-alberta-the-alberta-darts-organization.png"] },
  { title: "EducationMatters", description: "Custom banner design.", images: ["/galleries/graphic-design/educationmatters.png"] },
  { title: "Elizabeth House", description: "Custom banner design.", images: ["/galleries/graphic-design/elizabeth-house.png"] },
  { title: "Gander and Area SPCA", description: "Custom banner design.", images: ["/galleries/graphic-design/gander-and-area-spca.png"] },
  { title: "Global Education at Mission Secondary School", description: "Custom banner design.", images: ["/galleries/graphic-design/global-education-at-mission-secondary-school.png"] },
  { title: "Home Fur Good Animal Rescue and Placement", description: "Custom banner design.", images: ["/galleries/graphic-design/home-fur-good-animal-rescue-and-placement.png"] },
  { title: "Hospice Wellington", description: "Custom banner design.", images: ["/galleries/graphic-design/hospice-wellington.png"] },
  { title: "Kick It Up Campaign", description: "Custom banner design.", images: ["/galleries/graphic-design/kick-it-up-campaign.png"] },
  { title: "L'Acadie de Chezzetcook", description: "Custom banner design.", images: ["/galleries/graphic-design/l-acadie-de-chezzetcook.png"] },
  { title: "Lemur Conservation Foundation", description: "Custom banner design.", images: ["/galleries/graphic-design/lemur-conservation-foundation.png"] },
  { title: "Leukemia & Lymphoma Society of Canada", description: "Custom banner design.", images: ["/galleries/graphic-design/leukemia-lymphoma-society-of-canada.png"] },
  { title: "Maritime Modern Quilt Guild", description: "Custom banner design.", images: ["/galleries/graphic-design/maritime-modern-quilt-guild.png"] },
  { title: "Miami Animal Rescue", description: "Custom banner design.", images: ["/galleries/graphic-design/miami-animal-rescue.png"] },
  { title: "Niagara IceDogs", description: "Custom banner design.", images: ["/galleries/graphic-design/niagara-icedogs.png"] },
  { title: "Percy's Place", description: "Custom banner design.", images: ["/galleries/graphic-design/percy-s-place.png"] },
  { title: "Plympton Wyoming Agricultural Society", description: "Custom banner design.", images: ["/galleries/graphic-design/plympton-wyoming-agricultural-society.png"] },
  { title: "Project Pinball Inc.", description: "Custom banner design.", images: ["/galleries/graphic-design/project-pinball-inc.png"] },
  { title: "Rehtaeh Parsons Society", description: "Custom banner design.", images: ["/galleries/graphic-design/rehtaeh-parsons-society.png"] },
  { title: "Roberta MacAdams Fundraising Association", description: "Custom banner design.", images: ["/galleries/graphic-design/roberta-macadams-fundraising-association.png"] },
  { title: "Rotary Club of Cumberland Centennial", description: "Custom banner design.", images: ["/galleries/graphic-design/rotary-club-of-cumberland-centennial.png"] },
  { title: "That Arts Group", description: "Custom banner design.", images: ["/galleries/graphic-design/that-arts-group.png"] },
  { title: "The Booker School", description: "Custom banner design.", images: ["/galleries/graphic-design/the-booker-school.png"] },
  { title: "The Quidi Vidi / Rennie's River Development Foundation", description: "Custom banner design.", images: ["/galleries/graphic-design/the-quidi-vidi-rennie-s-river-development-foundation.png"] },
  { title: "Willow Park School Parents' Association", description: "Custom banner design.", images: ["/galleries/graphic-design/willow-park-school-parents-association.png"] },
  { title: "Wordbridge Writers' Society of Lethbridge", description: "Custom banner design.", images: ["/galleries/graphic-design/wordbridge-writers-society-of-lethbridge.png"] },
];

const graphicDesign: DesignGallery = {
  id: "graphic-design",
  kind: "design",
  title: "Graphic Design",
  cover: "/galleries/graphic-design/4-h-nova-scotia.png",
  sections: [
    {
      id: "banner-campaigns",
      title: "Banner Creation",
      subtitle: "For non-profits and community organizations using Rafflebox",
      trailingLogo: "/sections/design/rafflebox.webp",
      intro:
        "During my time at Rafflebox, I have served as the customer support team's de facto graphic designer, creating custom banners, promotional graphics, and digital assets for nonprofit and charitable organizations across Canada and the United States. I also developed a library of standardized design templates that enables support staff without formal design backgrounds to create consistent, on-brand promotional materials. This work combines hands-on graphic design with brand stewardship, visual consistency, and practical design solutions that support both clients and internal teams.",
      projects: bannerCampaignProjects,
    },
  ],
};

const formStructure: ComingSoonGallery = {
  id: "form-structure",
  kind: "coming-soon",
  title: "Form & Structure Photography",
  subtitle: "Architecture · Buildings · Infrastructure",
  intro:
    "New portfolio coming soon. In the meantime, reach out for shoot inquiries and rates.",
};

const sideProjects: ComingSoonGallery = {
  id: "side-projects",
  kind: "coming-soon",
  title: "Side Projects",
  subtitle: "Passion work and personal experiments",
  intro: "Selected personal work will land here shortly.",
};

export const galleries: Gallery[] = [sports, graphicDesign, formStructure, sideProjects];

export function getGallery(id: string): Gallery | undefined {
  return galleries.find((g) => g.id === id);
}
