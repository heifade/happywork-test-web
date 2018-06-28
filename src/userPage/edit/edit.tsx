import * as React from "react";
import { EditItemModule, PageModule } from "./editModule";
import { Modal, Button, Form, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { EditModalComponent } from "../../pageBase/edit/editModal";
import { formItemLayout } from "../../pageBase/edit/edit";
let styles = require("./edit.less");

export interface Props {
  pageModule: PageModule;
  onSave: (item: EditItemModule) => Promise<any>;
  onClose: () => Promise<any>;
  form: WrappedFormUtils;
}

class UserEditComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }
  onClose = () => {
    this.props.onClose();
  };

  onSave = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      this.props.onSave({
        id: fieldsValue["id"],
        name: fieldsValue["name"]
      });
    });
  };

  render() {
    let { isShow, item, isWaiting } = this.props.pageModule;
    item = item || { id: "", name: "" };

    const { getFieldDecorator } = this.props.form;

    return (
      <EditModalComponent isShow={isShow} isWaiting={isWaiting} title={"用户信息编辑"} onClose={this.onClose} onSave={this.onSave}>
        <Form>
          <Form.Item {...formItemLayout} label="编号">
            {getFieldDecorator("id", {
              rules: [{ type: "string", required: true, message: "请输入编号" }]
            })(<Input placeholder="请输入编号" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="姓名">
            {getFieldDecorator("name", {
              rules: [{ type: "string", required: true, message: "请输入姓名" }]
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
        </Form>
      </EditModalComponent>
    );
  }
}

export default Form.create({
  onFieldsChange(props: any, changedFields: any) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    let data = props.pageModule.item || {};

    
    console.log(1, props.pageModule.item);

    
    let name = props.pageModule.item && props.pageModule.item.name ? props.pageModule.item.name : {};
    let value = name.value;

    console.log(name, value);


    return {
      name: Form.createFormField({
        ...name,
        value: value
      })
    }
  }
})(UserEditComponent);
