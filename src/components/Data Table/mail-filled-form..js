import React , { useEffect, useState, useCallback} from 'react';
import { Container
    , Card, CardHeader,Paper, CardContent
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Header from '../Header';
import { NewEntryFinal } from './skeleton-Entry';
import {useLocation,useNavigate} from "react-router-dom";
import { useParams } from 'react-router';
import axiosInstance from '../../axois';
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api/deleteField/";

export function UpdateFormEntry({onChange}){
    // const { list,id } = useParams();
    const location = useLocation();
    const token=new URLSearchParams(location.search).get('token').split('_')
      const uidb64= new URLSearchParams(location.search).get('uidb64').split('_')
      const [appState, setAppState] = useState({
          loading: true,
          cols: null,
          data:null,
          id : uidb64[1],
          listHistory : null
      });

      const PostLoadingComponent = ({ isLoading, ...props })=> {
          
          if (!appState.loading) 
          {
            console.log(uidb64[1]);
            console.log(props.data);
            // <Header listname={props.listHistory} select = 'list' isList={true} />
          return ( <>   <NewEntryFinal data={props.cols} list1={token[1]} fieldData={props.data} onChange={onChange} record_id={uidb64[1]} fetch={props.fetch} /></>)
          ;}
          return (
              <Container maxWidth="lg">
              
               <Card elevation={0}>
                 <CardHeader
                 title={
                     "Groups Loading"
                 }
                 />
                 <Paper style={{height: 470, overflow: 'auto', border:1}}>
                 <CardContent>
                     </CardContent>
                     <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
              
                     </Paper>
                     </Card>
              
                     </Container>
              
              
          );
      };
  
      const fetchData = useCallback(async () => {
        console.log(token[1])
        axios
        .get(baseURL.concat(token[1]+'/'))
        .then((res)=>{
          const allCols = res.data;
          console.log(allCols)
          axios.get(`http://127.0.0.1:8000/api/models/single/${token[1]}/abc/${uidb64[1]}/`)
          .then((res)=>{
            const values = res.data;
            console.log(values)
            axios
                      .get(`http://127.0.0.1:8000/api/allLists/${token[1]}/`)
                      .then((ress)=>{
                      // setAppState({listHistory:[res.data],})
                      localStorage.removeItem("listname");                    
                      localStorage.setItem("listname", JSON.stringify(ress.data));
                      // setListHistory(listHistory,()=>props.onChangeName(listHistory))                    
                      // props.onChangeName()
                      // console.log(listHistory['modelname'])
                      // console.log(props)
                      setAppState({loading: false,listHistory:[ress.data], cols: allCols, data :values });
                  })
                  .catch(e=>{
                  console.log(e)
                  })
            
          }).catch(e=>{
            alert(e)
          })

          
          
        })
        .catch(e=>{
            console.log(e)
            
        });
    
    
    }, [setAppState]);
  
      useEffect(() => {
      
        fetchData()
    
      
      }, [setAppState]);
      return (
          <div className="App">
              
              <PostLoadingComponent isLoading={appState.loading} cols={appState.cols} data={appState.data} id={appState.id} listHistory ={appState.listHistory} fetch={fetchData}/>
          </div>
      );
  }