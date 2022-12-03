import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RapportModule } from './rapport/rapport.module';
import { TicketModule } from './ticket/ticket.module';
import { SocieteModule } from './societe/societe.module';
import { AuthModule } from './auth/auth.module';
import { MachineModule } from './machine/machine.module';
import {MailerModule} from '@nestjs-modules/mailer'
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        // host: 'smtp-mail.office365.com',
        service: 'outlook',
        port: 587,
        // ignoreTLS: false,
        secure: false,
        auth: {
          user: 'skander.lassoued@outlook.com',
          pass: 'SKA.Mary@@ 19007',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
     
    }),

    MongooseModule.forRoot(
      'mongodb+srv://nazihbenjemiaa:dbKrVNEgFPot7unW@cluster0.49ps0gw.mongodb.net/?retryWrites=true&w=majority',
    ),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

    UserModule,
    RapportModule,
    TicketModule,
    SocieteModule,
    AuthModule,
    MachineModule,
    MulterModule.register({dest:"./uploads"})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
 * GraphQLModule.forRoot<ApolloDriverConfig>
    ({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
    }),

  ********************************************************
    import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';

  GraphQLModule.forRoot
    ({
      autoSchemaFile: join(process.cwd(),'src/schema.gpl'),
      sortSchema: true,    
    }),

 */
