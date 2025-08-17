import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createUser(userData: CreateUserDto) {
    const user = await this.firebaseService.getAuth().getUser(userData.uid)
    if (user) {
      throw new ConflictException(`User with UID ${userData.uid} already exists.`);
    }
    return this.firebaseService.getFirestore().collection('users').doc(userData.uid).set({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async getUser(uid: string) {
    const userDoc = await this.firebaseService.getFirestore().collection('users').doc(uid).get();
    if (!userDoc.exists) {
      throw new ConflictException(`User with UID ${uid} does not exist.`);
    }
    return userDoc.data();
  }
}
