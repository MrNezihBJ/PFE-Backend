import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { getMachineByUser, getTicketByUser, User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User as CurrentUser } from '../auth/user.decorator';
import { FindOneName, FindOneUser } from './dto/update-user.input';
import { MailerService } from '@nestjs-modules/mailer';
import { UserIdInput } from './dto/user_Id_Input';
import { ReponseUser } from './dto/response_user';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService,private mailerService: MailerService) {}

  @Mutation(() => User)
 async createUser(@Args('CreateUserInput') createUserInput: CreateUserInput) 
  {

    let create =  await this.userService.create(createUserInput)
    console.log(create,'User added');
    
    this.mailerService
    .sendMail({
      to: createUserInput.mail,
      from: 'skander.lassoued@outlook.com', //Make an outlook account
      subject: ' Data of your account',
      text: `Salut ${createUserInput.nom}`,
      html: `<h1>Hello ${createUserInput.prenom}</h1>
      Bienvenu merci de nous avoir choisie </br>
      Voici votre email: ${createUserInput.mail} </br>
      Ainsi que votre mot de passe: ${createUserInput.password}
      `,
    })
    .then((res) => {
      console.log(res, 'success mailer from banque');
    })
    .catch((err) => {
      console.log(err, 'error mailer from banque');
    });

    console.log('After mail fun');
    

    return create
  }

  @Query((returns) => User)
  async getUserByemail(@Args('mail') mail:string):Promise<User>{
return this.userService.findOne(mail)
  }
  
  @Query(() => [User])
  //@UseGuards(JwtAuthGuard) a retourner juste pour le test apollo 
  findAllUserexistant() 
  {
    return this.userService.findAllUSERexistant();
    
  }

  @Query(() => [User])
  findAllUsernonexistant()
  {
    return this.userService.findAllUSERnonexistant();
  }

  @Query (()=>[User])
  findAllUser()
  {
    return this.userService.findAllUser();
  }
@Mutation(() => ReponseUser)
  async delete_user(@Args('UserIdInput') UserIdInput:UserIdInput) 
  {
    let removeuser = await this.userService.SupprimerUser(UserIdInput._id);
      if (removeuser)
        return  {state:"User Supprimer"}
      else
        return {state:"User Non Supprimer"}
  }

  @Query(() => User)
  async findOneUser(@Args('IDUser') findOneUser: FindOneUser) 
  {
     return await this.userService.findOneuser({_id:findOneUser._id});
   }

  @Query(() => User)
  async findOneName(@Args('NomUser') findOneName: FindOneName)
  {
    return await this.userService.findOneName({nom:findOneName.nom});
  }

@UseGuards(JwtAuthGuard)                                        
@Query(() => [getMachineByUser])
async getMachineByUser(@CurrentUser() user: User)
{
  return await this.userService.getMachineByUser(user.nom)
}

@UseGuards(JwtAuthGuard)                                        
@Query(() => [getTicketByUser])
    async getTicketByUser(@CurrentUser() user:User)
    {
      return await this.userService.getTicketByUser(user.nom)
    }












/*
  @Query(() => User)
 async findOneUSER(@Args('idUSER') findOneUser: FindOneUser) {
    return await this.userService.findOneuser({_id:findOneUser._id});
  }
 
  @Query(() => User)
  async findOneName(@Args('name') FindOneUserName: FindOneUserName) {
     return await this.userService.findOneName({nom:FindOneUserName.nom});
   }
   
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(()=>Boolean)
  async SUPPRIMER(@Args('removeUser') id: number){
    let removeuser = await this.userService.SUPPRIMER(id);
    if (removeuser)
      return true
    else 
      return false
  }
  */
 
  /* 
 @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) 
  {
 return this.userService.loginUser(loginUserInput);
  }
  */


}

