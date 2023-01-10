import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "store";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import UserService from "store/services/user.service";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600,
  },
}));

//
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Column {
  id: "ranking" | "name" | "score" | "round";
  label: string;
}

const columns: readonly Column[] = [
  { id: "ranking", label: "Ranking" },
  { id: "name", label: "Name" },
  {
    id: "score",
    label: "Score",
  },
  {
    id: "round",
    label: "Round",
  },
];

interface RankingInterface {
  mine: boolean;
  ranking: number;
  round: number;
  score: number;
  username: string;
}

export default function RankingTable({ gameType }: { gameType: string }) {
  const [rankingData, setRankingData] = useState<RankingInterface[][] | null>(
    null
  );
  const userData = useAppSelector((state: any) => state.auth.user);
  const score = useAppSelector((state) => state.play.score);
  const round = useAppSelector((state) => state.play.round);

  useEffect(() => {
    UserService.getAllUsers(gameType, userData.email).then(
      (response) => {
        setRankingData(response.data.rankingData);
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
  }, [gameType, userData.email, score, round]);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "10px",
        border: "2px solid #1976d2",
        maxWidth: { xs: "100%", lg: 500 },
      }}
    >
      <TableContainer sx={{ maxHeight: 426 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align="center">
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingData ? (
              rankingData.map((rankings, key) => (
                <Fragment key={key}>
                  {rankings.map((ranking, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{
                        backgroundColor: `${
                          ranking.mine ? "#42a5f5 !important" : ""
                        }`,
                      }}
                    >
                      <StyledTableCell align="center">
                        {ranking.ranking}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ranking.username}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ranking.score}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ranking.round}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {key !== rankingData.length - 1 && (
                    <StyledTableRow>
                      <StyledTableCell align="center" colSpan={4}>
                        ... ... ...
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={4}>
                  <CircularProgress />
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
