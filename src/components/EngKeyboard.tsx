import { Button, Box, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "store";
import { changeResponseWord, setCursorIndex } from "store/actions/play.action";
import { LetterListTypes } from "./types";

const spaceKey: LetterListTypes = {
  letter: "_",
  val: 0,
};

const EngKeyboard = () => {
  const dispatch = useAppDispatch();

  let letterList = useAppSelector((state) => state.play.letterList);
  let alphabetRemoved = useAppSelector((state) => state.play.alphabetRemoved);
  let selectedKey = useAppSelector((state) => state.play.selectedKey);
  const cursorIndex = useAppSelector((state) => state.play.cursorIndex);
  const word = useAppSelector((state) => state.play.responseWord);
  const revealWord = useAppSelector((state) => state.play.revealWord);

  if (!letterList) return <></>;
  const _dis = letterList.map((val: any) => {
    return alphabetRemoved.includes(val.letter ? val.letter : false);
  });

  const ClickKey = (key: LetterListTypes): void => {

    if (revealWord[cursorIndex] == '_') {
      const _answer: string =
        word.substring(0, cursorIndex) +
        (key ? key?.letter : "_") +
        word.substring(cursorIndex + 1);
      dispatch(changeResponseWord(_answer));
    }


    let pos = cursorIndex;
    while (1) {
      pos++;
      if (pos >= word.length) { pos = 0; }
      if (pos == cursorIndex) { return }
      console.log("revealWord", revealWord);
      if (revealWord[pos] == '_') break;
    }
    dispatch(setCursorIndex(pos));


  };

  return (
    <>
      <Box
        width="90%"
        display="flex"
        justifyContent="center"
        gap="1px"
        flexWrap="wrap"
        sx={{
          maxWidth: { xs: "100%", sm: "200px", md: "300px" },
          minWidth: { md: "121px" },
        }}
      >
        {letterList.map((row: LetterListTypes, index: number) => {
          return (
            <Box key={index} sx={{ width: "max-content" }}>
              <Button
                onClick={() => ClickKey(row)}
                key={index}
                variant={"outlined"}
                //   selectedKey?.letter !== row.letter ? "outlined" : "contained"
                // }
                disabled={_dis[index]}
                sx={{
                  height: { xs: "40px", md: "60px" },
                  minWidth: { xs: "40px", md: "60px" },
                  px: "5px",
                  animation: !_dis[index] ? "" : "hint-text-color 2s",
                  backgroundColor: !_dis[index] ? "" : "grey",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography
                    textAlign="left"
                    fontSize="2rem"
                    lineHeight="0.9"
                    fontWeight="500"
                    sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                  >
                    {row.letter}
                  </Typography>
                  <Typography
                    textAlign="right"
                    lineHeight="0.9"
                    fontWeight="500"
                    sx={{ fontSize: { xs: "1.2rem", md: "1.4rem" } }}
                  >
                    {row.val}
                  </Typography>
                </Box>
              </Button>
            </Box>
          );
        })}
        <Box sx={{ width: "max-content" }}>
          <Button
            onClick={() => ClickKey(spaceKey)}
            variant={
              selectedKey?.letter !== spaceKey.letter ? "outlined" : "contained"
            }
            sx={{
              height: { xs: "40px", md: "60px" },
              minWidth: { xs: "40px", md: "60px" },
              px: "5px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                textAlign="left"
                fontSize="2rem"
                lineHeight="0.9"
                fontWeight="500"
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
              >
                {spaceKey.letter}
              </Typography>
              <Typography
                textAlign="right"
                lineHeight="0.9"
                fontWeight="500"
                sx={{ fontSize: { xs: "1.2rem", md: "1.4rem" } }}
              >
                {spaceKey.val}
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default EngKeyboard;
