import { Divider, Box, Typography } from "@mui/material";

const TitleDivider = (props) => {
  const { title } = props;
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Divider style={{ flexGrow: 1 }} />
      <Box mx={2}>
        <Typography
          variant="overline"
          style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.5)" }}
        >
          {title}
        </Typography>
      </Box>
      <Divider style={{ flexGrow: 1 }} />
    </Box>
  );
};

export default TitleDivider;
