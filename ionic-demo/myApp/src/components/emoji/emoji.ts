import { Component,forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from "../../providers/emoji/emoji"

export const EMOJI_ACCESSOR: any ={
  provide:NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojiComponent),
  multi: true
}

@Component({
  selector: 'emoji',
  templateUrl: 'emoji.html',
  providers:[EMOJI_ACCESSOR]
})
export class EmojiComponent implements ControlValueAccessor{
  
  emojiArray = [];
  content:string;
  onChanged:Function;
  onTouched:Function;

  constructor(public emojiProvider:EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
 
  setValue(val:any):any{
    this.content += val;
    if(this.content){
      this.onChanged(this.content);
    }
  }

 

}
