import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { HotToastModule } from '@ngneat/hot-toast';
import { SheardModule } from 'sheard/sheard.module';

import { environment } from '../../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { MembershipModule } from './membership/membership.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        AdminAuthGuard,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        HotToastModule.forRoot(),
        // MATERIAL MODULE
        MaterialModule,
        MatMenuModule,
        MatIconModule,
        // CUSTOM MODULES
        CoreModule,
        MembershipModule,
        AdminModule,
        SheardModule,
        ShoppingModule
    ]
})
export class AppModule { }
