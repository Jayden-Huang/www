import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiComponent } from './emoji/emoji';
import { QuestionCompnentComponent } from './question-compnent/question-compnent';
@NgModule({
	declarations: [EmojiComponent,
    QuestionCompnentComponent],
	imports: [IonicPageModule .forChild(EmojiComponent)],
	exports: [EmojiComponent,
    QuestionCompnentComponent]
})
export class ComponentsModule {}
