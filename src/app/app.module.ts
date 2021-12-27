import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SweepComponent } from './sweep/sweep.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ListComponent } from './list/list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'submit', component: BlogFormComponent },
  { path: 'blogs/:bID', component: BlogPostComponent },
  { path: 'blogs/:bID/:title', component: BlogPostComponent },
  {
    path: 'blogs/:bID/:title',
    component: BlogPostComponent,
    children: [{ path: '**', component: BlogPostComponent }],
  },
  { path: 'list', component: ListComponent },
];

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
    SweepComponent,
    HomeComponent,
    TestComponent,
    CarouselComponent,
    GalleryComponent,
    ListComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
