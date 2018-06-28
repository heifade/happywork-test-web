import * as React from "react";
import { DataEditManageModule, DataModule } from "./baseEditModule";
import { Modal, Button, Form, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
let styles = require("./baseEdit.less");

export interface Props {
  dataEditManage: DataEditManageModule;
  save: (data: DataModule) => Promise<any>;
  cancel: () => Promise<any>;
  form: WrappedFormUtils;
}

class BaseEditComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }
  onCancel = () => {
    this.props.cancel();
  };

  onSave = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      this.props.save({
        id: fieldsValue["id"],
        name: fieldsValue["name"]
      });
    });
  };

  render() {
    let { isEditing, data, isWaiting } = this.props.dataEditManage;
    data = data || { id: "", name: "" };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={isEditing}
        title={"用户信息编辑"}
        onCancel={this.onCancel}
        footer={[
          <Button key="close" onClick={this.onCancel}>
            关闭
          </Button>,
          <Button key="save" onClick={this.onSave} loading={isWaiting}>
            保存
          </Button>
        ]}
      >
        <div className={styles.baseEdit}>
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
        </div>
      </Modal>
    );
  }
}

export default Form.create({
  onFieldsChange(props: any, changedFields: any) {
    let obj: any = {};
    Reflect.ownKeys(changedFields).map(key => (obj[key] = changedFields[key].value));

    props.onChange({
      ...props.dataEditManage.data,
      ...obj
    });
  },
  mapPropsToFields(props) {
    let data = props.dataEditManage.data || {};
    return {
      id: Form.createFormField({
        value: data.id
      }),
      name: Form.createFormField({
        value: data.name
      })
    };
  }
})(BaseEditComponent);
