import { HttpException, Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { LogicException } from '../../exceptions/logic-exception';
import { LogicExceptionList } from '../../exceptions/types/logic-exceptions.enum';

@Injectable()
export class DocsService {
  constructor() {}

  generateDocx(data: object, fileBuffer: Buffer): Buffer {
    const parsedData = this.processJson(data);
    try {
      const zip = new PizZip(fileBuffer);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render(parsedData);

      // Get the zip document and generate it as a nodebuffer
      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      return buf;
    } catch (e) {
      throw new LogicException(LogicExceptionList.SheduleIsWrong);
    }
  }

  private processJson(data: object): object {
    return this.replaceNulls(this.processJsonVisible(data));
  }

  // Рекурсивный метод для замены значений null на пустые строки
  private replaceNulls(data: any): any {
    if (data === null) {
      return '';
    } else if (Array.isArray(data)) {
      return data.map((item) => this.replaceNulls(item));
    } else if (typeof data === 'object') {
      const updatedData = {};
      for (const key of Object.keys(data)) {
        updatedData[key] = this.replaceNulls(data[key]);
      }
      return updatedData;
    } else {
      return data;
    }
  }

  // Рекурсивный метод для обработки JSON данных
  private processJsonVisible(data: any): any {
    // Проверка, является ли текущий элемент объектом
    if (typeof data === 'object' && data !== null) {
      for (const key of Object.keys(data)) {
        // Проверка, начинается ли ключ с "vi"
        if (key.startsWith('vi') && key !== 'visible') {
          // Проверка на наличие поля "visible" и добавление/изменение поля "invisible"
          if (
            data[key].visible !== undefined &&
            typeof data[key].visible === 'boolean'
          ) {
            data[key].invisible = !data[key].visible;
          } else {
            throw new HttpException('Missing "visible" field', 400);
          }
        }
        // Рекурсивный вызов для вложенных объектов
        this.processJson(data[key]);
      }
    }

    return data;
  }
}
