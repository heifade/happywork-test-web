import * as React from "react";
import { Modal, Button } from "antd";
import { BaseEditModule } from "./baseEditModule";
let styles = require("./baseEditModule.less");

export interface BaseEditComponentProps {
  title: string;
  data: BaseEditModule;
  save: (data: BaseEditModule) => Promise<any>;
  cancel: () => Promise<any>;
}

export class BaseEditComponent extends React.Component<BaseEditComponentProps, any> {
  constructor(props: BaseEditComponentProps, context: any) {
    super(props, context);
  }
  onSave = () => {
    this.props.save(this.props.data);
  };
  onCancel = () => {
    this.props.cancel();
  };

  render() {
    let { title } = this.props;
    let { isEditing, isWaiting } = this.props.data;

    return (
      <Modal
        visible={isEditing}
        title={title}
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
        <div className={styles.baseEditModule}>{this.props.children}</div>
      </Modal>
    );
  }
}
