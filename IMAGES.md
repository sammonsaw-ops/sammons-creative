# Image prep guide

Next.js automatically generates the right-sized image for every visitor's
device from a single master file. You upload one file; the site serves a
different variant to a 6K monitor vs. a phone.

## What to upload

| Setting        | Recommendation                                        |
| -------------- | ----------------------------------------------------- |
| Format         | JPG for photography, PNG for design/graphics with flat color |
| Long edge      | **2560 px** (fits any modern monitor sharply)         |
| JPG quality    | 82                                                    |
| Color profile  | sRGB (convert from Adobe RGB / ProPhoto before saving)|
| Watermarked?   | Yes if you don't want the master file redistributed   |
| Filename       | lowercase, hyphens or underscores only, no spaces     |

For **web-only masters** already downsized (like the current `_4x6_wm.jpg`
watermarked exports), you can upload as-is — Next.js will still serve
optimized variants.

## Why 2560 px

- Fills a 27" 5K display at 1x, and a 15" retina at 2x with no upscaling.
- Small enough to keep phones fast (Next.js serves 640-1080 px variants there).
- The alternative (upload full-res 6000+ px files) bloats the deploy and
  offers no visible benefit — the browser downscales to your uploaded max.

## Folder + naming

Put files in `public/galleries/<gallery-id>/` and reference them from
`src/content/galleries.ts`. Filenames become part of the URL, so:

- ✅ `afl-2026-09-19-045.jpg`
- ✅ `4-h-nova-scotia.png`
- ❌ `AFL September 19 2026.jpg` (spaces + capitals cause URL issues on Vercel)

## Compressing before upload (optional)

If a JPG straight out of Lightroom is 10+ MB, run it through
[Squoosh](https://squoosh.app) or `magick input.jpg -quality 82 -resize
2560x2560\> output.jpg` to trim to a few hundred KB before committing.

## Bulk optimize + rename (one command)

`scripts/optimize-images.mjs` does the whole job: resize to 2560 px long edge,
JPG q82 (mozjpeg), rotate by EXIF, slugify filenames, and write to the gallery
folder. Point it at your source folder and the destination:

```bash
node scripts/optimize-images.mjs "../My New Photos" "public/galleries/sports"
```

The default long edge is 2560 px; pass a third argument to override.

