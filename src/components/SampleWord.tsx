import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "store";

const SampleWord = () => {
  let word = useAppSelector((state) => state.play.sampleWord);
  if (!word) word = "WELCOME";

  return (
    // <Box
    //   alignItems="center"
    //   flexDirection="column"
    //   display="flex"
    //   height="100%"
    //   gap="2px"
    // >
    //   <Box display="flex" alignItems="center" justifyContent="center" gap="2px">
    //     {Array.from(Array(word.length)).map((_, index) => (
    //       <Box
    //         key={index}
    //         display="flex"
    //         alignItems="center"
    //         flexDirection="column"
    //         gap="2px"
    //       >
    //         <Button
    //           key={index}
    //           variant="contained"
    //           sx={{
    //             paddingLeft: "5px",
    //             lineHeight: "0.9",
    //             minWidth: { xs: "22px", sm: "40px", md: "50px" },
    //             paddingRight: "5px",
    //             fontSize: { xs: "22px", sm: "40px", md: "50px" },
    //             borderRadius: { xs: 1, md: 3 },
    //             "&:hover": {
    //               borderRadius: { xs: 1, md: 3 },
    //             },
    //           }}
    //         >
    //           {word.charAt(index)}
    //         </Button>
    //       </Box>
    //     ))}
    //   </Box>
    // </Box>
    <Button
      key="sampleWord"
      variant="contained"
      sx={{
        paddingLeft: "5px",
        lineHeight: "0.9",
        minWidth: { xs: "22px", sm: "40px", md: "50px" },
        paddingRight: "5px",
        fontSize: {xs: "40px", sm: "50px", md: "55px" },
        borderRadius: { xs: 1, md: 3 },
        "&:hover": {
          borderRadius: { xs: 1, md: 3 },
        },
      }}
    >
      {word}
    </Button>
  );
};
export default SampleWord;
