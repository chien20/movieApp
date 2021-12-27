import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import { Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom";
import { api } from '../../services/api';
import { helpers } from '../../helpers/common';
import "./login.scss";


const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Success:', values);
    // if(values.username === 'admin' && values.password === '123') {
    //   history.push("/");
    // }
    let user = values.username;
    let pass = values.password;
    let token = api.checkUserLogin(user, pass);
    if(token !== null){
      setErrorLogin("");
      // luu token nay lai
      helpers.saveToken(token);
      history.push('/');
    } else {
      setErrorLogin("Login failed, press the 'Click here !' to get the account");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      username: 'admin',
      password: '123',
    });
  };

  return(
    <>
      <div className="login">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <img src={process.env.PUBLIC_URL + "/img/login-img.jpg"} alt="" className="login-image"/>
        <div className="login-container">
          <h1 class="signup-heading">Login !</h1>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="login-form"
          >
            <Form.Item
              className="form-item"
              label="Username"
              name="username"
            >
              <Input placeholder="Ex: Vu Tien Chien"/>
            </Form.Item>

            <Form.Item
              className="form-item password"
              label="Password"
              name="password"
            >
              <Input.Password  placeholder="########"/>
            </Form.Item>
            {
              errorLogin && <span className="login-err">{errorLogin}</span>
            }
            <Form.Item>
              <p className="term-link">
              If you don't have an account ? <span onClick={onFill}>Click here !</span>
              </p>
            </Form.Item>
            <Form.Item>
              <div className="login-button">
                <Button className="reset" htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button className="submit" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default LoginPage;