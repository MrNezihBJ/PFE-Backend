import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 
  var x=3500;
  await app.listen(x,()=> console.log (`${x} Le port fonctionne`));
}

bootstrap();
