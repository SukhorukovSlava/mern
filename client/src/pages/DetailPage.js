import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {

  const [link, setLink] = useState(null);

  const {request, loading} = useHttp();

  const {token} = useContext(AuthContext);

  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetchedLink = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setLink(fetchedLink);
    } catch (e) {}
  }, [token, linkId, request, setLink]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && link && <LinkCard link={link}/>}
    </>
  );
};