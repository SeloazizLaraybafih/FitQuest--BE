import { Controller, Get, Param } from '@nestjs/common';
import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  getAllAchievements() {
    // TODO: Implement the logic to retrieve all achievements
  }

  @Get(':id')
  getAchievementById(@Param('id') id: string) {
    // TODO: Implement the logic to retrieve an achievement by ID
  }
}