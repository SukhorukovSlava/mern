import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/auth.context";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {

  const history = useHistory();

  const [link, setLink] = useState('');

  const {request} = useHttp();

  const authCtx = useContext(AuthContext);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const response = await request(
          '/api/link/create',
          'POST',
          {from: link},
          {Authorization: `Bearer ${authCtx.token}`}
        );

        history.push(`/detail/${response.link._id}`);

      } catch (e) {}
    }
  };

  const changeHandler = event => setLink(event.target.value);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2 pt-20" style={{padding: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Input link"
            id="link"
            type="text"
            value={link}
            onChange={changeHandler}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">
            Input link
          </label>
        </div>
      </div>
    </div>
  );
};