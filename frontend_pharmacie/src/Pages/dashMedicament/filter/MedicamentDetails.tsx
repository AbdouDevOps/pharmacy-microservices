import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pill, Info as InfoIcon, Building2, Globe, Phone } from 'lucide-react';
import type { Product } from './ProductCard';
import { Business, Fax } from '@mui/icons-material';
import {medicament_data} from '../data/medicament.js'

interface MedicamentDetailsProps {
  products: Product[];
}

const badgeColors: Record<string, string> = {
  Commercialisé: 'bg-green-100 text-green-700',
  'Non commercialisé': 'bg-red-100 text-red-700',
  A: 'bg-blue-100 text-blue-700',
  B: 'bg-yellow-100 text-yellow-700',
};

const MedicamentDetails: React.FC<MedicamentDetailsProps> = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <div className="text-center text-red-500 font-semibold mt-10">Produit non trouvé</div>;
  }

  // Remplacer ceci par la recherche réelle du produit dans `products`
const productx = {
    id: 1,
    Présentation: 'Boite de 12',
    Dosage: '500 MG  | 62.5 MG',
    Distributeur_ou_fabriquant: 'PROMOPHARM (HIKMA)',
    Composition: 'Amoxicilline | Acide clavulanique',
    Classe_thérapeutique:
      'Antibiotique, pénicilline avec inhibiteur des bêtalactamases',
    Statut: 'Commercialisé',
    Code_ATC: 'J01CR02',
    PPV: '54.10 dhs',
    Prix_hospitalier: '33.80 dhs',
    Tableau: 'A',
    Indication: `L’Association amoxicilline et acide clavulanique est indiqué pour le traitement des infections suivantes chez l’adulte et l’enfant : sinusite aiguë, otite, bronchite chronique, pneumonie, cystite, pyélonéphrite, infections de la peau, abcès dentaire, ostéomyélite.`,
    genre: 'A',
    distributeur_info: {
      URL: 'https://medicament.ma/laboratoire/promopharm-s-a/',
      Nom: 'PROMOPHARM (HIKMA)',
      Statut: 'Établissement pharmaceutique',
      Adresse: 'Zone Industrielle du Sahl Km 30Had Soualem B.P.96/97',
      Téléphone: '+212522964567_+212522964385',
      Fax: '+212522964568+212522964233',
      Siteweb_réel: 'http://www.promopharm.co.ma/',
      Usine_Téléphone: null,
    },
  };

  

  // On cherche le médicament dans medicament_data par id (en string ou number selon tes données)
  const product = medicament_data.find(
    (item: any) => String(item.id) === String(id)
  );

  if (!id || !product) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Produit non trouvé
      </div>
    );
  }
  return (
    <div className="w-5xl   mx-auto bg-gradient-to-br from-white via-[#f7fbfd] to-[#e6f7fa] rounded-3xl  p-8 md:p-12 mt-10 animate-fade-in overflow-y-scroll">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#49d4ee] transition mb-6"
      >
        <ArrowLeft size={22} />
        <span className="font-medium">Retour</span>
      </button>

      {/* Carte identité médicament */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 bg-white/80 rounded-2xl p-6 border border-[#e3f3fa]  transition">
        <div className="flex items-center gap-4">
          <div className="bg-[#49d4ee]/10 rounded-full p-3">
            <Pill size={38} className="text-[#49d4ee]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
              {product.Composition}
            </h1>
            <div className="flex gap-2 mt-2">
              <Badge color={badgeColors[product.Statut] || 'bg-gray-100 text-gray-700'}>
                {product.Statut}
              </Badge>
              <Badge color={badgeColors[product.Tableau] || 'bg-gray-100 text-gray-700'}>
                Tableau {product.Tableau}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="text-sm text-gray-400">Code ATC</span>
          <span className="font-bold text-lg text-[#49d4ee] tracking-wider">{product.Code_ATC}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 space-y-4">
          <Info label="Présentation" value={product.Présentation} icon={<InfoIcon size={18} />} />
          <Info label="Dosage" value={product.Dosage} icon={<Pill size={18} />} />
          <Info label="Genre" value={product.genre} />
          <Info label="Classe thérapeutique" value={product.Classe_thérapeutique} />
        </div>
        <div className="flex-1 space-y-4">
          <Info label="Prix Public" value={product.PPV} accent icon={<InfoIcon size={18} />} />
          <Info label="Prix Hospitalier" value={product.Prix_hospitalier} />
          <Info label="Distributeur" value={product.Distributeur_ou_fabriquant} icon={<Building2 size={18} />} />
        </div>
      </div>

      <Separator />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <InfoIcon size={20} className="text-[#49d4ee]" />
          Indications
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify bg-[#e6f7fa] rounded-lg p-4 shadow-inner border border-[#b6e6f7]">
          {product.Indication}
        </p>
      </div>

      <Separator />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-[#49d4ee]" />
          Distributeur
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 bg-white/80 rounded-xl p-6 shadow border border-[#e3f3fa]">
          <Info label="Nom" value={product.distributeur_info.Nom} icon={<Building2 size={16} />} />
          <Info label="Adresse" value={product.distributeur_info.Adresse} icon={<Business color='warning' /> } />
          <Info label="Téléphone" value={product.distributeur_info.Téléphone} icon={<Phone size={16} />} />
          <Info label="Fax" value={product.distributeur_info.Fax} icon={<Fax color='warning' />} />
          <Info
            label="Site web"
            value={
              <a
                href={product.distributeur_info.Siteweb_réel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#49d4ee] underline hover:text-[#1ca7c6] transition"
              >
                {product.distributeur_info.Siteweb_réel}
              </a>
            }
            icon={<Globe size={16} />}
          />
          <Info label="Statut" value={product.distributeur_info.Statut} />
        </div>
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
  accent = false,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-2">
    {icon && <span className="mt-1 text-[#49d4ee]">{icon}</span>}
    <div>
      <h4 className="text-xs uppercase text-gray-400 font-semibold tracking-wider">{label}</h4>
      <p
        className={`mt-1 text-base md:text-lg ${
          accent ? 'text-[#49d4ee] font-bold' : 'text-gray-800'
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

const Badge = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${color} border border-[#b6e6f7]`}
  >
    {children}
  </span>
);

const Separator = () => (
  <div className="my-8 border-t border-[#b6e6f7]" />
);

export default MedicamentDetails;
