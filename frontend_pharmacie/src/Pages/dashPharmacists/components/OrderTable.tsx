/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  ModalClose,
  Table,
  Sheet,
  Checkbox,
  IconButton,
  Typography,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  Avatar,
} from "@mui/joy";
import {
  FilterAlt as FilterAltIcon,
  Search as SearchIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
  Cancel,
} from "@mui/icons-material";
import axios from "axios";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";



// Utils
type Order = "asc" | "desc";
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Menu for each row (not used in main table, but kept for future use)
function RowMenu() {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}>
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

// Main component
export default function OrderTable() {
    const nav = useNavigate();

  // State
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [rows, setRows] = React.useState<any[]>([]);

  // Fetch data
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8081/api/pharmacists/getall", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);

  // Filtered rows
  const filteredRows = rows.filter((row) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (row.firstName?.toLowerCase() || "").includes(searchLower) ||
      (row.lastName?.toLowerCase() || "").includes(searchLower) ||
      (row.email?.toLowerCase() || "").includes(searchLower) ||
      (row.post?.toLowerCase() || "").includes(searchLower) ||
      (row.phoneNumber?.toString() || "").includes(searchQuery)
    );
  });

  // Delete logic
  const handleDeleteResident = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`http://localhost:8081/api/pharmacists/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     // window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };
  const handleDelete = (id: string) => {
    setId(id);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    handleDeleteResident();
  };
  const handleDeleteCancel = () => setIsDeleteModalOpen(false);

  // Renderers
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
    <>
      {/* Delete Modal */}
      <Modal open={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <ModalDialog aria-labelledby="delete-modal" sx={{ width: 400 }}>
          <ModalClose />
          <Typography level="h2" id="delete-modal" sx={{ mb: 2 }}>
            Are you sure you want to delete this resident ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" color="neutral" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button color="warning" onClick={handleDeleteConfirm}>
              Confirm
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

      {/* Mobile Filters */}
      <Sheet className="SearchAndFilters-mobile" sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
        <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} sx={{ flexGrow: 1 }} />
        <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
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

      {/* Table */}
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground": "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
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
              <th style={{ width: 100, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>first Name</th>
              <th style={{ width: 200, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Email</th>
              <th style={{ width: 120, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>phoneNumber</th>
              <th style={{ width: 100, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Salary</th>
              <th style={{ width: 120, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Post</th>
              <th style={{ width: 120, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Delete Pharmacists</th>
              <th style={{ width: 120, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>View Details</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredRows].sort(getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center" }}>
                  <Checkbox
                    size="sm"
                    color="warning"
                    checked={selected.includes(row.id)}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked ? ids.concat(row.id) : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>{row.lastName || "-"}</td>
                <td>{row.firstName || "-"}</td>
                <td style={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Avatar size="sm" src={row.badge?.image}></Avatar>
                  {row.userName || "-"}
                </td>
                <td>{row.phoneNumber || "-"}</td>
                <td>{row.salary}</td>
                <td>{row.post}</td>
                <td>
                  <Button size="sm" 
                  sx={{ bgcolor: "#D2042D","&:hover": { bgcolor: "#990000" } }} 
                  startDecorator={<Cancel />}
                  onClick={() => handleDelete(row.id)}                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    startDecorator={<ManageAccountsIcon />}
                    onClick={() => nav(`/dashrpharmacists/details/${row.id}`)}
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
    </>
  );
}
