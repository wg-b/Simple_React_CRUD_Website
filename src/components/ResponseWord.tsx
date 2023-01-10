import { useEffect} from "react";
import { useAppSelector, useAppDispatch } from "store";
import { Button, Box, Chip } from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { calculateSum, findValueByChar } from "utils/calculate";
import { setCursorIndex } from "store/actions/play.action";

const ResponseWord = ({
  setCheckSum,
}: {
  setCheckSum: (check: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const word = useAppSelector((state) => state.play.responseWord);
  const letterList = useAppSelector((state) => state.play.letterList);
  const revealWord = useAppSelector((state) => state.play.revealWord);

  const sumTargetWord = useAppSelector((state) => state.play.sumTargetWord);
  let subIndexPair = useAppSelector((state) => state.play.subIndexPair);
  const subSumValue = useAppSelector((state) => state.play.subSumValue);
  const cursorIndex = useAppSelector((state) => state.play.cursorIndex);

  if (!subIndexPair) subIndexPair = [-1, -1];

  const subSumBorder = Array.from(Array(word.length)).map((_, index) => {
    return subIndexPair.indexOf(index) >= 0 ? true : false;
  });

  const pointCursorIndex = (index: Number): void => {
    dispatch(setCursorIndex(index));

  };

  const respUserSum = calculateSum(word, letterList);

  useEffect(() => {
    setCheckSum(respUserSum === sumTargetWord);

  }, [sumTargetWord, respUserSum, setCheckSum]);

  return (
    <Box
      alignItems="center"
      flexDirection="column"
      display="flex"
      height="100%"
      sx={{ gap: "2px" }}
    >
      <Box display="flex" gap="12px" mb="8px">
        <Chip
          icon={<FlagRoundedIcon />}
          label={
            respUserSum -
            sumTargetWord +
            (subSumValue > 0 ? " : [" + subSumValue + "]" : "")
          }
          color="success"
          variant="outlined"
          sx={{
            fontSize: { xs: "18px", sm: "19px", md: "20px" },
            fontWeight: "500",
          }}
        />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        width="auto"
        gap="2px"
      >
        {Array.from(Array(word.length)).map((_, index) => (
          <Box
            key={index}
            alignItems="center"
            flexDirection="column"
            sx={{
              width: "auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",

            }}
          >
            <Button
              onClick={() => pointCursorIndex(index)}
              key={index}
              variant="contained"
              disabled={
                revealWord[index] === "_" || !revealWord[index] ? false : true
              }
              sx={{
                paddingLeft: "5px",
                lineHeight: "0.9",
                minWidth: { xs: "40px", sm: "50px", md: "55px" },
                paddingRight: "5px",
                fontSize: { xs: "40px", sm: "50px", md: "55px" },
                animation:
                  revealWord[index] === "_" || !revealWord[index]
                    ? ""
                    : "hint-text-color 2s",

                backgroundColor: subSumBorder[index] ? "red" : "",
                borderRadius: 3,
                "&:hover": {
                  borderRadius: 3,
                  backgroundColor: subSumBorder[index] ? "red" : "",
                },
                border: "yellow",
                borderStyle: cursorIndex === index ? "outset" : "none",
                borderWidth: "thick",
              }}
            >
              {revealWord[index] === "_" || !revealWord[index]
                ? word[index]
                : revealWord[index]}
            </Button>
            <Chip
              label={findValueByChar(word[index], letterList)}
              color="primary"
              variant="outlined"
              sx={{
                fontSize: { xs: "15px", sm: "18px", md: "20px" },
                width: "100%",
                fontWeight: "500",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box >
  );
};
export default ResponseWord;
