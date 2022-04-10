import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const Demo = () => {
  const onFinish = (values) => {
    console.log("Success:", values);

    axios
      .post(
        `https://backendexample.sanbersy.com/api/change-password`,
        {
          current_password: values.password,
          new_password: values.newpassword1,
          new_confirm_password: values.newpassword2,
        },
        { headers: { Authorization: "Bearer" + Cookies.get("token") } }
      )
      .then((res) => {
        console.log(res);
      });
    //   .then(() => {
    //     let movie = dataMovie.find((el) => el.id === currentId);
    //     movie = inputMovie;
    //     history.push("/dashboard/movie/table");
    //     // message.success("Berhasil menambahkan data");
    //     setFetchStatus(true);
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Current Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newpassword1"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Password"
          name="newpassword2"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
const ChangePassword = () => {
  return (
    <>
      <div className="change-pass">
        <h1>Change Password</h1>
        <div className="form-pass">
          <Demo />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
