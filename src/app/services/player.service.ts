import { Injectable } from '@angular/core';
import { Player } from '../domain/player';
import { UuidService } from './uuid.service';

@Injectable()
export class PlayerService {

  playerIdKey: string = 'ardashir-playerId';

  constructor(private uuidService: UuidService) { }

  getLocalPlayer(): Player {
    var playerId = window.localStorage.getItem(this.playerIdKey);

    if(!playerId) {
      playerId = this.uuidService.guid();
      window.localStorage.setItem(this.playerIdKey, playerId);
    }

    return {id: playerId}
  }
}
