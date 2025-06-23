import React from 'react';
import { Modal, ModalDialog, ModalClose, Typography } from '@mui/joy';
import { Building2, Globe, Phone } from 'lucide-react';
import { Business, Fax } from '@mui/icons-material';

const supplyDetailsDetailsModal = ({ open, onClose, supply }) => {
    const distributeur = {
        frournisseurName: 'PROMOPHARM (HIKMA)',
        frournisseurStatus: 'Établissement pharmaceutique',
        frournisseurAddress: 'Zone Industrielle du Sahl Km 30Had Soualem B.P.96/97',
        frournisseurPhone: '+212522964567_+212522964385',
        frournisseurFax: '+212522964568+212522964233',
        frournisseurWebsite: 'http://www.promopharm.co.ma/',
    };

 const id = 10
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }
    fetch(`http://127.0.0.1:8081/api/medicaments/get-medicament/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        return response.json();
      })
      .then((data) => setRows(data))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);


    // Helper for row display
    const DetailRow = ({ icon, label, value }) => (
        <div className="flex items-start py-2 border-b last:border-b-0 mt-1 mb-1" >
            <div className="w-8 flex justify-center items-center text-[#49d4ee]">{icon}</div>
            <div className="w-32 font-semibold text-gray-700">{label}</div>
            <div className="flex-1 text-gray-900">{value}</div>
        </div>
    );

    // Helper function to format phone/fax as requested
    const formatNumber = (str) => {
        if (!str) return '';
        // Find the first number after the first '+'
        const match = str.match(/\+(\d+)/);
        let firstNumber = match ? `+${match[1]}` : '';
        // Remove the first number from the string
        let rest = str.replace(firstNumber, '');
        // Replace any remaining '+' with ' / * '
        // Remove leading underscores or spaces
        rest = rest.replace(/^[_\s]+/, '');
        // Combine
        return firstNumber + (rest ? '  || ' + rest : ' ');
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ minWidth: 400, maxWidth: 700 }}>
                <ModalClose />
                <Typography level="h5" className="mb-4 text-[#1ca7c6] text-center">
                    Détails du Distributeur
                </Typography>
                <div className="divide-y">
                    <DetailRow icon={<Building2 size={20} />} label="Name" value={distributeur.frournisseurName} />
                    <DetailRow icon={<Business color="warning" size={20} />} label="Adresse" value={distributeur.frournisseurAddress} />
                    <DetailRow icon={<Phone size={20} />} label="Téléphone" value={formatNumber(distributeur.frournisseurPhone)} />
                    <DetailRow icon={<Fax color="warning" size={20} />} label="Fax" value={formatNumber(distributeur.frournisseurFax)} />
                    <DetailRow
                        icon={<Globe size={20} />}
                        label="Site web"
                        value={
                            <a
                                href={distributeur.frournisseurWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#49d4ee] underline hover:text-[#1ca7c6] transition"
                            >
                                {distributeur.frournisseurWebsite}
                            </a>
                        }
                    />
                    <DetailRow icon={null} label="Statut" value={distributeur.frournisseurStatus} />
                </div>
            </ModalDialog>
        </Modal>
    );
};

export default supplyDetailsDetailsModal;
