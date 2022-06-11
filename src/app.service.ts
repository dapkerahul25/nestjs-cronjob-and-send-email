import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { MessageClient } from "cloudmailin"

const EXCEL_EXTENSION = '.xlsx';
var raw = [{
  "eid": "e101",
  "ename": "ravi",
  "esal": 1000
},
{
  "eid": "e102",
  "ename": "ram",
  "esal": 2000
},
{
  "eid": "e103",
  "ename": "rajesh",
  "esal": 3000
}]

@Injectable()
export class AppService {
  client = new MessageClient({
    username: process.env.CLOUDMAILIN_USERNAME,
    apiKey: process.env.CLOUDMAILIN_API_KEY
  });
  getHello(): string {
    return 'Hello World!';
  }

  exportJSONToExcel() {
    this.exportAsExcelFile(raw, `file-${Date.now()}${EXCEL_EXTENSION}`);
  }


  exportAsExcelFile(json: any[], excelFileName: string): void {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workBook: XLSX.WorkBook = { Sheets: { 'data': workSheet }, SheetNames: ['data'] };
    XLSX.utils.book_append_sheet(workBook, workSheet, "Product Catalog");

    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })

    // Binary String
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })

    XLSX.writeFile(workBook, excelFileName)

    this.sendEmail({workBook})
  }

  async sendEmail(emailBody:any) {
    //todo from emailBody or you can find excel file under src dir
    console.log('excel file ====',emailBody.workBook);
    
    const response = await this.client.sendMessage({
      from: 'testfrom@mailinator.com', // from: '"Sender Name" <from@example.net>',
      to: "testto@mailinator.com", //  to: "to@example.com",
      subject: "Hello from node",
      plain: "Hello world?",
      html: "<strong>Hello world?</strong>",
      headers: { 'x-myheader': 'test header' },
      attachments: [
        {
          "file_name": "pixel.png",
          "content": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0rdr1HwAFHwKCk87e6gAAAABJRU5ErkJggg==",
          "content_type": "image/png"
        }
      ]
    });
    console.log('response===============', response);

  }
}
