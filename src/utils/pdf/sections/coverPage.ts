
import jsPDF from 'jspdf';
import { PropertyData } from '@/types/property';
import { BROCHURE_STYLES } from '../constants/styles';

export const generateCoverPage = async (
  pdf: jsPDF,
  property: PropertyData,
  currentPage: number
): Promise<void> => {
  if (property.featuredImage) {
    try {
      const img = new Image();
      img.src = property.featuredImage;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const { width, height } = BROCHURE_STYLES.pageSize;
      const coverHeight = height * 0.7;
      pdf.addImage(img, 'JPEG', 0, 0, width, coverHeight);

      // Gradient overlay
      pdf.setFillColor(0, 0, 0);
      const gState = pdf.setGState({ opacity: 0.5 });
      pdf.rect(0, coverHeight - 100, width, 100, 'F');
      pdf.setGState(gState);

      // Property title and price
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(32);
      pdf.setFont(BROCHURE_STYLES.fonts.heading, 'bold');
      pdf.text(property.title, 20, coverHeight - 50);

      if (property.price) {
        pdf.setFontSize(24);
        pdf.text(property.price, 20, coverHeight - 20);
      }
    } catch (error) {
      console.error('Error loading featured image:', error);
    }
  }
};
