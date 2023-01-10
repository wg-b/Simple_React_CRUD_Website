import { Fab, Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Filter2Icon from "@mui/icons-material/Filter2";
import {
  revealOneChar,
  removeTwoKeys,
  getSumTwoLetters,
} from "store/actions/play.action";
import {
  revealDemoOneChar,
  removeDemoTwoKeys,
  getDemoSumTwoLetters,
} from "store/actions/demo.action";
import { useAppDispatch, useAppSelector } from "store";
import { toast } from "react-toastify";
import { DAILY_MODE } from "config";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} placement="top" arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Hint = ({
  diff_timestamp,
  gameType,
  dailyCount,
}: {
  diff_timestamp: number;
  gameType: string;
  dailyCount: number;
}) => {
  const responseWord = useAppSelector((state) => state.play.responseWord);
  const score = useAppSelector((state) => state.play.score);
  const hintLoading = useAppSelector((state) => state.play.hintLoading);
  const userToken = useAppSelector((state) => state.auth.accessToken);
  const demoId = useAppSelector((state) => state.play.demoId);
  const demoLastTimeStamp = useAppSelector((state) => state.demo.demoTimeStamp);
  const demoDailyCount = useAppSelector((state) => state.demo.dailyCount);

  const dispatch = useAppDispatch();

  const clickHintRevealOneChar = () => {
    if (hintLoading) return;
    if (userToken) {
      if (diff_timestamp > 0 && dailyCount >= 3 && gameType === DAILY_MODE) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      if (score < 20) {
        toast.warning("You don't have enough points", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(revealOneChar(responseWord));
    } else {
      const options: any = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const timeStamp = new Date(
        new Date().toLocaleDateString("en-US", options)
      ).getTime();
      if (demoLastTimeStamp === timeStamp && demoDailyCount >= 3) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(revealDemoOneChar(responseWord, demoId));
    }
  };

  const clickHintRemoveTwoKeys = () => {
    if (hintLoading) return;
    if (userToken) {
      if (diff_timestamp > 0 && dailyCount >= 3 && gameType === DAILY_MODE) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      if (score < 25) {
        toast.warning("You don't have enough points", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(removeTwoKeys(responseWord));
    } else {
      const options: any = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const timeStamp = new Date(
        new Date().toLocaleDateString("en-US", options)
      ).getTime();
      if (demoLastTimeStamp === timeStamp && demoDailyCount >= 3) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(removeDemoTwoKeys(responseWord, demoId));
    }
  };

  const clickHintGetSumTwoLetters = () => {
    if (hintLoading) return;
    if (userToken) {
      if (diff_timestamp > 0 && dailyCount >= 3 && gameType === DAILY_MODE) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      if (score < 5) {
        toast.warning("You don't have enough points", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(getSumTwoLetters());
    } else {
      const options: any = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const timeStamp = new Date(
        new Date().toLocaleDateString("en-US", options)
      ).getTime();
      if (demoLastTimeStamp === timeStamp && demoDailyCount >= 3) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(getDemoSumTwoLetters(demoId));
    }
  };

  return (
    <Box
      sx={{
        width: "auto",
        display: "flex",
        gap: { xs: "15vw", sm: "10vw", md: "5vw" },
      }}
      mb="8px"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <StyledTooltip title="Add a Letter">
          <Fab
            size="medium"
            color="info"
            aria-label="Add a Letter"
            onClick={() => clickHintRevealOneChar()}
          >
            <VisibilityIcon fontSize="medium" />
          </Fab>
        </StyledTooltip>
        <Typography
          textAlign="center"
          mt="4px"
          fontSize="14px"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          Add a Letter
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <StyledTooltip title="Remove 2 letters">
          <Fab
            size="medium"
            color="warning"
            aria-label="remove 2 letters"
            onClick={() => clickHintRemoveTwoKeys()}
          >
            <TextDecreaseIcon fontSize="medium" />
          </Fab>
        </StyledTooltip>
        <Typography
          textAlign="center"
          mt="4px"
          fontSize="14px"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          Remove 2 Letters
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <StyledTooltip title="Sum of 2 Letters">
          <Fab
            size="medium"
            color="success"
            aria-label="Sum of 2 Letters"
            onClick={() => clickHintGetSumTwoLetters()}
          >
            <Filter2Icon fontSize="medium" />
          </Fab>
        </StyledTooltip>
        <Typography
          textAlign="center"
          mt="4px"
          fontSize="14px"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          Sum of 2 Letters
        </Typography>
      </Box>
    </Box>
  );
};
export default Hint;
