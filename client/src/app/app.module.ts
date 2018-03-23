import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { PdfmakeModule } from 'ng-pdf-make';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { RouteService } from './services/route.service';
import { BusService } from './services/bus.service';
import { TurnService } from './services/turn.service';
import { ShareService } from './services/share.service';
import { BookService } from './services/book.service';
import { AuthGuard } from './guards/auth.guard';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { AddRouteComponent } from './components/add-route/add-route.component';
import { ViewRoutesComponent } from './components/view-routes/view-routes.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { ViewBusComponent } from './components/view-bus/view-bus.component';
import { AddTurnComponent } from './components/add-turn/add-turn.component';
import { ViewTurnsComponent } from './components/view-turns/view-turns.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { PaymentComponent } from './components/payment/payment.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'viewuser', component: ViewUsersComponent, canActivate: [AuthGuard]},
  {path:'addroute', component: AddRouteComponent, canActivate: [AuthGuard]},
  {path:'viewroute', component: ViewRoutesComponent, canActivate: [AuthGuard]},
  {path:'edituser', component: EditUserComponent, canActivate: [AuthGuard]},
  {path:'addbus', component: AddBusComponent, canActivate: [AuthGuard]},
  {path:'viewbus', component: ViewBusComponent, canActivate: [AuthGuard]},
  {path:'addturn', component: AddTurnComponent, canActivate: [AuthGuard]},
  {path:'viewturn', component: ViewTurnsComponent, canActivate: [AuthGuard]},
  {path:'searchresult', component: SearchResultsComponent},
  {path:'bookdetail', component: BookDetailsComponent},
  {path:'payment', component: PaymentComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ViewUsersComponent,
    AddRouteComponent,
    ViewRoutesComponent,
    EditUserComponent,
    AddBusComponent,
    ViewBusComponent,
    AddTurnComponent,
    ViewTurnsComponent,
    SearchResultsComponent,
    BookDetailsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    PdfmakeModule,
    Ng2AutoCompleteModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, RouteService, BusService, TurnService, ShareService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
