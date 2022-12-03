import { 
  Controller, 
  Get, 
  Post, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', 
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => 
        {
          const uniqueSuffix = 
          file.originalname + '-' + "MSTechSoft"+ "-"+ Math.round(Math.random() * 1e4);

          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) 
  {
    console.log('file', file);
    console.log("Nom Original==>",file.originalname);
  return 'File upload API';
  }

}
