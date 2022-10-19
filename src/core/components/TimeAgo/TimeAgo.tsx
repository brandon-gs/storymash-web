import { Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { FC, useMemo } from "react";

interface ITimeAgoProps {
  date: string | Date;
}

const TimeAgo: FC<ITimeAgoProps> = ({ date }) => {
  const timeAgo = useMemo(() => {
    return formatDistance(new Date(date), new Date(), {
      addSuffix: true,
      locale: es,
    })
      .replace("alrededor de", "")
      .replace("más de", "");
  }, [date]);

  return (
    <Typography component={"span"} variant="body2" color="gray">
      {timeAgo}
    </Typography>
  );
};
export default TimeAgo;
