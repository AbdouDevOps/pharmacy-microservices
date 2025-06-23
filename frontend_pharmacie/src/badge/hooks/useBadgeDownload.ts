import { useCallback, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const useBadgeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async (element: HTMLElement, type: 'png' | 'pdf', fileName: string) => {
    try {
      setIsDownloading(true);
      setError(null);




      // Créer un clone pour la capture
const clone = element.cloneNode(true) as HTMLElement;
clone.style.position = 'absolute';
clone.style.left = '-9999px';
clone.style.top = '0';
clone.style.opacity = '1';
clone.style.borderRadius = '16px'; // <-- Ajoutez cette ligne (ajustez la valeur selon vos besoins)
document.body.appendChild(clone);


      // Forcer le chargement des polices et images
      await document.fonts.ready;
      await Promise.all(
        Array.from(clone.querySelectorAll('img')).map(img => 
          img.complete ? Promise.resolve() : new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          })
        )
      );

      // Configuration optimale pour html2canvas
const canvas = await html2canvas(clone, {
  scale: 3,
  backgroundColor: '#f2fce4',
  useCORS: true,
  ignoreElements: (el) => {
    // Ignore les éléments cachés ou superflus
    return el.style.opacity === '0' || 
           el.style.display === 'none';
  },
  onclone: (document, clonedElement) => {
    // Force le recalcul des styles
    clonedElement.style.display = 'block';
    clonedElement.style.visibility = 'visible';
    
    // Applique des styles garantis pour le RFID
    const rfidElement = clonedElement.querySelector('.rfid-container');
    if (rfidElement) {
      rfidElement.style.position = 'absolute';
      rfidElement.style.left = '144px'; // 36 * 4 (car scale=3)
      rfidElement.style.bottom = '24px';
    }
  }
});

      document.body.removeChild(clone);

      // Téléchargement
      if (type === 'png') {
        const link = document.createElement('a');
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      } else {
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [54, 85.6]
        });
        pdf.addImage(canvas, 'PNG', 0, 0, 54, 85.6);
        pdf.save(`${fileName}.pdf`);
      }

    } catch (err) {
      setError('Erreur lors de la génération du badge');
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { isDownloading, handleDownload, error };
};