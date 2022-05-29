import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ToolbarComponent
    ]
})
export class ComponentsModule {}