/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ModalTechniciens from "./ModalTechniciens";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';




function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: { variant: "plain", color: "neutral", size: "sm" },
        }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState("");
  const [residentId, setResidentId] = React.useState("");
  const [chambreId, setChambreId] = React.useState("");

  const navigate = useNavigate();


  type Order = "asc" | "desc";

  const [rows, setRows] = React.useState<any[]>([]);
    const [searchQuery, setSearchQuery] = React.useState("");
  

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://localhost:8081/api/pharmacists/withAutoClosedSessions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        return response.json();
      })
      .then((data) => {
        // Tri des données par date, en supposant que 'date' est le champ contenant la date
        const sortedData = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRows(sortedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  console.log(rows);

  const handleSubmitRefuse = async () => {
    const updatedData = {
      status: "NotAccepted",
      chambreId: chambreId,
      residentId: residentId,
    };

    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.put(
        `http://localhost:8080/notifications/${id}/status`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );
      console.log("Réponse de l'API:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };

  const handleSubmitAccept = async () => {
    const updatedData = {
      status: "Accepted",
      chambreId: chambreId,
      residentId: residentId,
    };

    // Récupérer le token (par exemple, depuis le localStorage ou un contexte)
    const token = localStorage.getItem("token"); // Remplacez cela par la méthode appropriée pour obtenir le token

    try {
      const response = await axios.put(
        ` http://localhost:8080/notifications/${id}/status`,

        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes
          },
        }
      );
      window.location.reload();

      console.log("Réponse de l'API:", response.data);
      // Ajoutez votre logique ici pour gérer la réponse
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      // Gérez les erreurs ici
    }
  };

  const statusComparator = (a: string, b: string, order: Order) => {
    const statusOrderMap = {
      Accepted: 1,
      NotAcceped: 2,
      Non: 3,
    };

    // Comparaison selon l'ordre spécifié
    if (statusOrderMap[a] < statusOrderMap[b]) {
      return order === "desc" ? 1 : -1;
    }
    if (statusOrderMap[a] > statusOrderMap[b]) {
      return order === "desc" ? -1 : 1;
    }
    return 0;
  };
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    if (orderBy === "status") {
      return (a, b) =>
        statusComparator(a[orderBy] as string, b[orderBy] as string, order);
    }

    // Utilisez ici la logique pour d'autres colonnes, comme ID
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }



    const filteredRows = rows.filter((row) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (row.firstName?.toLowerCase() || "").includes(searchLower) ||
      (row.lastName?.toLowerCase() || "").includes(searchLower) ||
      (row.email?.toLowerCase() || "").includes(searchLower) ||
      (row.phoneNumber?.toString() || "").includes(searchQuery)
    );
  });

const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Pharmacist</FormLabel>
        <Input
          sx={{ width: "1000px" }}
          placeholder="Search"
          startDecorator={<SearchIcon />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FormControl>
      <FormControl size="sm">
        <Button size="sm" sx={{ marginTop: "23px" }} color="primary" onClick={() => setOpen(false)}>
          Submit
        </Button>
      </FormControl>
    </>
  );



  // Loading state
  if (rows.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.500",
            width: 64,
            height: 64,
            mb: 1,
            boxShadow: 3,
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.7)" },
              "70%": { boxShadow: "0 0 0 16px rgba(25, 118, 210, 0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)" },
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 36, color: "#fff" }} />
        </Avatar>
        <Typography level="h3" sx={{ color: "primary.700", fontWeight: 600 }}>
          Chargement des données...
        </Typography>
        <Typography level="body-md" sx={{ color: "neutral.500" }}>
          Veuillez patienter pendant le chargement des pharmaciens.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#1976d2"
              strokeWidth="4"
              strokeDasharray="100"
              strokeDashoffset="60"
              strokeLinecap="round"
              style={{
                animation: "dash 1.2s linear infinite",
              }}
            />
            <style>
              {`
                @keyframes dash {
                  0% { stroke-dashoffset: 100; }
                  100% { stroke-dashoffset: 0; }
                }
              `}
            </style>
          </svg>
        </Box>
      </Box>
    );
  }



  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* Desktop Filters */}
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": { minWidth: { xs: "120px", md: "160px" } },
        }}
      >
        {renderFilters()}
      </Box>


      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}>
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#e3fbfd", width: 48, textAlign: "center", padding: "12px 6px" }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== rows.length}
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(event.target.checked ? rows.map((row) => row.id) : []);
                  }}
                  color={selected.length > 0 || selected.length === rows.length ? "warning" : undefined}
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width:80 ,padding: "12px 6px", backgroundColor: "#e3fbfd" }}>last Name</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>first Name</th>
              <th style={{ width: 150, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Email</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>phoneNumber</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Post</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Closed Sessions</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>View Details</th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, "date")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center" }}>
                  <Checkbox
                    size="sm"
                    color="warning"
                    checked={selected.includes(row.id)}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id.toString())
                          : ids.filter((itemId) => itemId !== row.id.toString())
                      );
                    }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>

                <td>{row.lastName}</td>
                <td>
                  {row.firstName}
                </td>
                                <td>{row.userName}</td>

                <td>{row.phoneNumber}</td>
                <td>{row.post}</td>


                <td>
                  {row.autoClosedSessionCount}
                </td>
                <td>
                    <Button
                    size="sm"
                    startDecorator={<ManageAccountsIcon />}
                    onClick={() => navigate(`/dashrpharmacists/details/${row.pharmacistId}`)}
                    color="warning"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
