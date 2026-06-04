import { Typography } from '@/components/common/typography/Typography';
import { ArticleCard } from '@/components/features/articles/ArticleCard';
import { useGetMyDrafts } from '@/hooks/features/articles/useGetMyDrafts';
import { useResponse } from '@/hooks/useResponse';

export const ArticlesDraftIndexPage = () => {
  const { data: draftsRes } = useGetMyDrafts();
  const { data: drafts } = useResponse(draftsRes);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 space-y-1">
        <Typography variant="3xl" weight="semibold">
          Draft articles
        </Typography>
      </div>

      {/* Empty state */}
      {!drafts?.length ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Typography
            variant="lg"
            weight="medium"
            className="text-muted-foreground text-center"
          >
            No drafts yet.
          </Typography>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {drafts.map((draft) => (
            <ArticleCard key={draft.id} article={draft} draft />
          ))}
        </div>
      )}
    </div>
  );
};
