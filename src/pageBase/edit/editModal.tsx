import * as React from "react";
import { Modal, Button } from "antd";
let styles = require("./edit.less");

export interface Props {
  title: string;
  isWaiting: boolean;
  isShow: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
}

export class EditModalComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  render() {
    let { title, onClose, onSave, children, isWaiting, isShow } = this.props;

    return (
      <Modal
        visible={isShow}
        title={title}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            关闭
          </Button>,
          <Button key="save" onClick={onSave} loading={isWaiting}>
            保存
          </Button>
        ]}
      >
        <div className={styles.edit}>{children}</div>
      </Modal>
    );
  }
}
