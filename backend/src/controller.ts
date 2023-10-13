import { Prisma, PrismaClient } from "@prisma/client";
import { getCommand, getCommandFullDescription, getCommandListText } from "./bot-commands";

const prisma = new PrismaClient();

const timeRangefromTime = (day: Date) => {
    const [yyyy, mm, dd] = [day.getFullYear(), day.getMonth(), day.getDate()];
    const start = new Date(yyyy, mm, dd);
    const end = new Date(yyyy, mm, dd + 1);
    return { start, end };
}

const decimalToNumber = (num: Prisma.Decimal) => {
    return num as unknown as number;
}

export const controller = {
    async help(tegramId: string, name: string, sendMessage: (text: string) => Promise<void>) {
        await this.registerUser(tegramId, name);
        return sendMessage(getCommandListText());
    },

    async start(tegramId: string, name: string, sendMessage: (text: string) => Promise<void>) {
        await this.registerUser(tegramId, name);
        return sendMessage(`Bem vindo ao bot de pesagem\n${getCommandListText()}`);
    },

    async listWeighing(tegramId: string, name: string, sendMessage: (text: string) => Promise<void>) {
        const user = await this.registerUser(tegramId, name);
        const weighings = await prisma.weighing.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                baseDate: 'desc'
            }
        });

        const msg = weighings
            .map(x => `[${x.baseDate.toLocaleDateString()}] ${x.weight.toFixed(2)}`)
            .join('\r\n');

        sendMessage(msg);
    },

    async lastWeight(currentId: string, userId: string, baseDate: Date) {
        return await prisma.weighing.findFirst({
            where: {
                NOT: {
                    id: currentId
                },
                userId,
                baseDate: {
                    lt: baseDate
                }
            },
            orderBy: {
                baseDate: 'desc'
            }
        });
    },
    async saveWeight(
        tegramId: string,
        name: string,
        baseDate: Date,
        weight: number,
        sendMessage: (text: string) => Promise<void>) {
        const command = getCommand('/peso');
        const user = await this.registerUser(tegramId, name);
        if (isNaN(weight) || weight <= 0)
            return sendMessage(getCommandFullDescription(command));

        const { start, end } = timeRangefromTime(baseDate);
        let currentWeight = await prisma.weighing.findFirst({
            where: {
                userId: user.id,
                baseDate: {
                    gte: start,
                    lt: end
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        currentWeight = currentWeight ?
            await prisma.weighing.update({
                where: {
                    id: currentWeight.id
                },
                data: {
                    weight,
                    createdAt: new Date()
                }
            })
            :
            await prisma.weighing.create({
                data: {
                    userId: user.id,
                    weight,
                    baseDate,
                    createdAt: new Date(0)
                }
            });

        const msgs = [`Peso de ${currentWeight.weight.toFixed(2)} kg salvo para o dia ${currentWeight.baseDate.toLocaleDateString()}`];
        const previousWeight = await this.lastWeight(currentWeight.id, user.id, baseDate);
        if (previousWeight) {
            const diff = decimalToNumber(currentWeight.weight) - decimalToNumber(previousWeight.weight);
            const diffStr = Math.abs(diff).toFixed(2);
            if (diff > 0) {
                msgs.push(`Infelizmente você ganhou ${diffStr} kg desde a última pesagem dia ${previousWeight.baseDate.toLocaleDateString()}`);
            }
            else if (diff < 0) {
                msgs.push(`Parabéns você perdeu ${diffStr} kg desde sua última pesagem dia ${previousWeight.baseDate.toLocaleDateString()}`);
            }
            else {
                msgs.push(`Você manteve o seu peso desde a última pesagem dia ${previousWeight.baseDate.toLocaleDateString()}`);
            }
        }

        sendMessage(msgs.join('\n'));

    },
    async registerUser(tegramId: string, name: string) {
        const user = await prisma.user.findFirst({
            where: {
                tegramId
            }
        });

        if (user)
            return user;

        return prisma.user.create({
            data: {
                tegramId,
                name,
                registeredAt: new Date()
            }
        });
    }
}