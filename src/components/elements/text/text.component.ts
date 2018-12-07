import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var kendo: any;

@Component({
  selector: 'app-element-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextElementComponent implements OnInit {


  @ViewChild('editor') editorEl: ElementRef;
  constructor(
  ) { }

  ngOnInit() {
    kendo.jQuery(this.editorEl.nativeElement).kendoEditor({
     
      tools: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'insertUnorderedList',
        'insertOrderedList',
        'indent',
        'outdent',
        'createLink',
        'unlink',
        'insertImage',
        'insertFile'
      ]

    });
  }

}