import * as React from "react";
import { useState, useEffect } from "react";
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
} from "@mui/joy";
import {
  FilterAlt as FilterAltIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
  CheckRounded as CheckRoundedIcon,
  Block as BlockIcon,
  AutorenewRounded as AutorenewRoundedIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
  Check,
  ShoppingBag,
} from "@mui/icons-material";
import ModalTechniciens from "./ModalMe";
import axios from "axios";
import type { ColorPaletteProp } from "@mui/joy/styles";
import { Link } from 'react-router-dom';


// Types
type Order = "asc" | "desc";
interface Technicien {
  technicienId: number;
  speciality: string;
  firstName: string;
  lastName: string;
  telephone: number;
}
interface Row {
  id: number;
  status: string;
  dateAlert: string;
  dateResolved: string;
  technicienFirstName?: string;
  technicienLastName?: string;
  chambreNumber: number;
  description: string;
}

// Utils
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

const statusOrderMap = { Pending: 1, InProgress: 2, Resolved: 3 };

function statusComparator(a: string, b: string, order: Order) {
  const map = { Pending: 3, InProgress: 2, Resolved: 1 };
  if (map[a] < map[b]) return order === "desc" ? 1 : -1;
  if (map[a] > map[b]) return order === "desc" ? -1 : 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  if (orderBy === "status") {
    return (a, b) => statusComparator(a[orderBy] as string, b[orderBy] as string, order);
  }
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Row menu
function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}>
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

interface Product {
  _id: string;
  nom: string;
  description: string;
  prix: number;
  categorie: string;
  images: string[];
  taille?: string;
  couleur?: string;
  stock?: number;
  onClick?: () => void;
  statut?: string;
}





// Main component
export default function OrderTable() {
  // State
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = React.useState(false);
  const [technicienList, setTechnicienList] = React.useState<Technicien[]>([]);
  const [statusOrder, setStatusOrder] = React.useState<Order>("asc");
  const [incidentId, setIncidentId] = React.useState<number | null>(null);
  const [showAcceptAlert, setAcceptShowAlert] = React.useState(false);
  const [id, setId] = React.useState<number | null>(null);
  const [rows, setRows] = React.useState<Row[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nouvel état pour le chargement


  // Handlers
  const handleAccept = (id: number) => {
    setId(id);
    setAcceptShowAlert(true);
  };

  const handleAcceptConfirm = () => {
    setAcceptShowAlert(false);
    handleSubmitAccept();
  };

  const handleAcceptCancel = () => setAcceptShowAlert(false);

  const handleListTechnicien = (id: number) => {
    setIncidentId(id);
    setIsIncidentModalOpen(true);
  };

  const handleSubmitAccept = async () => {
    const today = new Date().toISOString().split("T")[0];
    const updatedData = { newDateResolved: today, newStatus: "Resolved" };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:8080/incidents/${id}/dateResolved`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Room</FormLabel>
        <Input size="sm" placeholder="Room" type="number" startDecorator={<SearchIcon />} />
      </FormControl>
      <FormControl size="sm">
        <Button size="sm" sx={{ marginTop: "23px" }} color="primary" onClick={() => setOpen(false)}>
          Submit
        </Button>
      </FormControl>
    </>
  );

  const handlClick = () => setOpenModal(true);

  // Fetch data
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch("http://127.0.0.1:8080/incidents/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);

  const handleStatusClick = () => {
    const newOrder = statusOrder === "asc" ? "desc" : "asc";
    setStatusOrder(newOrder);
    setRows([...rows].sort(getComparator(newOrder, "status")));
  };

  // Render
  return (
    <>
      {/* Mobile Filters */}
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
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

      {/* Tablet/Desktop Filters */}
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": { minWidth: { xs: "120px", md: "160px" } },
        }}>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for Resident</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>

    






    </>
  );
}
