import { Card, CardActions, CardContent, Skeleton, Stack } from "@mui/material";

const StoryCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: 284,
        minHeight: 332,
        position: "relative",
      }}
    >
      {/* cover */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={124}
        sx={{
          position: "relative",
        }}
      />
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        sx={{
          position: "absolute",
          top: 96,
          left: 16,
        }}
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={16}
        sx={{
          position: "absolute",
          top: 100,
          left: 64,
        }}
      />
      <CardContent>
        {/* story title  */}
        <Skeleton variant="rectangular" width={160} sx={{ mb: 2 }} />
        {/* story content  */}
        <Skeleton variant="rectangular" height={72} sx={{ mb: 2 }} />
        {/* story categories */}
        <Stack direction="row" columnGap={1}>
          <Skeleton width={56} variant="rounded" sx={{ borderRadius: 2 }} />
          <Skeleton width={64} variant="rounded" sx={{ borderRadius: 2 }} />
          <Skeleton width={56} variant="rounded" sx={{ borderRadius: 2 }} />
        </Stack>
      </CardContent>
      {/* footer stats skeleton */}
      <CardActions sx={{ pt: 0 }}>
        <Stack
          direction="row"
          width="100%"
          columnGap={2}
          justifyContent="flex-end"
        >
          {["views", "comments", "likes"].map((stat) => (
            <Stack
              key={`story-card-skeleton-stat-${stat}`}
              rowGap={1}
              alignItems="center"
            >
              <Skeleton width={24} height={24} variant="rectangular" />
              <Skeleton width={16} height={16} variant="rectangular" />
            </Stack>
          ))}
        </Stack>
      </CardActions>
    </Card>
  );
};
export default StoryCardSkeleton;
