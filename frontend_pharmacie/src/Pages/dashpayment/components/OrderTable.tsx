/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import {
  Avatar, Box, Button, Chip, Divider, FormControl, FormLabel, Link, Input,
  Modal, ModalDialog, ModalClose, Select, Option, Table, Sheet, Checkbox,
  IconButton, Typography, Menu, MenuButton, MenuItem, Dropdown
} from "@mui/joy";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { LocalShipping, Update } from "@mui/icons-material";

import UpdateLowInventoryModal from "./UpdateLowInventoryModal.jsx";

import SuppplyDetailsModal from "./SupplyDetailsModal.jsx";


// --- Données statiques (pour référence ou fallback) ---


const lowStockStaticData = [
  {
    name : "Paracetamol",
    quantity: 5,
    entryDate: "2023-10-01",
    expirationDate: "2024-01-01",
  },
  {
    name : "Ibuprofen",
    quantity: 3,
    entryDate: "2023-10-05",
    expirationDate: "2024-02-01",
  },
  {
    name : "Amoxicillin",
    quantity: 2,
    entryDate: "2023-10-10",
    expirationDate: "2024-03-01",
  },
  {
    name : "Aspirin",
    quantity: 1,
    entryDate: "2023-10-15",
    expirationDate: "2024-04-01",
  },
  {
    name : "Ciprofloxacin",
    quantity: 4,
    entryDate: "2023-10-20",
    expirationDate: "2024-05-01",
  },
  {
    name : "Omeprazole",
    quantity: 6,
    entryDate: "2023-10-25",
    expirationDate: "2024-06-01",
  },
  {
    name : "Metformin",
    quantity: 8,
    entryDate: "2023-10-30",
    expirationDate: "2024-07-01",
  }]

const criticalLowStockStaticData = [
  {
    name : "Insulin",
    quantity: 1,
    entryDate: "2023-10-01",
    expirationDate: "2024-01-01",
  },
  {
    name : "Warfarin",
    quantity: 0,
    entryDate: "2023-10-05",
    expirationDate: "2024-02-01",
  },
  {
    name : "Levothyroxine",
    quantity: 2,
    entryDate: "2023-10-10",
    expirationDate: "2024-03-01",
  },
  {
    name : "Lisinopril",
    quantity: 3,
    entryDate: "2023-10-15",
    expirationDate: "2024-04-01",
  },
  {
    name : "Atorvastatin",
    quantity: 0,
    entryDate: "2023-10-20",
    expirationDate: "2024-05-01",
  },
  {
    name : "Amlodipine",
    quantity: 1,
    entryDate: "2023-10-25",
    expirationDate: "2024-06-01", 
  }]
// --- Types et fonctions utilitaires ---
type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

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

const statusOrderMap = { Paid: 1, PendingPayment: 2, LatePayment: 3 };
const statusComparator = (a: string, b: string, order: Order) => {
  if (statusOrderMap[a] < statusOrderMap[b]) return order === "desc" ? 1 : -1;
  if (statusOrderMap[a] > statusOrderMap[b]) return order === "desc" ? -1 : 1;
  return 0;
};

function getStatusComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
) {
  if (orderBy === "status") {
    return (a, b) =>
      statusComparator(a[orderBy] as string, b[orderBy] as string, order);
  }
  return getComparator(order, orderBy);
}


