import { BoardPoint } from "./boardpoint";
import { Dice } from "./dice";
import { PlayerColor } from "./player-color.enum";

export class BackgammonGame {
    id: string;
    points: BoardPoint[];
    whitePlayerId: string;
    blackPlayerId: string;
    dice: Dice;
    playerColor: PlayerColor;
    nextPlayerColor: PlayerColor;
    status: string;
}