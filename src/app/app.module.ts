import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { HotToastModule } from '@ngneat/hot-toast';
import { SheardModule } from 'sheard/sheard.module';

import { environment } from '../../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { MembershipModule } from './membership/membership.module';
import { ShoppingModule } from './shopping/shopping.module';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';

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
        CoreModule,
        // CUSTOM MODULES
        AdminModule,
        MembershipModule,
        SheardModule,
        ShoppingModule,
        MaterialModule,
        HotToastModule.forRoot(),

        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideMessaging(() => getMessaging()),
    ]
})
export class AppModule { }
