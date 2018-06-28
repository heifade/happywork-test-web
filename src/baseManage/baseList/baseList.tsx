import * as React from "react";
import { ListItemModule, PageModule } from "./baseListModule";
import { Spin, Table, Divider } from "antd";
let styles = require("./baseList.less");

export interface Props {
  pageModule: PageModule;
  delete: (item: ListItemModule) => Promise<any>;
  edit: (item: ListItemModule) => Promise<any>;
  fetch: () => Promise<any>;
}

export class BaseListComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  edit = (item: ListItemModule) => {
    this.props.edit(item);
  };
  delete = (item: ListItemModule) => {
    this.props.delete(item);
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const dataSource = (this.props.pageModule.dataList || []).map((data, index) => ({ ...data, key: index }));
    const columns = [
      {
        title: "编号",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        render: (text: any, record: any) => (
          <span>
            <a href="javascript:;" onClick={() => this.edit(record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.delete(record)}>
              删除
            </a>
          </span>
        )
      }
    ];

    return (
      <div className={styles.baseList}>
        <Spin spinning={this.props.pageModule.isWaiting}>
          <Table dataSource={dataSource} columns={columns} />
        </Spin>
      </div>
    );
  }
}
