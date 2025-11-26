import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user-component/user.component';
import { MasterDataModule } from 'src/app/core/shared/dialog-modal/master-data/master.data.module';
import { PaginationModule } from 'src/app/core/shared/components/pagination/pagination.module';
import { CoreModule } from 'src/app/core/core.module';
import { UserRoutingModule } from './user-routing.module copy';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MasterDataModule,
    CoreModule,
    PaginationModule,
  ],
})
export class UserModule {}
