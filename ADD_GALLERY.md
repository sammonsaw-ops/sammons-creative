# Adding or updating a gallery

Everything lives in two places:

1. Images: `public/galleries/<gallery-id>/`
2. Metadata: `src/content/galleries.ts`

## Photo galleries have sections

A `PhotoGallery` holds one or more **sections**. Each section is its own
divider page inside the album (with an optional logo + title), and its
thumbnails only appear while that section is being viewed. Even a "flat"
gallery has one section — you just add more when you want dividers.

## Add photos to an existing section

1. Prep your images per `IMAGES.md` (or run `scripts/optimize-images.mjs`).
2. Drop them into `public/galleries/<gallery-id>/`.
3. Open `src/content/galleries.ts` and add the filenames to the section's
   `images` array.

## Add a new section to an existing gallery

Add another entry to the gallery's `sections` array:

```ts
{
  id: "gaa-canada",
  title: "GAA Canada",
  logo: "/sections/sports/gaa-canada.png",
  images: [
    // filenames…
  ].map((file) => ({ src: `/galleries/sports/${file}`, alt: "GAA Canada" })),
}
```

Section logos live in `public/sections/<gallery-id>/`.

## Add a brand-new photo gallery

1. Pick a URL slug, e.g. `weddings`.
2. Create the folder `public/galleries/weddings/` and add photos.
3. In `src/content/galleries.ts`, add a new `PhotoGallery` entry:

```ts
const weddings: PhotoGallery = {
  id: "weddings",
  kind: "photo",
  title: "Weddings",
  subtitle: "Selected ceremonies and receptions",
  cover: "/galleries/weddings/hero.jpg",
  sections: [
    {
      id: "ceremonies",
      title: "Ceremonies",
      images: ["hero.jpg", "vows.jpg"].map((file) => ({
        src: `/galleries/weddings/${file}`,
        alt: "Wedding ceremony",
      })),
    },
  ],
};
```

4. Add it to the exported `galleries` array so it shows on the home page
   and gets its own route at `/weddings`.

## Add a brand-new design gallery

Same section pattern as photo galleries. Each section contains projects,
and each project is one two-page spread inside the album (description on
the left, image(s) on the right):

```ts
const web: DesignGallery = {
  id: "web-design",
  kind: "design",
  title: "Web Design",
  cover: "/galleries/web-design/cover.png",
  sections: [
    {
      id: "landing-pages",
      title: "Landing Pages",
      subtitle: "Marketing and product launches",
      projects: [
        {
          title: "Client Name",
          description: "One or two sentences about the project.",
          images: ["/galleries/web-design/client-name-1.png"],
        },
      ],
    },
  ],
};
```

Multiple images per project stack on the right page — each is
independently clickable for a full-screen view.

## Coming-soon placeholder

Empty gallery, ready to be filled later:

```ts
const empty: ComingSoonGallery = {
  id: "portraits",
  kind: "coming-soon",
  title: "Portraits",
  intro: "New work landing soon.",
};
```

## Cover image on the home page

Home-page cards read `src/components/PortfolioGrid.tsx` for their cover
image. Update the `covers` object there to change which photo represents
each gallery.
