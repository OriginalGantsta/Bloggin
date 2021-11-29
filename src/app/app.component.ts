import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bloggin';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore, private authService: AuthService) {
    this.items = firestore.collection('items').valueChanges();
  }
}
