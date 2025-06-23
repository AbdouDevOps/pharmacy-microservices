/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  ModalClose,
  Select,
  Option,
  Table,
  Sheet,
  Checkbox,
  IconButton,
  Typography,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  Link,
} from "@mui/joy";
import {
  FilterAlt,
  ArrowDropDown,
  CheckRounded,
  Block,
  AutorenewRounded,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  MoreHorizRounded,
  GroupRemoveSharp,
  Groups,
  Person,
  Whatshot,
} from "@mui/icons-material";
import { colors } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


import ModalAddMedicamentLot from "./ModalAddMedicamentLot.jsx";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";


// Types & Utils
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

// Exemple de données (à remplacer par vos données réelles)

const rowsExemple =[
  {
    "name": "Paracetamol 500mg",
    "PPV": 12.00,
    "PH": 15.00,
    "lotNumber": 1001,
    "quantity": 250,
    "expirationDate": "2026-03-15",
    "entryDate": "2025-04-01"
  },
  {
    "name": "Ibuprofen 400mg",
    "PPV": 18.00,
    "PH": 22.00,
    "lotNumber": 1002,
    "quantity": 180,
    "expirationDate": "2026-05-30",
    "entryDate": "2025-04-05"
  },
  {
    "name": "Amoxicillin 1g",
    "PPV": 35.00,
    "PH": 45.00,
    "lotNumber": 1003,
    "quantity": 100,
    "expirationDate": "2026-08-10",
    "entryDate": "2025-04-07"
  },
  {
    "name": "Doliprane 1g",
    "PPV": 20.00,
    "PH": 25.00,
    "lotNumber": 1004,
    "quantity": 300,
    "expirationDate": "2026-01-01",
    "entryDate": "2025-03-29"
  },
  {
    "name": "Aspirin 100mg",
    "PPV": 10.00,
    "PH": 13.00,
    "lotNumber": 1005,
    "quantity": 500,
    "expirationDate": "2025-12-20",
    "entryDate": "2025-03-15"
  },
  {
    "name": "Vitamin C 500mg",
    "PPV": 8.00,
    "PH": 11.00,
    "lotNumber": 1006,
    "quantity": 320,
    "expirationDate": "2026-06-11",
    "entryDate": "2025-04-09"
  },
  {
    "name": "Zyrtec 10mg",
    "PPV": 25.00,
    "PH": 30.00,
    "lotNumber": 1007,
    "quantity": 150,
    "expirationDate": "2026-04-14",
    "entryDate": "2025-04-01"
  },
  {
    "name": "Augmentin 625mg",
    "PPV": 40.00,
    "PH": 50.00,
    "lotNumber": 1008,
    "quantity": 80,
    "expirationDate": "2026-09-20",
    "entryDate": "2025-04-10"
  },
  {
    "name": "Motilium 10mg",
    "PPV": 14.00,
    "PH": 18.00,
    "lotNumber": 1009,
    "quantity": 275,
    "expirationDate": "2026-07-18",
    "entryDate": "2025-04-11"
  },
  {
    "name": "Dafalgan 1g",
    "PPV": 22.00,
    "PH": 28.00,
    "lotNumber": 1010,
    "quantity": 290,
    "expirationDate": "2026-01-25",
    "entryDate": "2025-03-28"
  },
  {
    "name": "NurofenFlash 400mg",
    "PPV": 19.00,
    "PH": 23.00,
    "lotNumber": 1011,
    "quantity": 170,
    "expirationDate": "2025-11-10",
    "entryDate": "2025-04-02"
  },
  {
    "name": "Strepsils Miel Citron",
    "PPV": 13.00,
    "PH": 17.00,
    "lotNumber": 1012,
    "quantity": 210,
    "expirationDate": "2025-10-12",
    "entryDate": "2025-03-20"
  },
  {
    "name": "Gaviscon Menthe",
    "PPV": 16.00,
    "PH": 21.00,
    "lotNumber": 1013,
    "quantity": 140,
    "expirationDate": "2026-02-14",
    "entryDate": "2025-04-04"
  },
  {
    "name": "Smecta",
    "PPV": 11.00,
    "PH": 14.00,
    "lotNumber": 1014,
    "quantity": 360,
    "expirationDate": "2026-04-25",
    "entryDate": "2025-03-25"
  },
  {
    "name": "Imodium 2mg",
    "PPV": 17.00,
    "PH": 22.00,
    "lotNumber": 1015,
    "quantity": 125,
    "expirationDate": "2025-09-09",
    "entryDate": "2025-03-30"
  },
  {
    "name": "Rennie Menthe",
    "PPV": 9.00,
    "PH": 12.00,
    "lotNumber": 1016,
    "quantity": 230,
    "expirationDate": "2026-03-20",
    "entryDate": "2025-04-08"
  },
  {
    "name": "Spasfon Lyoc",
    "PPV": 15.00,
    "PH": 19.00,
    "lotNumber": 1017,
    "quantity": 190,
    "expirationDate": "2026-05-01",
    "entryDate": "2025-04-03"
  },
  {
    "name": "Hextril Bain de bouche",
    "PPV": 24.00,
    "PH": 29.00,
    "lotNumber": 1018,
    "quantity": 160,
    "expirationDate": "2026-06-20",
    "entryDate": "2025-04-06"
  },
  {
    "name": "Toplexil Sirop",
    "PPV": 26.00,
    "PH": 32.00,
    "lotNumber": 1019,
    "quantity": 95,
    "expirationDate": "2026-03-30",
    "entryDate": "2025-04-12"
  },
  {
    "name": "Rhinadvil",
    "PPV": 21.00,
    "PH": 27.00,
    "lotNumber": 1020,
    "quantity": 110,
    "expirationDate": "2025-12-01",
    "entryDate": "2025-03-27"
  },
  {
    "name": "Claritin 10mg",
    "PPV": 28.00,
    "PH": 35.00,
    "lotNumber": 1021,
    "quantity": 130,
    "expirationDate": "2026-01-19",
    "entryDate": "2025-04-13"
  },
  {
    "name": "Nexium 20mg",
    "PPV": 32.00,
    "PH": 40.00,
    "lotNumber": 1022,
    "quantity": 105,
    "expirationDate": "2026-08-05",
    "entryDate": "2025-04-14"
  },
  {
    "name": "Xanax 0.25mg",
    "PPV": 45.00,
    "PH": 55.00,
    "lotNumber": 1023,
    "quantity": 60,
    "expirationDate": "2026-09-09",
    "entryDate": "2025-04-15"
  },
  {
    "name": "Lexomil",
    "PPV": 47.00,
    "PH": 60.00,
    "lotNumber": 1024,
    "quantity": 70,
    "expirationDate": "2026-10-01",
    "entryDate": "2025-04-16"
  },
  {
    "name": "Efferalgan Vitamine C",
    "PPV": 30.00,
    "PH": 36.00,
    "lotNumber": 1025,
    "quantity": 200,
    "expirationDate": "2026-02-18",
    "entryDate": "2025-04-17"
  }
]




