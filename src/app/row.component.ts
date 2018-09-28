import { Component, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import { RULES } from './rules';
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

export interface IContext {
  data:string;
}

@Component({
  templateUrl: './row.component.html',
  selector: '[row-component]'
})

export class RowComponent {
  rules: any[] = RULES;

  new_rule: any = this.rules[0];
  @Input() field: any;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<IContext, string, string>;

  @ViewChild('modalTemplate2')
  public modalTemplate2: ModalTemplate<IContext, string, string>;

  constructor(
    public modalService: SuiModalService
  ) {}


  select_rule(rule, i) {
    const rule_selected = this.rules.find(r => r.name === rule);
    this.field.rules[i] = this.create_rule(rule_selected);
  }

  add_rule() {
    this.field.rules.unshift({name: ''});
  }

  create_rule(rule) {
    return {
      name: rule.name,
      arguments: rule.arguments.reduce((obj, v) => {
        obj[v] = '';
        return obj;
      }, {})
    };
  }

  delete_field(dynamicContent) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(result => {
          this.remove.emit();
         })
  }

  delete_rule(dynamicContent, i) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate2);

    config.context = { data: dynamicContent };

    this.modalService
        .open(config)
        .onApprove(result => {
          this.field.rules.splice(i, 1);
         });
  }
}
