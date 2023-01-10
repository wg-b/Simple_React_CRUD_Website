import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import ResponsiveAppBar from "components/ResponsiveAppBar";
import { useAppSelector } from "store";
import RankingService from "store/services/ranking.service";
import { toast } from "react-toastify";

import NoHintImage from "assets/images/no-hint.png";
import AddImage from "assets/images/add.png";
import RemoveImage from "assets/images/remove.png";
import SumImage from "assets/images/sum.png";

interface StatsTypes {
  dailyRanking: number;
  regularRanking: number;
  dailyRound: number;
  regularRound: number;
  dailyScore: number;
  regularScore: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td": {
    border: 0,
  },
  "td:first-of-type": {
    borderRight: `1px solid ${theme.palette.grey[300]} !important`,
  },
}));

const rows = [
  {
    description: "Add a Letter",
    score: -20,
  },
  {
    description: "Remove Two Letters",
    score: -25,
  },
  {
    description: "Sum Up Two Letters",
    score: -5,
  },
];

export default function Help() {
  const userToken = useAppSelector((state) => state.auth.accessToken);
  const [ranking, setRanking] = useState<StatsTypes>({
    dailyRanking: 0,
    regularRanking: 0,
    dailyRound: 0,
    regularRound: 0,
    dailyScore: 0,
    regularScore: 0,
  });

  useEffect(() => {
    if (userToken) {
      RankingService.getRanking().then(
        (res) => {
          setRanking(res.data);
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
  }, [userToken]);
  return (
    <Box>
      <ResponsiveAppBar />
      <Container sx={{ py: "32px" }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="500"
          mb="24px"
          sx={{ fontSize: { xs: "32px", md: "40px" } }}
        >
          How to Play Countect
        </Typography>
        <Box mb="36px">
          <Typography mb="16px">
            <strong>There are two words:</strong> challenge at the bottom of the
            page and hint at the top. The challenge word will be somehow
            connected to the hint word. Guess the challenge word from the hint
            word and by guessing words that add up to the total of the letters
            of the challenge word.
          </Typography>
          <Typography>
            There are 10 letters randomly numbered between 1 and 10 and the
            total of the challenge word will be the sum of letters present
            within the word.
          </Typography>
        </Box>
        <Box mb="36px">
          <Typography variant="h5" fontWeight="500" mb="16px">
            Hints
          </Typography>
          <Box mb="16px">
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              Add a Letter
            </Typography>
            <Typography>
              This hint will add a random letter to the challenge word.
            </Typography>
          </Box>
          <Box mb="16px">
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              Remove Two Letters
            </Typography>
            <Typography>
              This will remove two random letters from potential letters.
            </Typography>
          </Box>
          <Box>
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              Sum Up Two Letters
            </Typography>
            <Typography>
              This will sum up two random letters from the challenge word.
            </Typography>
          </Box>
        </Box>
        <Box mb="36px">
          <Typography variant="h5" fontWeight="500" mb="16px">
            Daily vs Unlimited Mode
          </Typography>
          <Typography mb="8px">
            Daily mode has five rounds, which starts at a four letter challenge
            word and will increase in length up to eight letter challenge word.
          </Typography>
          <Typography>
            Unlimited game mode allows you to play with no time or word limits,
            this game mode will start at three letters and progressively add a
            letter.
          </Typography>
        </Box>
        <Box mb="36px">
          <Typography variant="h5" fontWeight="500" mb="16px">
            Scoring
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    sx={{ borderRight: "1px solid white", width: "70%" }}
                  >
                    Description
                  </StyledTableCell>
                  <StyledTableCell align="center">Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.description}>
                    <StyledTableCell align="center">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.score}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mb="36px">
          <Typography variant="h5" fontWeight="500" mb="16px">
            Examples
          </Typography>
          <Box mb="16px">
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              No Hints
            </Typography>
            <Box
              component="img"
              src={NoHintImage}
              maxWidth="600px"
              width="100%"
            />
          </Box>
          <Box mb="16px">
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              Add a Letter Hint
            </Typography>
            <Box component="img" src={AddImage} maxWidth="600px" width="100%" />
          </Box>
          <Box mb="16px">
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              Remove Two Letters
            </Typography>
            <Box
              component="img"
              src={RemoveImage}
              maxWidth="600px"
              width="100%"
            />
          </Box>
          <Box>
            <Typography fontStyle="italic" fontWeight="500" mb="8px">
              Sum Up Two Letters
            </Typography>
            <Box component="img" src={SumImage} maxWidth="600px" width="100%" />
          </Box>
        </Box>
        {userToken ? (
          <Box>
            <Typography variant="h5" fontWeight="500" mb="16px">
              Stats and Rankings
            </Typography>
            <Box mb="16px">
              <Typography fontStyle="italic" fontWeight="500" mb="8px">
                Daily Mode
              </Typography>
              <Typography>
                <strong>Ranking:</strong> {ranking.dailyRanking}
              </Typography>
              <Typography>
                <strong>Round:</strong> {ranking.dailyRound}
              </Typography>
              <Typography>
                <strong>Score:</strong> {ranking.dailyScore}
              </Typography>
            </Box>
            <Box mb="16px">
              <Typography fontStyle="italic" fontWeight="500" mb="8px">
                Regular Mode
              </Typography>
              <Typography>
                <strong>Ranking:</strong> {ranking.regularRanking}
              </Typography>
              <Typography>
                <strong>Round:</strong> {ranking.regularRound}
              </Typography>
              <Typography>
                <strong>Score:</strong> {ranking.regularScore}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Link href="/#/sign-up" variant="body2" fontSize="16px">
            Sign up here
          </Link>
        )}
      </Container>
    </Box>
  );
}
