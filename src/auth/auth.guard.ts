import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided.');
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = this.firebaseService.getAuth().verifyIdToken(idToken);
      request.user = decodedToken;
      return true;
    } catch (error) {
      console.error('Error verifying auth token:', error);
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
