import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "@/lib/supabase";
import { GalleryGrid } from "@/components/GalleryGrid";

const BUCKET = "Photos";

export const Gallery = async () => {
  noStore();

  const { data: files, error } = await supabase.storage
    .from(BUCKET)
    .list("", { sortBy: { column: "created_at", order: "desc" } });

  if (error) {
    console.error("[Gallery] Failed to fetch photos:", error.message);
  }

  const photos = (files ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      src: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      caption: f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
    }));

  return (
    <section
      id="gallery"
      className="py-16 px-6 border-t-4 border-newsprint-ink bg-newsprint-bg"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Photo Dispatch
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif font-black text-newsprint-ink">
            Life in Frames
          </h2>
          <p className="font-body text-newsprint-ink/70 mt-2">
            Snapshots from the field, the mat, and everywhere in between.
          </p>
        </div>

        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
};
