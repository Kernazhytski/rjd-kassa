import { Injectable } from '@nestjs/common';
import { LibreOfficeFileConverter } from 'libreoffice-file-converter';

@Injectable()
export class PdfService {
  async convertDocxToPdf(docxBuffer: Buffer): Promise<Buffer> {
    try {
      const libreOfficeFileConverter = new LibreOfficeFileConverter({
        childProcessOptions: {
          timeout: 60 * 1000,
        },
      });

      const result = await libreOfficeFileConverter.convertBuffer(
        docxBuffer,
        'pdf',
      );

      return result;
    } catch (error) {
      throw new Error('Failed to convert DOCX to PDF: ' + error.message);
    }
  }
}
