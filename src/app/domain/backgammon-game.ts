import { BoardPoint } from "./boardpoint";

export class BackgammonGame {
    id: string;
    points: BoardPoint[];
    whitePlayerId: string;
    blackPlayerId: string;
    status: string;
}