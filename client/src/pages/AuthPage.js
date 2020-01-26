import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/httpHook";
import {useAlert} from "../hooks/alert.hook";
import {AuthContext} from "../context/auth.context";

export const AuthPage = () => {

  const authCtx = useContext(AuthContext);

  const alert = useAlert();

  const {loading, error, request, clearError} = useHttp();

  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    alert(error);
    clearError();
  }, [error, alert, clearError]);

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      alert(data.message);

    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      alert(data.message);

      authCtx.login(data.token, data.userId);

    } catch (e) {}
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Store short link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Input email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">
                  Email
                </label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Input password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">
                  Password
                </label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 mr-15"
              onClick={loginHandler}
              disabled={loading}
            >
              Sing in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sing up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};