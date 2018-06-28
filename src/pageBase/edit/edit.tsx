let styles = require("./edit.less");

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

export function onFieldsChange(props: any, changedFields: any) {
  let obj: any = {};
  Reflect.ownKeys(changedFields).map(key => (obj[key] = changedFields[key].value));

  props.onChange({
    ...props.pageModule.item,
    ...obj
  });
}