// --- Composant principal ---
export default function OrderTable() {
  // --- States ---
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [statusOrder, setStatusOrder] = React.useState<Order>("asc");
  const [isUpdateLowInventoryModalOpen, setIsUpdateLowInventoryModalOpen] = React.useState(false);
  const [isSupplyDetailsModalOpen, setIsSupplyDetailsModalOpen] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const [lowStock, setLowStock] = React.useState<any[]>([]);
  const [criticalLowStock, setCriticalLowStock] = React.useState<any[]>([]);
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  

  // --- Effets pour récupérer les données ---
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8081/api/medicaments/lots/aleart/critical-low-stock", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then(setCriticalLowStock)
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8081/api/medicaments/lots/aleart/vlow-stock", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then(setLowStock)
      .catch(console.error);
  }, []);

  // --- Fonctions handlers ---
  const handleStatusClick = () => {
    const newOrder = statusOrder === "asc" ? "desc" : "asc";
    setStatusOrder(newOrder);
    setRows([...rows].sort(getStatusComparator(newOrder, "status")));
  };

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
    </>
  );



    const filteredRows = lowStockStaticData.filter((row) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (lowStockStaticData.name?.toLowerCase() || "").includes(searchLower) ||
      (lowStockStaticData.entryDate?.toString() || "").includes(searchQuery) ||
      (lowStockStaticData.expirationDate?.toString() || "").includes(searchQuery) ||
      (lowStockStaticData.quantity?.toString() || "").includes(searchQuery)
    );
  });

  // --- Affichage du chargement ---
  {/**  if (lowStock.length === 0 && criticalLowStock.length === 0) {
    return (
      <Box
        sx={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          alignItems: "center", height: "60vh", gap: 2,
        }}>
        <Avatar
          sx={{
            bgcolor: "primary.500", width: 64, height: 64, mb: 1, boxShadow: 3,
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.7)" },
              "70%": { boxShadow: "0 0 0 16px rgba(25, 118, 210, 0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)" },
            },
          }}>
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
              cx="24" cy="24" r="20" fill="none" stroke="#1976d2"
              strokeWidth="4" strokeDasharray="100" strokeDashoffset="60"
              strokeLinecap="round"
              style={{ animation: "dash 1.2s linear infinite" }}
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
     */}


  // --- Rendu principal ---
  return (
    <>
      {/* Filtres mobile */}
      <Sheet className="SearchAndFilters-mobile" sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
        <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} sx={{ flexGrow: 1 }} />
        <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">Filters</Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button color="primary" onClick={() => setOpen(false)}>Submit</Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* Filtres desktop */}
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

      {/* Tableau */}
      <Sheet className="OrderTableContainer" variant="outlined" sx={{
        display: { xs: "none", sm: "initial" }, width: "100%", borderRadius: "sm",
        flexShrink: 1, overflow: "auto", minHeight: 0,
      }}>
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
          }}>
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: "center", padding: "12px 6px", backgroundColor: "#e3fbfd" }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== rows.length}
                  checked={selected.length === rows.length}
                  onChange={(event) => setSelected(event.target.checked ? rows.map((row) => row.id) : [])}
                  color={selected.length > 0 || selected.length === rows.length ? "warning" : undefined}
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 100, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Name</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Quantity</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Entry Date</th>
              <th style={{ width: 80, backgroundColor: "#e3fbfd", padding: "12px 6px" }}>Expiration Date</th>
              <th style={{ width: 80, backgroundColor: "#e3fbfd", padding: "12px 6px" }}>Update Lots</th>
              <th style={{ width: 80, backgroundColor: "#e3fbfd", padding: "12px 6px" }}>Supplier Details</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredRows].sort(getStatusComparator(order, "quantity")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "warning" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {row.name}
                  </Box>
                </td>
                <td>
                  <Chip
                    variant="outlined"
                    
                    sx={{
                      backgroundColor:
                        row.quantity <= 5
                          ? "red" // rouge pour danger
                          : row.quantity <= 10
                          ? "#FF5F1F" // orange pour warning
                          : "#4caf50", // vert pour success
                      color: "#fff",
                    }}
                  >
                    {row.quantity} units
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {row.entryDate}
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {row.expirationDate}
                  </Box>
                </td>
                <td >
                  <Button
                    color="primary"
                    size="sm"
                    startDecorator={<Update />}
                    onClick={() => {setIsUpdateLowInventoryModalOpen(true);   
                      setName(row.name);
                      setQuantity(row.quantity);
                      console.log(name, quantity);}}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    startDecorator={<LocalShipping />}
                    onClick={() => {

                      setIsSupplyDetailsModalOpen(true) ; 


                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isUpdateLowInventoryModalOpen && (
          <UpdateLowInventoryModal
            open={isUpdateLowInventoryModalOpen}
            onClose={() => setIsUpdateLowInventoryModalOpen(false)}
            name={name}
            quantity={quantity}
          />
        )}
        {isSupplyDetailsModalOpen && (
          <SuppplyDetailsModal
            open={isSupplyDetailsModalOpen}
            onClose={() => setIsSupplyDetailsModalOpen(false)}
          />
        )}
      </Sheet>
    </>
  );
}
