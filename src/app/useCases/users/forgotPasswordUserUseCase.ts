import {
    HttpResponse,
    UseCase,
    badRequestResponse,
    errorResponse,
    successResponse,
} from "../../../shared";
import { injectable, inject } from "tsyringe";
import UsersEntity from "../../entities/users.entity";
import IUserRepository from "@/app/repositories/users.repository";
import { ErrosMessages, SendMail } from "@/helpers";

@injectable()
export default class ForgotPasswordUserUseCase implements UseCase {
    constructor(
        @inject("IUserRepositoryPrismaImpl")
        private repository: IUserRepository
    ) { }

    async execute(request: UsersEntity): Promise<HttpResponse<any>> {
        try {
            const findUser = await this.repository.findByField(
                "email",
                request.email
            );
            if (!findUser) {
                return badRequestResponse({ message: ErrosMessages.UserNotExists });
            }

            const now = new Date();
            now.setHours(now.getHours() + 1);
            const token = Math.random().toString(36).slice(-8);;
            request.verificationByEmailToken = token;
            request.verificationByEmailExpires = now;

            const user = await this.repository.update(findUser.id, request);

            await this.notifyUserByEmail({
                token: user.verificationByEmailToken,
                userName: user.name,
                userEmail: user.email,
            });

            return successResponse(user);
        } catch (error) {
            return errorResponse(error);
        }
    }

    private async notifyUserByEmail({
        token,
        userName,
        userEmail,
    }: {
        token: string;
        userName: string;
        userEmail: string;
    }) {
        const title = "Pedido de recuperacção de conta";
        const titleUperCase = title.toUpperCase();
        return new SendMail().execute({
            to: userEmail ?? "",
            html: `
        <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de conta</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">
            <img src="https://i.ibb.co/6rw0nGZ/PNw.jpg" alt="Logo da Empresa" style="max-width: 150px;">
            <h1 style="margin: 0; color: #333333;">Olá #${userName}</h1>
        </div>
        <div style="margin-bottom: 20px;">
            <h2 style="color: #333333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Pedido de recuperacção de conta</h2>
            <p style="margin: 5px 0; color: #666666;"><strong>Olá Sr(a). ${userName}, estamos entrando em contacto para confirmar o seu email.</p>
            <p style="margin: 5px 0; color: #666666;">Insira o seguinte código no nosso site <strong style="color: #38BDF8;">${token}</strong>, não partilhar com terceiros. Essa é uma medida importante para garantir a segurança da sua conta e garantir que você tenha acesso total a todas as funcionalidades que oferecemos.</p>
            <p style="margin: 5px 0; color: #666666;"><strong>${userName}, o código expira em uma hora.</p>
        </div>
        <div style="text-align: center; color: #999999; font-size: 12px;">
            <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} Qeys Imobiliaria. Todos os direitos reservados.</p>
            <p style="margin: 5px 0;">Se você tem alguma dúvida, entre em contato conosco.</p>
        </div>
    </div>
</body>
</html>

      `,
            subject: `${titleUperCase}!`,
        });
    }
}
