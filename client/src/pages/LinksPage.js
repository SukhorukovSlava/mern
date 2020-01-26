import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/auth.context";
import {useHttp} from "../hooks/httpHook";
import {Loader} from "../components/Loader";
import {LinkList} from "../components/LinkList";

export const LinksPage = () => {

  const [links, setLinks] = useState();
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const resLinks = await request('/api/link/', 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setLinks(resLinks);

    } catch (e) {}
  }, [request, token]);


  useEffect(() => {
    fetchLinks()
  }, [fetchLinks]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && links && <LinkList links={links} />}
    </>
  );
};