export default function OrderTable() {
  // States
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [statusOrder, setStatusOrder] = React.useState<Order>("asc");
  const [isChambreIncidentModalOpen, setIsChambreIncidentModalOpen] = React.useState(false);
  const [chambreIncidents, setChambreIncidents] = React.useState([{}]);
  const [isChambreResidentModalOpen, setIsChambreResidentModalOpen] = React.useState(false);
  const [chambreResident, setChambreResident] = React.useState([{}]);
  const [isAddMedicamentLotOpen, setIsAddMedicamentLotOpen] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);

  // Handlers



  const [searchQuery, setSearchQuery] = React.useState("");
    // Filtered rows
  const filteredRows = rowsExemple.filter((row) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (row.name?.toLowerCase() || "").includes(searchLower) ||
      row.PPV.toString().includes(searchLower) ||
      row.PH.toString().includes(searchLower) ||
      row.entryDate.toLowerCase().includes(searchLower) ||
      row.expirationDate.toString().includes(searchLower)
    );
  });
  
  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Pharmacist</FormLabel>
        <Input
          sx={{ width: "850px" }}
          placeholder="Search"
          startDecorator={<SearchIcon />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FormControl>
      
      <FormControl size="sm" sx={{ flexDirection: "row", alignItems: "center", gap: 1, mt: "23px" }}>
        <Button size="sm" color="primary" onClick={() => setIsAddMedicamentLotOpen(true)} sx={{width: "200px"}}>
           + Add Medicament's Lot
        </Button>
      </FormControl>
      
    </>
  );
  const nav = useNavigate();


  // Data fetching
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8081/api/medicaments/medicament-inventory", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => setRows(data.sort(getComparator(statusOrder, "status"))))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, [statusOrder]);

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
      {/* Mobile Filters */}
      <Sheet className="SearchAndFilters-mobile" sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
        <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} sx={{ flexGrow: 1 }} />
        <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <FilterAlt />
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

      {/* Desktop/Tablet Filters */}
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
          display: { xs: "none", sm: "initial" },
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
              <th style={{ width: 150, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Name</th>
              <th style={{ width: 60, padding: "12px 6px", backgroundColor: "#e3fbfd" ,textAlign:"center"}}>PPV</th>
              <th style={{ width: 60, padding: "12px 6px", backgroundColor: "#e3fbfd",textAlign:"center" }}>PH</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd",textAlign:"center" }}>Lot Number</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd",textAlign:"center" }}>Quantity Number</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd"}}>Entry Date</th>
              <th style={{ width: 80, padding: "12px 6px", backgroundColor: "#e3fbfd" }}>Expiration Date</th>
              <th style={{ width: 80, backgroundColor: "#e3fbfd", padding: "12px 6px" }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredRows].sort(getComparator(order, "statue")).map((row) => (
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
                <td ><Typography>{row.name}</Typography></td>
                <td style={{textAlign:"center"}}><Typography>{row.PPV} Dh</Typography></td>
                <td style={{textAlign:"center"}}><Typography>{row.PH} Dh</Typography></td>
                <td style={{textAlign:"center"}}><Typography>{row.lotNumber}</Typography></td>
                <td style={{textAlign:"center"}}><Typography>{row.quantity}</Typography></td>
                <td ><Typography>{row.entryDate}</Typography></td>
                <td><Typography>{row.expirationDate}</Typography></td>
                <td>
                  <Button
                    color="warning"
                    size="sm"
                    startDecorator={<ManageAccountsIcon />}
                    onClick={() => nav(`/dashmedicamentsdatabase/medicament/${row.name}`)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modals */}
        {isAddMedicamentLotOpen && (
          <ModalAddMedicamentLot
            open={isAddMedicamentLotOpen}
            onClose={() => setIsAddMedicamentLotOpen(false)}
          />
        )}
      </Sheet>
    </>
  );
}
