import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./core/interceptors/api.interceptor";
import {PrductsModule} from "./features/products/prducts.module";
import { MatToolbarModule } from '@angular/material/toolbar';
import {CoreModule} from "./core/core.module";
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { StoreModule } from '@ngrx/store';
import {reducers} from "./core/store/reducers";
import { EffectsModule } from '@ngrx/effects';
import {SearchEffects} from "./core/store/effects/search.effects";
 import {ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PrductsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        HttpClientModule,
        CoreModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbEvaIconsModule,
        StoreModule.forRoot({}, {}),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([SearchEffects]),
        ReactiveFormsModule,
      ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
