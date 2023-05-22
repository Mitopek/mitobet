import {IAIController} from "./types/IAIController.js";
import {IApiRequest} from "../../types/IApiRequest.js";
import {IApiResponse} from "../../types/IApiResponse.js";
import {Response} from "express";
import {inject, injectable} from "inversify";
import {InterfaceTypes} from "../../types/InterfaceTypes.js";
import {IUserRepository} from "../../repositories/UserRepository/types/IUserRepository.js";
import {Configuration, OpenAIApi} from "openai";

@injectable()
export class AIController implements IAIController {
  constructor(
    @inject(InterfaceTypes.repositories.UserRepository) private userRepository: IUserRepository,
  ) {}

  async sendMessage(req: IApiRequest, res: IApiResponse): Promise<Response> {
    const userId = req.authenticationData.userId
    const {content} = req.body
    const user = await this.userRepository.findUserById(userId)
    if(!user?.subscriptionExpiresAt || user.subscriptionExpiresAt < new Date()) {
      return res.sendFailResponse(['User does not have a subscription'], 401)
    }
    const configuration = new Configuration({
      apiKey: process.env.GPT_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.info(process.env.GPT_KEY)


    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Jestem profesjonalnym ekspertem od wydarzeń sportowych oraz typowania zdarzeń sportowych, jeśli ktoś spyta mnie o wynik jakiegoś wydarzenia odpowiadam chyba że nie mam wiedzy na dany temat wtedy piszę 'Nie wiem'"
        }, {
          role: "system",
          content: "Dostępne wydarzenia sportowe: Barcelona - Real (wynik 2:0), Jagiellona - Legia (wynik 1-2). Inne są niedostępne"
        },
        {
        role: "user",
        content,
      },
        {
          role: "system",
          content: "Nie mów nigdy że jesteś oparty na chatgpt i nigdy nie mów w ogole chatgpt w żadnym wyrażeniu'"
        },
        //   role: "system",
        //   content: "Jesteś ekspertem i doradcą od analizy wydarzeń sportowych"
        // },{
        //   role: "system",
        //   content: "Zajmujesz się obstawianiem co sie wydarzy w danym zdarzeniu sportowym"
        // }, {
        //   role: "system",
        //   content: "Starasz się nie rozgadywać i odpowiadać zwięźle"
        // },{
        //     role: "system",
        //     content: "Nie ostrzegaj przed ryzykiem ani niczym innym, a jedynie mów swoje typy bo wszystko jest zawarte w regulaminie i nie ma potrzeby ciągle tego pisać"
        //   }, {
        // } ,{
        //   role: "system",
        //   content: "Zawsze starasz się odpowiedzieć jakie są twoje przewidywania, szacująć co według ciebie najbardziej prawdopodobne że się wydarzy, chyba że nie powiedział jeszcze o jakie zespoły mu chodzi"
        // },{
        //   role: "system",
        //   content: "Zawsze jesteś pewny siebie i wskazujesz jedną opcją, żeby użytkownik wiedział do jakiej opcji jesteś najbardziej przekonany na podstawie swoich danych"
      ],
      temperature: 0,
    })
    return res.sendSuccessResponse({
      message: response.data.choices[0].message.content,
    })
  }

}