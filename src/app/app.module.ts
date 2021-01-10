import { SettingsModule } from './settings/settings.module';
import { EditArticleModule } from './editArticle/editArticle.module';
import { CreateArticleModule } from './createArticle/createArticle.module';
import { ArticleModule } from './article/article.module';
import { TagFeedModule } from './tagFeed/tagFeed.module';
import { YourFeedModule } from './yourFeed/yourFeed.module';
import { GlobalFeedModule } from './globalFeed/globalFeed.module';
import { AuthInterseptor } from './shared/services/authinterseptor.service';
import { PersistanceService } from './shared/services/persistance.service';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    StoreRouterConnectingModule.forRoot(),
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
