import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MustMatchDirective } from './helpers/must-match.directive';
import { PlaceholderDirective } from './helpers/placeholder.directive';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    MustMatchDirective,
    PlaceholderDirective,
    BlogFormComponent,
    BlogPostComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
