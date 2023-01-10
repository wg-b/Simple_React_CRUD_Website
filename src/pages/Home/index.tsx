import { useEffect, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "store";
import {
  Box,
  Typography,
  Fab,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import { DAILY_MODE, REGULAR_MODE } from "config";
import SampleWord from "components/SampleWord";
import ResponseWord from "components/ResponseWord";
import Hint from "components/Hint";
import ResponsiveAppBar from "components/ResponsiveAppBar";
import EngKeyboard from "components/EngKeyboard";
import RankingTable from "components/RankingTable";
// import TemporaryDrawer from "components/TemporaryDrawer";
import { getBoardInformation, checkAnswer } from "store/actions/play.action";
import {
  getDemoBoardInfomation,
  checkDemoAnswer,
  changeDemoTimestamp,
  changeDemoDailyCount,
} from "store/actions/demo.action";
import { changeGameType } from "store/actions/play.action";
import { toast } from "react-toastify";
import PlayService from "store/services/play.service";

const StyledSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-track": {
    background: "#1976d2",
    opacity: 0.5,
  },
}));

export default function Home() {
  const dispatch = useAppDispatch();

  const [toggled, setToggled] = useState<boolean>(false);
  const [checkSum, setCheckSum] = useState<boolean>(false);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [dailyCount, setDailyCount] = useState<number>(0);

  const userToken = useAppSelector((state) => state.auth.accessToken);
  const responseWord = useAppSelector((state: any) => state.play.responseWord);
  const score = useAppSelector((state) => state.play.score);
  const round = useAppSelector((state) => state.play.round);
  const demoId = useAppSelector((state) => state.play.demoId);
  const demoLastTimeStamp = useAppSelector((state) => state.demo.demoTimeStamp);
  const demoDailyCount = useAppSelector((state) => state.demo.dailyCount);

  const gameType = useMemo(() => {
    return toggled ? REGULAR_MODE : DAILY_MODE;
  }, [toggled]);

  const diff_timestamp = useMemo(() => {
    return (
      86400 -
      Math.floor(new Date().getTime() - (lastTimestamp ? lastTimestamp : 0)) /
        1000
    );
  }, [lastTimestamp]);

  const clickCheckAnswer = (): void => {
    if (userToken) {
      if (diff_timestamp > 0 && dailyCount >= 3 && gameType === DAILY_MODE) {
        toast.error("Today's challenge complete. Come back tomorrow!", {
          theme: "colored",
        });
        return;
      }
      if (!checkSum) {
        toast.warning("Wrong", {
          theme: "colored",
        });
        return;
      }
      dispatch<any>(checkAnswer(responseWord, gameType));
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
      if (!checkSum) {
        toast.warning("Wrong", {
          theme: "colored",
        });
        return;
      }
      if (demoDailyCount >= 3) {
        dispatch<any>(changeDemoDailyCount(0));
      }
      dispatch<any>(changeDemoDailyCount(demoDailyCount + 1));
      dispatch<any>(changeDemoTimestamp(timeStamp));
      dispatch<any>(checkDemoAnswer(responseWord, demoId));
    }
  };

  const curDate =
    "Challenge " +
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  useEffect(() => {
    if (userToken) {
      PlayService.getTimestamp().then(
        (data) => {
          setLastTimestamp(data.lastTimestamp);
          setDailyCount(data.dailyCount);
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast.error(message, {
            theme: "colored",
          });
          return Promise.reject();
        }
      );
    }
  }, [userToken, round]);

  useEffect(() => {
    if (userToken) {
      dispatch<any>(changeGameType(gameType));
      dispatch<any>(getBoardInformation(gameType));
    } else {
      dispatch<any>(getDemoBoardInfomation(demoId, demoLastTimeStamp));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameType, userToken, dispatch]);

  return (
    <Box pb="24px">
      {/* {!userToken && <TemporaryDrawer />} */}
      <ResponsiveAppBar />

      {userToken ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="16px"
          my="32px"
          mx="16px"
        >
          <Typography
            textAlign="center"
            fontWeight="500"
            color={"primary.light"}
            variant="h5"
            component="div"
            sx={{ fontSize: { xs: "16px", md: "24px" } }}
          >
            Round {round}
          </Typography>

          <Typography
            textAlign="center"
            fontWeight="500"
            color={"primary.light"}
            variant="h4"
            component="div"
            sx={{ fontSize: { xs: "20px", md: "34px" } }}
          >
            {curDate}
          </Typography>

          <Typography
            textAlign="center"
            fontWeight="500"
            color={"primary.light"}
            variant="h5"
            component="div"
            sx={{ fontSize: { xs: "16px", md: "24px" } }}
          >
            Score {score}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography
            textAlign="center"
            fontWeight="500"
            color={"primary.light"}
            variant="h4"
            component="div"
            my="32px"
            sx={{ fontSize: { xs: "20px", md: "34px" } }}
          >
            Trial{" "}
            {new Date().getDate() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getFullYear()}
          </Typography>
          <Typography
            textAlign="center"
            fontWeight="400"
            color={"primary.light"}
            variant="h5"
            component="div"
            my="32px"
            sx={{ fontSize: { xs: "20px", md: "34px" } }}
          >
            Please sign in and get your daily score
          </Typography>
        </>
      )}

      {userToken && (
        <Box display="flex" gap="16px" mx="16px">
          <FormControlLabel
            control={
              <StyledSwitch
                checked={toggled}
                onChange={(e) => setToggled(e.target.checked)}
                sx={{ mx: "20px" }}
              />
            }
            label={
              <Typography
                textAlign="center"
                fontWeight="500"
                color={"primary.light"}
                variant="h6"
                component="div"
              >
                {toggled ? "Regular" : "Daily"}
              </Typography>
            }
          />
          {diff_timestamp > 0 && dailyCount >= 3 && gameType === DAILY_MODE && (
            <Alert severity="error">
              Today's challenge complete. Come back tomorrow!
            </Alert>
          )}
        </Box>
      )}

      <Box
        p="24px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="32px"
        sx={{ flexDirection: { xs: "column", lg: "row" } }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ my: "2vh" }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap="16px"
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection={"column"}
              justifyContent="space-between"
              height="100%"
              sx={{ gap: "2vh" }}
            >
              <Hint
                gameType={gameType}
                diff_timestamp={diff_timestamp}
                dailyCount={dailyCount}
              />
              <SampleWord />
              <ResponseWord setCheckSum={setCheckSum} />
            </Box>
            <EngKeyboard />
          </Box>
        </Box>
        <Box
          alignItems="center"
          flexDirection={"column"}
          sx={{
            width: "100%",
            my: "10px",
            display: { xs: "flex", lg: "none" },
          }}
        >
          <Fab
            color="error"
            aria-label="CheckAnswer"
            onClick={clickCheckAnswer}
          >
            <SendTimeExtensionIcon fontSize="large" />
          </Fab>
        </Box>
        <RankingTable gameType={gameType} />
      </Box>
      <Box
        alignItems="center"
        flexDirection={"column"}
        sx={{ width: "100%", my: "10px", display: { xs: "none", lg: "flex" } }}
      >
        <Fab color="error" aria-label="CheckAnswer" onClick={clickCheckAnswer}>
          <SendTimeExtensionIcon fontSize="large" />
        </Fab>
      </Box>
    </Box>
  );
}
