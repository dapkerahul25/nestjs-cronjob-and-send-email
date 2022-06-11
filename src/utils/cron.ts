
import { Controller } from '@nestjs/common';
import { CronJob } from 'cron';
import { AppService } from "../app.service";

@Controller()
export class Cron {
    constructor(public appService: AppService) {
        let cronJob: CronJob;
        cronJob = new CronJob('* * * * * *', async () => {
            try {
                await this.go();
            } catch (e) {
                console.error(e);
            }
        });

        // Start job
        if (!cronJob.running) {
            cronJob.start();
        }
        
    }
    go() {
        // Do some task
        this.appService.exportJSONToExcel()
    }

}