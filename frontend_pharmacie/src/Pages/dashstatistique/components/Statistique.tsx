import { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Sheet,
  Typography,
  Card,
  CardContent,
  CardOverflow,
  CardCover,
  CardActions,
  Button,
} from '@mui/joy';

import ReactApexChart from 'react-apexcharts';
import Skeleton from 'react-loading-skeleton';
import { ApexOptions } from 'apexcharts';

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Users, ShoppingCart, DollarSign, TrendingUp, Pill } from 'lucide-react';

// ... (toutes vos fonctions utilitaires et hooks inchangés)

const Statstique = () => {

  const [nombreCommandes, setNombreCommandes] = useState<[string, number][]>([]);
  const [topMedicaments, setTopMedicaments] = useState([]);
  const [produitsEnStock, setProduitsEnStock] = useState<[string, number][]>([]);
  const [ventesMensuelles, setVentesMensuelles] = useState([]);
  const [revenusMensuels, setRevenusMensuels] = useState<[string, number][]>([]);
  const [revenusNets, setRevenusNets] = useState([]);
  const [loading, setLoading] = useState(true);






  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);



  const client = useRef<Client | null>(null);



useEffect(() => {
  const sock = new SockJS("http://localhost:8081/ws-statistique");
  client.current = new Client({
    webSocketFactory: () => sock,
    reconnectDelay: 2000,
    onConnect: () => {
      console.log("✅ WebSocket connecté");

      // Abonnement au topic
      client.current?.subscribe("/topic/statistiques", (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log("📊 Données reçues :", data);

          if (Array.isArray(data)) {
            data.forEach((item: { name: string; value: any }) => {
              switch (item.name) {
                case 'nombreCommandes':
                  setNombreCommandes(item.value);
                  break;
                case 'topMedicaments':
                  setTopMedicaments(item.value);
                  break;
                case 'produitsEnStock':
                  setProduitsEnStock(item.value);
                  break;
                case 'ventesMensuelles':
                  setVentesMensuelles(item.value);
                  break;
                case 'RevenusMensuels':
                  setRevenusMensuels(item.value);
                  break;
                case 'revenusNets':
                  setRevenusNets(item.value);
                  break;
                default:
                  console.warn("🔍 Clé non reconnue :", item.name);
              }
            });
          } else {
            console.warn("❗ Format de données inattendu :", data);
          }

        } catch (error) {
          console.error("❌ Erreur lors du parsing du message :", error);
        }
      });

      // 🔥 Appel REST pour déclencher l'envoi toutes les 8 secondes
      const intervalId = setInterval(() => {
        fetch("http://localhost:8081/api/statistiques/all")
          .then((res) => res.json())
          .then((data) => {
            console.log("📡 Appel REST terminé, réponse :", data);
          })
          .catch((err) => {
            console.error("❌ Erreur lors de l’appel REST :", err);
          });
      }, 80000); //pour regler l'affichage

      // Appel initial immédiat
      fetch("http://localhost:8081/api/statistiques/all")
        .then((res) => res.json())
        .then((data) => {
          console.log("📡 Appel REST terminé, réponse :", data);
        })
        .catch((err) => {
          console.error("❌ Erreur lors de l’appel REST :", err);
        });

      // Nettoyage de l'intervalle à la déconnexion
      if (client.current) {
        client.current.onDisconnect = () => {
          clearInterval(intervalId);
        };
      }
    },
    onStompError: (frame) => {
      console.error("💥 Erreur STOMP :", frame);
    },
  });

  client.current.activate();

  return () => {
    client.current?.deactivate();
    console.log("🔌 WebSocket déconnecté");
  };
}, []);


    
    useEffect(() => {
      // Simulate data loading
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }, []);
    

      const colors = ['#84ea1a', '#49d4ee', '#F59E0B', '#EF4444', '#8B5CF6'];


    // Extraire les éléments de ventesMensuelles où la date contient "2024"
    // Extraire les ventes mensuelles pour l'année 2024, en supposant que chaque item est du type ["YYYY-MM", valeur]
    const ventes2024ParMois = Array(12).fill(0);
    ventesMensuelles.forEach((item: any) => {
      if (Array.isArray(item) && typeof item[0] === "string" && item[0].startsWith("2024-")) {
        const mois = parseInt(item[0].split("-")[1], 10) - 1; // mois de 0 à 11
        if (mois >= 0 && mois < 12) {
          ventes2024ParMois[mois] = item[1];
        }
      }
    });



        const ventes2023ParMois = Array(12).fill(0);
    ventesMensuelles.forEach((item: any) => {
      if (Array.isArray(item) && typeof item[0] === "string" && item[0].startsWith("2023-")) {
        const mois = parseInt(item[0].split("-")[1], 10) - 1; // mois de 0 à 11
        if (mois >= 0 && mois < 12) {
          ventes2023ParMois[mois] = item[1];
        }
      }
    });


            const ventes2025ParMois = Array(12).fill(0);
    ventesMensuelles.forEach((item: any) => {
      if (Array.isArray(item) && typeof item[0] === "string" && item[0].startsWith("2025-")) {
        const mois = parseInt(item[0].split("-")[1], 8) - 1; // mois de 0 à 11
        if (mois >= 0 && mois < 12) {
          ventes2025ParMois[mois] = item[1];
        }
      }
    });
    // Exemple d'utilisation :
    // ventes2024ParMois[0] = ventes de janvier 2024, ventes2024ParMois[1] = février, etc.
    console.log(ventes2024ParMois)
    console.log(ventes2023ParMois)

    // Sample data for all charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    
  
    
    // ApexCharts
    // Line chart options
    const apexLineOptions: ApexOptions = {
      chart: {
        type: 'line',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      xaxis: {
        categories: months,
      },
      colors: [colors[0], colors[1] , colors[2]],
      legend: {
        position: 'top',
      },
    };
    
    const apexLineSeries = [
      {
        name: 'Sales 2023',
        data: ventes2024ParMois
      },
      {
        name: 'Sales 2024',
        data: ventes2023ParMois
      },

    ];
    

    function getValeurMoisActuel(data: [string, number][]): number {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const moisActuel = `${yyyy}-${mm}`;
    // Les dates dans data sont des chaînes "YYYY-MM"
    const found = data.find((item) => Array.isArray(item) && item[0] === moisActuel);
    return found ? found[1] : 0;
  }

    // Pie chart options

  const total = getValeurMoisActuel(revenusMensuels);
  console.log("total :", total)







// Fonction pour obtenir YYYY-MM d'une date
function getYYYYMM(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// Fonction pour obtenir mois précédent en YYYY-MM
function getPreviousMonthYYYYMM(date) {
  const prev = new Date(date);
  prev.setMonth(prev.getMonth() - 1);
  return getYYYYMM(prev);
}

// Fonction pour formater évolution en pourcentage
function formaterEvolution(evo) {
  const arrondi = evo.toFixed(1);
  return evo >= 0 ? `+${arrondi}%` : `${arrondi}%`;
}



// Date courante
const now = new Date();
const moisActuel = getYYYYMM(now);
const moisPrecedent = getPreviousMonthYYYYMM(now);

// Recherche des valeurs
const revenuActuel = revenusMensuels
  .filter((item) => Array.isArray(item))
  .find(([date]) => date === moisActuel)?.[1] ?? 0;
const revenuPrecedent = revenusMensuels
  .filter((item) => Array.isArray(item))
  .find(([date]) => date === moisPrecedent)?.[1] ?? 0;

// Calcul évolution
const evolutionRevenus = revenuPrecedent === 0 ? 0 : ((revenuActuel - revenuPrecedent) / revenuPrecedent) * 100;


console.log("evolutionRevenus :" , evolutionRevenus)


  // Trouver les deux mois précédents par rapport au mois actuel
  const moisMoins2 = getPreviousMonthYYYYMM(new Date(now.getFullYear(), now.getMonth() - 1));
  const moisMoins1 = getPreviousMonthYYYYMM(now);

  // Récupérer les revenus des deux mois précédents
  const revenuMoisMoins2 = revenusMensuels    .filter((item) => Array.isArray(item))
    .find(([date]) => date === moisMoins2)?.[1] ?? 0;
  const revenuMoisMoins1 = revenusMensuels
    .filter((item) => Array.isArray(item))
    .find(([date]) => date === moisMoins1)?.[1] ?? 0;

  // Calculer la différence et le pourcentage d'évolution
  const difference = revenuMoisMoins1 - revenuMoisMoins2;
  const pourcentage = revenuMoisMoins2 === 0 ? 0 : ((difference) / revenuMoisMoins2) * 100;

  const statCards = [
    {
      title: "Total Medicines",
      value: "5749",
      icon: <Pill className="text-blue-500" size={28} />,
      change: null,
      color: "bg-blue-50",
      changeColor: "",
    },
    {
      title: "Total Orders",
      value: nombreCommandes,
      icon: <ShoppingCart className="text-green-500" size={28} />,
      change: null,
      color: "bg-green-50",
      changeColor: "",
    },
    {
      title: "Revenue this month",
      value: `${revenuActuel.toLocaleString()} MAD`,
      icon: <DollarSign className="text-purple-500" size={28} />,
      change: formaterEvolution(evolutionRevenus),
      color: "bg-purple-50",
      changeColor: evolutionRevenus < 0 ? "text-red-600" : "text-green-600",
    },
    {
      title: "Growth",
      value: `${evolutionRevenus.toFixed(1)}%`,
      icon: <TrendingUp className="text-amber-500" size={28} />,
      change: pourcentage > 0 ? "↑ last month" : "↓ last month",
      color: "bg-amber-50",
      changeColor: evolutionRevenus < 0 ? "text-red-600" : "text-green-600",
    },
  ];




  return (
    <div className="animate-fade-in">

      {/* Stats Row */}
      <Grid container spacing={3} className="mb-6">
        {statCards.map((stat, index) => (
          <Grid xs={12} sm={6} md={3} key={index}>
            <Sheet variant="outlined" sx={{ p: 2, height: '100%' }}>
              {loading ? (
                <Skeleton height={100} />
              ) : (
                <div className={`flex items-center p-4 rounded-lg ${stat.color}`}>
                  <div className="mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <Typography level="body2" className="text-gray-500">
                      {stat.title}
                    </Typography>
                    <Typography level="h4" className="font-semibold">
                      {stat.value}
                    </Typography>
                    <Typography level="body2" className={stat.changeColor}>
                      {stat.change} --
                    </Typography>
                  </div>
                </div>
              )}
            </Sheet>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography level="h5" sx={{ mb: 2 }}>
                Top 10 Medicines (by sales)
              </Typography>
              {loading ? (
                <Skeleton height={300} />
              ) : (
                <ReactApexChart
                  // ... options inchangées
                  options={{
                    chart: { type: 'bar', toolbar: { show: false } },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        borderRadius: 6,
                        barHeight: '60%',
                      },
                    },
                    dataLabels: {
                      enabled: true,
                      style: { fontSize: '14px' },
                      formatter: (val: number) => val.toLocaleString('fr-FR'),
                    },
                    xaxis: {
                      categories: topMedicaments.slice(0, 10).map((item: any) => item[0]),
                      labels: { style: { fontSize: '14px' } },
                      title: { text: 'Ventes' },
                    },
                    yaxis: {
                      labels: { style: { fontSize: '14px' } },
                    },
                    colors: ['#49d4ee'],
                    tooltip: {
                      y: {
                        formatter: (val: number) => val.toLocaleString('fr-FR'),
                      },
                    },
                    grid: { borderColor: '#84ea1a' },
                  }}
                  series={[
                    {
                      data: topMedicaments.slice(0, 10).map((item: any) => item[1]),
                    },
                  ]}
                  type="bar"
                  height={320}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography level="h5" sx={{ mb: 2 }}>
                Total sold per month
              </Typography>
              {loading ? (
                <Skeleton height={300} />
              ) : (
                <ReactApexChart
                  options={apexLineOptions}
                  series={apexLineSeries}
                  type="line"
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography level="h5" sx={{ mb: 2 }}>
                Net Revenue per Month (2023-2025)
              </Typography>
              {loading ? (
                <Skeleton height={300} />
              ) : (
                <ReactApexChart
                  options={{
                    chart: { type: 'area', toolbar: { show: false } },
                    xaxis: {
                      categories: Array.isArray(revenusNets)
                        ? revenusNets
                            .filter((item: any) => Array.isArray(item))
                            .sort((a: any, b: any) => a[0].localeCompare(b[0]))
                            .map((item: any) => item[0])
                        : [],
                      title: { text: 'Mois' },
                    },
                    yaxis: {
                      labels: {
                        formatter: (value: number) => value.toLocaleString() + " DA",
                      },
                      title: { text: 'Revenus Nets' },
                    },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth', width: 2 },
                    fill: {
                      type: 'gradient',
                      gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.2,
                        stops: [0, 90, 100],
                      },
                    },
                    colors: ['#49d4ee'],
                    tooltip: {
                      y: {
                        formatter: (value: number) => value.toLocaleString() + " DA",
                      },
                    },
                  }}
                  series={[
                    {
                      name: 'Revenus Nets',
                      data: Array.isArray(revenusNets)
                        ? revenusNets
                            .filter((item: any) => Array.isArray(item))
                            .sort((a: any, b: any) => a[0].localeCompare(b[0]))
                            .map((item: any) => item[1])
                        : [],
                    },
                  ]}
                  type="area"
                  height={300}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statstique;
