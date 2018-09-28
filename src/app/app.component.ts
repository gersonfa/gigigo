import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  fields: any[] = []
  constructor() {}

  add_field() {
    this.fields.unshift({name: '', required: false, rules: []});
  }

  save() {
    console.log(this.fields);
  }

  remove(index) {
    this.fields.splice(index, 1);
  }
}
