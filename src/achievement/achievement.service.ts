import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AchievementService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getAllAchievements() {
    // TODO: Implement the logic to retrieve all achievements
  }
}
